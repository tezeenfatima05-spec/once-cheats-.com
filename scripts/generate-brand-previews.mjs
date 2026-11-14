import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images', 'brand');
fs.mkdirSync(dir, { recursive: true });

async function mk(name, w, h, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#221533"/>
        <stop offset="1" stop-color="#0A0D10"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#C8B8E8" font-family="Segoe UI,Arial,sans-serif" font-size="32" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(path.join(dir, `${name}.webp`));
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir, `${name}.png`));
}

await Promise.all([
  mk('og-default', 1200, 630, 'Once Human Cheats'),
  mk('preview-esp', 1280, 720, 'ESP overlay preview'),
  mk('preview-aimbot', 1280, 720, 'Aim assist preview'),
  mk('preview-radar', 1280, 720, 'Radar overlay preview'),
  mk('preview-ui', 1280, 720, 'Software UI preview'),
  mk('preview-utility', 1280, 720, 'Utility tool preview'),
  mk('blog-featured', 1280, 720, 'Once Human guide'),
]);

console.log('Brand preview images written to public/images/brand/');