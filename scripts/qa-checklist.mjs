import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';
import {
  findSitemapSourceDir,
  getDistContentRoots,
  getPrimaryDistContentRoot,
  normalizeDistRel,
} from './dist-root.mjs';

const root = process.cwd();
const dist = getPrimaryDistContentRoot(root);

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name === 'index.html' || entry.name === '404.html') files.push(full);
  }
  return files;
}

const SKIP_H1 = new Set([
  'dist/404.html',
  'dist/blog/index.html',
  'dist/cheats/index.html',
  'dist/contact/index.html',
]);
const NOINDEX_OK = new Set([
  'dist/404.html',
  'dist/blog/index.html',
  'dist/cheats/index.html',
  'dist/contact/index.html',
]);

const issues = [];
const files = getDistContentRoots(root).flatMap((dir) => walkHtml(dir));

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const relKey = normalizeDistRel(rel);
  const html = fs.readFileSync(file, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
  const desc =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    '';
  const keywords =
    html.match(/<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    '';

  if (!SKIP_H1.has(relKey) && h1Count !== 1) {
    issues.push({ rel, check: 'h1', note: String(h1Count) });
  }
  if (!title) issues.push({ rel, check: 'title' });
  if (!desc && !NOINDEX_OK.has(relKey)) issues.push({ rel, check: 'description' });
  if (!keywords && !NOINDEX_OK.has(relKey)) issues.push({ rel, check: 'keywords' });

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  for (const tag of imgs) {
    const altMatch = tag.match(/\balt=(["'])(.*?)\1/i);
    if (!altMatch) issues.push({ rel, check: 'img-alt-missing', note: tag.slice(0, 80) });
    else if (altMatch[2].trim() === '') {
      const decorative = /\baria-hidden\s*=\s*["']true["']/i.test(tag);
      if (!decorative) issues.push({ rel, check: 'img-alt-empty', note: tag.slice(0, 80) });
    }
  }

  const badCheckout = [
    ...html.matchAll(/https?:\/\/[^\s"'<>]+/g),
  ]
    .map((m) => m[0])
    .filter((url) => /zadeyo\.com/i.test(url) && !Object.values(CHECKOUT_URLS).includes(url));

  for (const url of badCheckout) {
    issues.push({ rel, check: 'unauthorized-checkout', note: url });
  }
}

const sitemapDir = findSitemapSourceDir(root) ?? dist;
const sitemapPath = path.join(sitemapDir, 'sitemap.xml');
const robotsPath = path.join(dist, 'robots.txt');
if (!fs.existsSync(sitemapPath)) issues.push({ rel: 'dist/', check: 'missing-sitemap.xml' });
if (!fs.existsSync(robotsPath)) issues.push({ rel: 'dist/', check: 'missing-robots.txt' });

let sitemapUrls = 0;
if (fs.existsSync(sitemapPath)) {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  sitemapUrls = (sm.match(/<loc>/g) ?? []).length;
  const distResolved = path.resolve(dist);
  const indexable = files.filter((f) => {
    const rel = path.relative(root, f).replace(/\\/g, '/');
    if (NOINDEX_OK.has(normalizeDistRel(rel))) return false;
    const resolved = path.resolve(f);
    return resolved === distResolved || resolved.startsWith(distResolved + path.sep);
  });
  const missingFromSitemap = [];
  for (const file of indexable) {
    const rel = path.relative(dist, file).replace(/\\/g, '/');
    const urlPath = rel === 'index.html' ? '' : rel.replace(/index\.html$/, '');
    const loc = `https://oncecheats.com/${urlPath}`;
    if (!sm.includes(loc)) missingFromSitemap.push(loc);
  }
  if (missingFromSitemap.length) {
    issues.push({
      rel: 'sitemap.xml',
      check: 'sitemap-missing-urls',
      note: missingFromSitemap.slice(0, 8).join(' | '),
    });
  }
}

const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
if (!/Sitemap:\s*https:\/\/oncecheats\.com\/sitemap\.xml/i.test(robots)) {
  issues.push({ rel: 'robots.txt', check: 'sitemap-line' });
}
if (!/Disallow:\s*\/go\//i.test(robots)) {
  issues.push({ rel: 'robots.txt', check: 'disallow-go' });
}

console.log(`QA: ${files.length} HTML files, ${sitemapUrls} sitemap URLs, ${issues.length} issue(s)`);
if (issues.length) {
  for (const i of issues.slice(0, 50)) {
    console.error(`${i.rel}: ${i.check}${i.note ? ` (${i.note})` : ''}`);
  }
  process.exit(1);
}
console.log('QA checklist: all automated checks passed');