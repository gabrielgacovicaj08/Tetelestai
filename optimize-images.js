/**
 * optimize-images.js
 *
 * Converts JPG / JPEG / PNG / HEIC images in src/assets to WebP.
 * - Max width: 1920 px  (height scales proportionally)
 * - WebP quality: 82
 * - Skips files that already have a .webp sibling (pass --force to override)
 * - HEIC/HEIF files use heic-convert (pure JS) as a fallback when sharp cannot decode them.
 *
 * Usage:
 *   node optimize-images.js          # skip existing .webp files
 *   node optimize-images.js --force  # re-convert everything
 */

import sharp from "sharp";
import heicConvert from "heic-convert";
import { readdirSync, existsSync, statSync, readFileSync } from "fs";
import { join, extname, basename, dirname } from "path";

const ASSETS_DIR = "./src/assets";
const MAX_WIDTH   = 1920;
const QUALITY     = 82;
const FORCE       = process.argv.includes("--force");

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".heic", ".heif"]);

let converted = 0;
let skipped   = 0;
let failed    = 0;

/** Recursively collect all image files */
function collectImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectImages(full));
    } else if (SUPPORTED.has(extname(entry).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

/** For HEIC/HEIF: decode with heic-convert, then pipe the JPEG buffer through sharp */
async function heicToSharp(src) {
  const inputBuffer = readFileSync(src);
  const jpegBuffer  = await heicConvert({ buffer: inputBuffer, format: "JPEG", quality: 1 });
  return sharp(Buffer.from(jpegBuffer));
}

async function processImage(src) {
  const ext  = extname(src).toLowerCase();
  const stem = basename(src, extname(src));
  const dir  = dirname(src);
  const dest = join(dir, stem + ".webp");

  // Skip if a .webp already exists and --force was not passed
  if (!FORCE && existsSync(dest)) {
    skipped++;
    return;
  }

  try {
    const isHeic = ext === ".heic" || ext === ".heif";
    const pipeline = isHeic
      ? await heicToSharp(src)
      : sharp(src, { failOn: "none" });

    await pipeline
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest);

    const srcSize  = statSync(src).size;
    const destSize = statSync(dest).size;
    const saving   = (((srcSize - destSize) / srcSize) * 100).toFixed(1);
    console.log(`✓  ${stem}${ext}  →  ${stem}.webp  (${saving}% smaller)`);
    converted++;
  } catch (err) {
    console.error(`✗  FAILED: ${src}\n   ${err.message}`);
    failed++;
  }
}

async function main() {
  console.log(`\nScanning ${ASSETS_DIR} …\n`);
  const images = collectImages(ASSETS_DIR);
  console.log(`Found ${images.length} image(s). FORCE=${FORCE}\n`);

  for (const img of images) {
    await processImage(img);
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`Converted : ${converted}`);
  console.log(`Skipped   : ${skipped}  (already have .webp)`);
  console.log(`Failed    : ${failed}`);
  console.log(`─────────────────────────────────\n`);
}

main();
