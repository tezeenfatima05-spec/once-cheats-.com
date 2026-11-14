import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const SITE = 'oncecheats.com';

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
const SKIP_DUPLICATE_TITLE = new Set(['dist/cheats/index.html']);

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name === 'index.html' || entry.name === '404.html') files.push(full);
  }
  return files;
}

function relPosix(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function extractAll(re, text) {
  return [...text.matchAll(re)].map((m) => m[1]?.trim() ?? '');
}

const files = walkHtml(dist);
if (!files.length) {
  console.error('check-seo: no HTML in dist/ — run npm run build first');
  process.exit(1);
}

const titles = new Map();
const issues = [];

for (const file of files) {
  const rel = relPosix(file);
  const html = fs.readFileSync(file, 'utf8');

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
  const desc =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    '';
  const robots =
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? '';
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1] ?? '';
  const h1s = extractAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, html).map((h) =>
    h.replace(/<[^>]+>/g, '').trim(),
  );
  const keywords =
    html.match(/<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']keywords["']/i)?.[1] ??
    '';

  if (!title) issues.push({ rel, code: 'missing-title' });
  else {
    const list = titles.get(title) ?? [];
    list.push(rel);
    titles.set(title, list);
    if (title.length < 20 || title.length > 70) {
      issues.push({ rel, code: 'title-length', note: String(title.length) });
    }
  }

  if (!desc && !NOINDEX_OK.has(rel)) issues.push({ rel, code: 'missing-description' });
  else if (
    desc &&
    rel !== 'dist/404.html' &&
    (desc.length < 70 || desc.length > 190)
  ) {
    issues.push({ rel, code: 'description-length', note: String(desc.length) });
  }

  if (canonical && !canonical.includes(SITE)) {
    issues.push({ rel, code: 'bad-canonical', note: canonical });
  }

  const noindex = /noindex/i.test(robots);

  if (!noindex && !NOINDEX_OK.has(rel)) {
    if (!keywords) issues.push({ rel, code: 'missing-keywords' });
    else {
      if (keywords.length < 24 || keywords.length > 320) {
        issues.push({ rel, code: 'keywords-length', note: String(keywords.length) });
      }
      if (!/once human/i.test(keywords)) {
        issues.push({ rel, code: 'keywords-brand', note: keywords.slice(0, 60) });
      }
      if (/\bhacks\b/i.test(keywords) && !/\bhacks\b/i.test(title)) {
        issues.push({ rel, code: 'keywords-hacks-word', note: 'prefer cheats in keywords' });
      }
    }
  }
  if (noindex && !NOINDEX_OK.has(rel)) {
    issues.push({ rel, code: 'unexpected-noindex', note: robots });
  }
  if (!noindex && /index\.html$/.test(rel) && !robots.includes('index')) {
    issues.push({ rel, code: 'missing-index-robots', note: robots || '(empty)' });
  }

  if (!SKIP_H1.has(rel)) {
    if (h1s.length !== 1) {
      issues.push({ rel, code: 'h1-count', note: String(h1s.length) });
    }
  }
}

for (const [title, paths] of titles) {
  const filtered = paths.filter((p) => !SKIP_DUPLICATE_TITLE.has(p));
  if (filtered.length > 1) {
    issues.push({ rel: filtered.join(', '), code: 'duplicate-title', note: title });
  }
}

if (issues.length) {
  console.error(`check-seo: ${issues.length} issue(s)`);
  for (const i of issues.slice(0, 120)) {
    console.error(`${i.rel}: ${i.code}${i.note ? ` (${i.note})` : ''}`);
  }
  process.exit(1);
}

console.log(`check-seo: OK (${files.length} HTML files)`);