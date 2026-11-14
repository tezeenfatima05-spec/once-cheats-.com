import fs from 'node:fs';
import path from 'node:path';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');

const BANNED = [
  { id: 'deadlock', re: /\bdeadlock\b/i },
  { id: 'overwatch', re: /\boverwatch\b/i },
  { id: 'apex', re: /\bapex legends\b/i },
  { id: 'valorant', re: /\bvalorant\b/i },
  { id: 'tarkov', re: /\b(tarkov|eft)\b/i },
  { id: 'dotacheats', re: /\bdotacheats\b/i },
  { id: 'hania', re: /\bhania\b/i },
  { id: 'dota-game', re: /\bdota\s*2\b/i },
  { id: 'dota-path', re: /\/dota-2-cheats\//i },
  { id: 'undetect', re: /\bundetect/i },
  { id: 'skin-changer', re: /skin changer/i },
];

const REDIRECT_ALLOWLIST = new Set(['astro.config.mjs', path.join('src', 'utils', 'path.ts'), path.join('scripts', 'redirects.mjs')]);

const AUTHORIZED = new Set(Object.values(CHECKOUT_URLS));

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(astro|ts|tsx|mjs|js|json|md|html|css|svg|txt|xml)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const targets = [
  ...walk(path.join(root, 'src')),
  ...walk(path.join(root, 'public')),
  ...walk(path.join(root, 'scripts')),
  ...(fs.existsSync(dist) ? walk(dist) : []),
];

const findings = [];

for (const file of targets) {
  const rel = path.relative(root, file);
  if (rel === path.join('scripts', 'check-leftovers.mjs')) continue;
  const text = fs.readFileSync(file, 'utf8');

  for (const { id, re } of BANNED) {
    if (!re.test(text)) continue;
    if (REDIRECT_ALLOWLIST.has(rel) && (id === 'dota-path' || id === 'dota-game')) continue;
    if (id === 'dota-path' && rel.replace(/\\/g, '/').includes('products/dota-2-cheats')) continue;
    if (rel.startsWith(`public${path.sep}images`) && id === 'dota-game') continue;
    findings.push({ file: rel, id, action: 'REMOVE' });
  }

  if (rel.startsWith(`dist${path.sep}`)) {
    const urls = text.match(/https:\/\/zadeyo\.com\/[^\s"'<>]+/g) ?? [];
    for (const url of urls) {
      if (!url.includes('TAZEEN')) {
        findings.push({ file: rel, id: 'merchant-missing-tazeen', action: 'REMOVE', note: url });
      }
    }
  }
}

if (findings.length) {
  console.error(`check-leftovers: ${findings.length} issue(s)`);
  for (const f of findings.slice(0, 100)) {
    console.error(`[${f.action}] ${f.file} — ${f.id}${f.note ? ` (${f.note})` : ''}`);
  }
  process.exit(1);
}

console.log('check-leftovers: OK');