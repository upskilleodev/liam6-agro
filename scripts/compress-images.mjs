/**
 * Resize & compress PNGs in public/images for faster mobile load.
 * Run: node scripts/compress-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public/images");

function maxWidthFor(file) {
  if (file.startsWith("product-")) return 800;
  if (file.startsWith("bg-")) return 1600;
  if (file === "hero.png" || file === "hero-desktop.png") return 1920;
  if (file === "hero-mobile.png") return 1080;
  return 1280;
}

async function compressFile(filePath) {
  const file = path.basename(filePath);
  const before = (await stat(filePath)).size;
  const meta = await sharp(filePath).metadata();
  const maxWidth = maxWidthFor(file);

  const pipeline = sharp(filePath).rotate();
  const needsResize = meta.width && meta.width > maxWidth;

  const buffer = await (needsResize
    ? pipeline.resize({ width: maxWidth, withoutEnlargement: true })
    : pipeline)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

  if (buffer.length >= before && !needsResize) {
    console.log(`skip ${file}`);
    return;
  }

  await sharp(buffer).toFile(filePath);
  const after = (await stat(filePath)).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${file}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (-${pct}%)`
  );
}

async function main() {
  const files = await readdir(IMAGES_DIR);
  const pngs = files.filter((f) => f.endsWith(".png"));

  for (const file of pngs) {
    await compressFile(path.join(IMAGES_DIR, file));
  }

  console.log(`Done — ${pngs.length} files processed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
