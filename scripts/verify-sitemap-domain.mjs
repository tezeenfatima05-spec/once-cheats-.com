/**
 * Production guard: every sitemap <loc> must use https://oncecheats.com only.
 * Keep in sync with src/config/site.ts (SITE_DOMAIN) and astro.config.mjs `site`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { findSitemapSourceDir, getPrimaryDistContentRoot } from './dist-root.mjs';

const SITE_ORIGIN = 'https://oncecheats.com';
const contentRoot = getPrimaryDistContentRoot();
const sitemapDir = findSitemapSourceDir() ?? contentRoot;

const sitemap = path.join(sitemapDir, 'sitemap.xml');
const robots = path.join(contentRoot, 'robots.txt');

if (!fs.existsSync(sitemap)) {
  console.error(
    'verify-sitemap-domain: missing sitemap.xml under dist/ or dist/client/ — run build first',
  );
  process.exit(1);
}

const xml = fs.readFileSync(sitemap, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const bad = locs.filter((loc) => !loc.startsWith(`${SITE_ORIGIN}/`) && loc !== `${SITE_ORIGIN}/`);

if (bad.length) {
  console.error(`verify-sitemap-domain: ${bad.length} URL(s) not on ${SITE_ORIGIN}`);
  bad.slice(0, 20).forEach((u) => console.error(`  ${u}`));
  process.exit(1);
}

if (locs.length === 0) {
  console.error('verify-sitemap-domain: sitemap has zero URLs');
  process.exit(1);
}

if (fs.existsSync(robots)) {
  const robotsTxt = fs.readFileSync(robots, 'utf8');
  const expected = `Sitemap: ${SITE_ORIGIN}/sitemap.xml`;
  if (!robotsTxt.includes(expected)) {
    console.error(`verify-sitemap-domain: robots.txt must include "${expected}"`);
    process.exit(1);
  }
}

console.log(`verify-sitemap-domain: OK (${locs.length} URLs on ${SITE_ORIGIN})`);