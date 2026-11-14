import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';
import { getDistContentRoots } from './dist-root.mjs';

const root = process.cwd();

const FILE_RE = /\.(astro|ts|tsx|mjs|js|json|md|html|css|svg|txt|xml|webmanifest)$/i;

const BANNED = [
  { id: 'deadlock', re: /\bdeadlock\b/i },
  { id: 'overwatch', re: /\boverwatch(\s*2)?\b/i },
  { id: 'apex', re: /\bapex(\s*legends)?\b/i },
  { id: 'valorant', re: /\bvalorant\b/i },
  { id: 'tarkov', re: /\b(escape from tarkov|tarkov|\beft\b)/i },
  { id: 'fortnite', re: /\bfortnite\b/i },
  { id: 'pubg', re: /\bpubg\b/i },
  { id: 'cs2', re: /\b(cs2|counter-strike)\b/i },
  { id: 'warzone', re: /\b(warzone|call of duty)\b/i },
  { id: 'rainbow', re: /\brainbow six\b/i },
  { id: 'minecraft', re: /\bminecraft\b/i },
  { id: 'rust-game', re: /\brust\b.*\bcheat/i },
  { id: 'caliber', re: /\bcaliber\b/i },
  { id: 'bodycam', re: /\bbodycam\b/i },
  { id: 'dotacheats', re: /\bdotacheats\b/i },
  { id: 'dota-game', re: /\bdota\s*2\b/i },
  { id: 'dota-path', re: /\/dota-2-cheats\//i },
  { id: 'hania', re: /\bhania\b/i },
  { id: 'undetect', re: /\bundetect/i },
  { id: 'skin-changer', re: /skin changer/i },
  { id: 'not-optimised', re: /\bnot-optimised\b/i },
  { id: 'stellarhamza', re: /\bstellarhamza\b/i },
  { id: 'lorem', re: /\blorem ipsum\b/i },
];

const REDIRECT_ALLOWLIST = new Set([
  'astro.config.mjs',
  'src/utils/path.ts',
  'scripts/redirects.mjs',
  'scripts/check-leftovers.mjs',
  'scripts/check-seo.mjs',
  'scripts/qa-checklist.mjs',
]);

const AUTHORIZED = new Set(Object.values(CHECKOUT_URLS));

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (FILE_RE.test(entry.name)) files.push(full);
  }
  return files;
}

function relPosix(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function isLegitimateException(rel, id) {
  const norm = rel.replace(/\\/g, '/');
  if (REDIRECT_ALLOWLIST.has(norm)) {
    return id === 'dota-path' || id === 'dota-game';
  }
  return false;
}

const targets = [
  ...walk(path.join(root, 'src')),
  ...walk(path.join(root, 'public')),
  ...walk(path.join(root, 'scripts')),
  ...walk(path.join(root, 'docs')),
  ...getDistContentRoots(root).flatMap((d) => walk(d)),
];

const rootIndex = path.join(root, 'index.html');
if (fs.existsSync(rootIndex)) targets.push(rootIndex);

const findings = [];

for (const file of targets) {
  const rel = relPosix(file);
  if (rel === 'scripts/check-leftovers.mjs') continue;
  const text = fs.readFileSync(file, 'utf8');

  for (const { id, re } of BANNED) {
    if (!re.test(text)) continue;
    if (isLegitimateException(rel, id)) continue;
    findings.push({ file: rel, id, action: 'REMOVE' });
  }

  if (rel.startsWith('dist/')) {
    const urls = text.match(/https:\/\/zadeyo\.com\/[^\s"'<>]+/g) ?? [];
    for (const url of urls) {
      if (!AUTHORIZED.has(url)) {
        findings.push({
          file: rel,
          id: 'merchant-unauthorized',
          action: 'REMOVE',
          note: url,
        });
      }
    }
    const badCanonical =
      text.match(/https:\/\/(?!oncecheats\.com)[a-z0-9.-]+\/[^"'<\s]*/gi) ?? [];
    for (const url of badCanonical) {
      if (/workers\.dev|pages\.dev|railway|vercel|netlify|dotacheats/i.test(url)) {
        findings.push({ file: rel, id: 'wrong-canonical-origin', action: 'REPLACE', note: url });
      }
    }
  }
}

if (findings.length) {
  console.error(`check-leftovers: ${findings.length} issue(s)`);
  for (const f of findings.slice(0, 150)) {
    console.error(`[${f.action}] ${f.file} — ${f.id}${f.note ? ` (${f.note})` : ''}`);
  }
  process.exit(1);
}

console.log('check-leftovers: OK');