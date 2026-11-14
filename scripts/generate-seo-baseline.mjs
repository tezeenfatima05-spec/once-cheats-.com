import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const out = path.join(root, '.seo-baseline', 'fields.txt');

const SAMPLES = [
  'index.html',
  'products/once-human/pc-software/index.html',
  'products/once-human/hwid-spoofer/index.html',
  'blogs/index.html',
  'blogs/best-once-human-cheats/index.html',
  'forum/index.html',
  'faq/index.html',
  'support/index.html',
  '404.html',
];

function field(html, re) {
  const m = html.match(re);
  return m?.[1]?.trim() ?? '';
}

function snippet(file) {
  const html = fs.readFileSync(file, 'utf8');
  const title = field(html, /<title[^>]*>([^<]*)<\/title>/i);
  const desc =
    field(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    field(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = field(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const robots = field(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  return { title, desc, canonical, robots, h1Count };
}

const lines = [];
for (const rel of SAMPLES) {
  const file = path.join(dist, rel);
  if (!fs.existsSync(file)) continue;
  const s = snippet(file);
  lines.push(`=== ${rel} ===`);
  lines.push(s.title);
  lines.push(s.desc);
  lines.push(s.canonical);
  lines.push(s.robots);
  lines.push(String(s.h1Count));
  lines.push('');
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`Wrote ${out} (${lines.length} lines)`);