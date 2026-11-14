import fs from 'node:fs';
import path from 'node:path';

export function getDistDir(cwd = process.cwd()) {
  return path.join(cwd, 'dist');
}

export function getDistClientDir(cwd = process.cwd()) {
  return path.join(getDistDir(cwd), 'client');
}

function hasBuiltHtml(dir) {
  return (
    fs.existsSync(path.join(dir, 'index.html')) || fs.existsSync(path.join(dir, '404.html'))
  );
}

/** Built pages live in `dist/` (plain static) and/or `dist/client/` (@astrojs/cloudflare). */
export function getDistContentRoots(cwd = process.cwd()) {
  const dist = getDistDir(cwd);
  const client = getDistClientDir(cwd);
  const roots = [];
  if (hasBuiltHtml(client)) roots.push(client);
  if (hasBuiltHtml(dist)) roots.push(dist);
  return roots.length ? roots : [dist];
}

export function getPrimaryDistContentRoot(cwd = process.cwd()) {
  return getDistContentRoots(cwd)[0];
}

/** Where @astrojs/sitemap writes `sitemap-0.xml` after `astro build`. */
export function findSitemapSourceDir(cwd = process.cwd()) {
  for (const dir of [getDistClientDir(cwd), getDistDir(cwd)]) {
    if (fs.existsSync(path.join(dir, 'sitemap-0.xml'))) return dir;
    if (!fs.existsSync(dir)) continue;
    const names = fs.readdirSync(dir);
    if (names.some((name) => /^sitemap-\d+\.xml$/i.test(name))) return dir;
    if (names.includes('sitemap-index.xml')) return dir;
  }
  return null;
}

/** Prefer numbered sitemap chunk; fall back to merging index entries if needed. */
export function resolveSitemapChunkPath(sitemapDir) {
  const preferred = path.join(sitemapDir, 'sitemap-0.xml');
  if (fs.existsSync(preferred)) return preferred;
  const numbered = fs
    .readdirSync(sitemapDir)
    .filter((name) => /^sitemap-\d+\.xml$/i.test(name))
    .sort();
  if (numbered[0]) return path.join(sitemapDir, numbered[0]);
  return null;
}

/** Map `dist/client/...` → `dist/...` for shared skip lists in QA scripts. */
export function normalizeDistRel(relPosix) {
  return relPosix.replace(/^dist\/client\//, 'dist/');
}