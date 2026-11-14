/**
 * Content QA: duplicate blog paragraphs and weak forum excerpts.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let failed = 0;

const postsPath = path.join(root, 'src/data/blog/posts.ts');
const postsSrc = fs.readFileSync(postsPath, 'utf8');
const paragraphs = [...postsSrc.matchAll(/text:\s*"([^"]{60,})"/g)].map((m) => m[1]);
const seen = new Map();
for (const p of paragraphs) {
  const key = p.slice(0, 100);
  seen.set(key, (seen.get(key) || 0) + 1);
}
const dupes = [...seen.entries()].filter(([, n]) => n > 1);
if (dupes.length) {
  console.error(`audit-content: ${dupes.length} duplicate blog paragraph stem(s)`);
  dupes.slice(0, 5).forEach(([k, n]) => console.error(`  (${n}x) ${k}...`));
  failed++;
}

const forumPath = path.join(root, 'src/data/forum.ts');
const forumSrc = fs.readFileSync(forumPath, 'utf8');
const badExcerpt = /excerpt:\s*'Example [^']+'/g;
const badMatches = forumSrc.match(badExcerpt) ?? [];
if (badMatches.length) {
  console.error(`audit-content: ${badMatches.length} generic forum excerpt(s): ${badMatches.join(', ')}`);
  failed++;
}

if (failed) process.exit(1);
console.log('audit-content: OK');