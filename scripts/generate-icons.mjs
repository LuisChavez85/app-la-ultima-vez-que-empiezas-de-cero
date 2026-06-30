// Genera todos los iconos PWA a partir de /public/logo.png
// Uso: node scripts/generate-icons.mjs

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const LOGO = path.join(ROOT, 'public', 'logo.png');
const OUT  = path.join(ROOT, 'public', 'icons');

fs.mkdirSync(OUT, { recursive: true });

// Fondo obsidiana: #0F0F12
const BG = { r: 15, g: 15, b: 18, alpha: 1 };

// SVG con glow cian radial sutil centrado
function glowSvg(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="45%">
          <stop offset="0%"   stop-color="#06B6D4" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#g)"/>
    </svg>`
  );
}

async function createIcon(size, outputPath, logoScale = 0.62) {
  const logoPx = Math.round(size * logoScale);

  // Redimensionar logo preservando proporción
  const logoResized = await sharp(LOGO)
    .resize(logoPx, logoPx, { fit: 'inside' })
    .png()
    .toBuffer();

  const { width: lw, height: lh } = await sharp(logoResized).metadata();
  const left = Math.round((size - lw) / 2);
  const top  = Math.round((size - lh) / 2);

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      // Glow cian radial
      { input: glowSvg(size), blend: 'over' },
      // Logo centrado
      { input: logoResized, left, top, blend: 'over' },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`  ✓ ${path.basename(outputPath)}  (${size}×${size})`);
}

async function main() {
  console.log('\n🎨 Generando iconos PWA...\n');

  // Iconos estándar del manifest
  const standard = [72, 96, 128, 144, 152, 384];
  for (const s of standard) {
    await createIcon(s, path.join(OUT, `icon-${s}x${s}.png`), 0.62);
  }

  // Iconos maskable (logo más pequeño para respetar safe zone del 80%)
  await createIcon(192, path.join(OUT, 'icon-192x192.png'), 0.54);
  await createIcon(512, path.join(OUT, 'icon-512x512.png'), 0.54);

  // Apple Touch Icon (180×180) — iOS home screen
  await createIcon(180, path.join(OUT, 'apple-touch-icon.png'), 0.60);

  console.log('\n✅ Todos los iconos generados en /public/icons/\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
