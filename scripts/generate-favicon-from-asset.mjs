/**
 * Build transparent favicons from public/favicon-master.png (Once Human M logo).
 * Source: run with --from=<path> to regenerate master from a flat PNG first.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const masterPath = path.join(publicDir, 'favicon-master.png');

function removeDarkBackground(inputPath) {
  return sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const out = Buffer.from(data);
      for (let i = 0; i < out.length; i += 4) {
        const r = out[i];
        const g = out[i + 1];
        const b = out[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max ? (max - min) / max : 0;
        if ((max < 52 && sat < 0.38) || max < 24) out[i + 3] = 0;
      }
      return sharp(out, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .trim({ threshold: 1 })
        .png()
        .toBuffer();
    });
}

async function resizeSquare(buf, size) {
  return sharp(buf)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

const fromArg = process.argv.find((a) => a.startsWith('--from='));
if (fromArg) {
  const src = fromArg.slice('--from='.length);
  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    process.exit(1);
  }
  const master = await removeDarkBackground(src);
  fs.writeFileSync(masterPath, master);
  console.log(`Wrote ${masterPath}`);
}

if (!fs.existsSync(masterPath)) {
  console.error('Missing public/favicon-master.png — pass --from=<png>');
  process.exit(1);
}

const master = fs.readFileSync(masterPath);

await sharp(await resizeSquare(master, 32)).toFile(path.join(publicDir, 'favicon-32.png'));
await sharp(await resizeSquare(master, 16)).toFile(path.join(publicDir, 'favicon-16.png'));
await sharp(await resizeSquare(master, 32)).toFile(path.join(publicDir, 'favicon.ico'));
await sharp(await resizeSquare(master, 180)).toFile(path.join(publicDir, 'apple-touch-icon.png'));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Once Human Cheats">
  <image href="/favicon-master.png" width="256" height="256" />
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg, 'utf8');

console.log('Favicons updated: favicon-master.png, 16/32/ico, apple-touch-icon, favicon.svg');