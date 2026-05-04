import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, basename, extname } from "path";

const INPUT_DIR = "src/assets/Pictures - 623 Opal Ln";
const OUTPUT_DIR = "src/assets/623 Opal Ln";
const MAX_WIDTH = 1920;
const QUALITY = 78;

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(INPUT_DIR)).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f)
);

console.log(`Converting ${files.length} images...`);

await Promise.all(
  files.map(async (file) => {
    const name = basename(file, extname(file));
    const src = join(INPUT_DIR, file);
    const dest = join(OUTPUT_DIR, `${name}.webp`);

    const info = await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest);

    const srcStat = (await import("fs")).statSync(src);
    const reduction = (((srcStat.size - info.size) / srcStat.size) * 100).toFixed(1);
    console.log(`  ${file} → ${name}.webp  (${(srcStat.size / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB, -${reduction}%)`);
  })
);

console.log("Done.");
