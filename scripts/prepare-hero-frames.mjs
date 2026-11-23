/**
 * Converte a sequência original recebida (100 JPGs) para 120 frames WebP,
 * mantendo a duração perceptual e atendendo ao contrato do hero.
 *
 * Uso: node scripts/prepare-hero-frames.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve(
  "public/hero-sequence/Create_logo_animation_video_5ecf0315_000",
);
const OUTPUT_DIR = path.resolve("public/hero-sequence");
const TOTAL_FRAMES = 120;

const sourceFiles = (await fs.readdir(SOURCE_DIR))
  .filter((file) => file.endsWith(".jpg"))
  .sort();

if (sourceFiles.length === 0) {
  throw new Error("Nenhum frame de origem encontrado.");
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });

for (let index = 0; index < TOTAL_FRAMES; index += 1) {
  const sourceIndex = Math.round(
    (index * (sourceFiles.length - 1)) / (TOTAL_FRAMES - 1),
  );
  const sourcePath = path.join(SOURCE_DIR, sourceFiles[sourceIndex]);
  const outputName = `frame_${String(index + 1).padStart(4, "0")}.webp`;
  const outputPath = path.join(OUTPUT_DIR, outputName);

  await sharp(sourcePath)
    .resize(1440, 810, { fit: "cover" })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);
}

console.log(`✓ ${TOTAL_FRAMES} frames WebP criados em public/hero-sequence.`);
