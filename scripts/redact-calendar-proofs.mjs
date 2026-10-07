import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const backupDir = path.join(projectRoot, '.proof-originals-backup');
const outputDir = path.join(projectRoot, 'public', 'proof');

async function redactAugust2026() {
  const inputPath = path.join(backupDir, 'calendar-august-2026.jpeg');
  const outputPath = path.join(outputDir, 'calendar-august-2026.jpeg');

  console.log('Processing August 2026 calendar proof...');
  const baseImage = sharp(inputPath);
  const metadata = await baseImage.metadata();
  if (metadata.width !== 1600 || metadata.height !== 1100) {
    throw new Error(`Unexpected August dimensions: ${metadata.width}x${metadata.height}`);
  }

  const rowTops = [103, 265, 428, 591, 753, 915];
  const colLefts = [14, 239, 464, 689, 914, 1140, 1364];
  const colWidth = 222;

  const composites = [];
  for (let r = 0; r < 6; r++) {
    const top = rowTops[r] + 36;
    const height = 66; // Leaves top ~36px (date numbers) and bottom ~35px (+XX more badges) crisp
    for (let c = 0; c < 7; c++) {
      const left = colLefts[c] + 8;
      const width = colWidth - 16;
      const blurred = await sharp(inputPath)
        .extract({ left, top, width, height })
        .blur(12)
        .toBuffer();
      composites.push({ input: blurred, left, top });
    }
  }

  await sharp(inputPath)
    .composite(composites)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  console.log(`Saved redacted August 2026 to ${outputPath} (${composites.length} cell regions redacted)`);
}

async function redactSeptember2026() {
  const inputPath = path.join(backupDir, 'calendar-september-2026.jpeg');
  const outputPath = path.join(outputDir, 'calendar-september-2026.jpeg');

  console.log('Processing September 2026 calendar proof...');
  const baseImage = sharp(inputPath);
  const metadata = await baseImage.metadata();
  if (metadata.width !== 1600 || metadata.height !== 1096) {
    throw new Error(`Unexpected September dimensions: ${metadata.width}x${metadata.height}`);
  }

  const rowTops = [105, 299, 493, 686, 880];
  const colLefts = [22, 246, 470, 694, 917, 1141, 1365];
  const colWidths = [224, 224, 224, 223, 224, 224, 224];

  const composites = [];
  for (let r = 0; r < 5; r++) {
    const top = rowTops[r] + 36;
    const height = 98; // Preserves date numbers (top) and +XX more counters (bottom 58px)
    for (let c = 0; c < 7; c++) {
      const left = colLefts[c] + 8;
      const width = colWidths[c] - 16;
      const blurred = await sharp(inputPath)
        .extract({ left, top, width, height })
        .blur(12)
        .toBuffer();
      composites.push({ input: blurred, left, top });
    }
  }

  await sharp(inputPath)
    .composite(composites)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  console.log(`Saved redacted September 2026 to ${outputPath} (${composites.length} cell regions redacted)`);
}

async function redactWeekAugSep2026() {
  const inputPath = path.join(backupDir, 'calendar-week-aug-sep-2026.jpeg');
  const outputPath = path.join(outputDir, 'calendar-week-aug-sep-2026.jpeg');

  console.log('Processing Week Aug-Sep 2026 calendar proof...');
  const baseImage = sharp(inputPath);
  const { data, info } = await baseImage.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  if (w !== 1600 || h !== 1089) {
    throw new Error(`Unexpected Week dimensions: ${w}x${h}`);
  }

  const cols = [
    { name: 'Sun', left: 107, right: 315 },
    { name: 'Mon', left: 318, right: 525 },
    { name: 'Tue', left: 528, right: 736 },
    { name: 'Wed', left: 739, right: 947 },
    { name: 'Thu', left: 950, right: 1158 },
    { name: 'Fri', left: 1161, right: 1368 },
    { name: 'Sat', left: 1371, right: 1579 }
  ];

  const composites = [];

  for (const col of cols) {
    const rowCounts = [];
    for (let y = 180; y < h; y++) {
      let colored = 0;
      for (let x = col.left + 5; x < col.right - 5; x++) {
        const idx = (y * w + x) * 3;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        if (sat > 0.15 && max > 90) colored++;
        else if (max < 225 && min > 150 && sat < 0.1) colored++;
      }
      rowCounts.push({ y, colored });
    }

    const blocks = [];
    let cur = null;
    for (const { y, colored } of rowCounts) {
      if (colored > 40) {
        if (!cur) cur = { startY: y, endY: y };
        else cur.endY = y;
      } else {
        if (cur) {
          if (cur.endY - cur.startY >= 8) blocks.push(cur);
          cur = null;
        }
      }
    }
    if (cur && cur.endY - cur.startY >= 8) blocks.push(cur);

    for (const b of blocks) {
      // Find tight horizontal boundary for this event container
      let minX = col.right, maxX = col.left;
      for (let y = b.startY; y <= b.endY; y++) {
        for (let x = col.left; x <= col.right; x++) {
          const idx = (y * w + x) * 3;
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const sat = max === 0 ? 0 : (max - min) / max;
          if ((sat > 0.15 && max > 90) || (max < 225 && min > 150 && sat < 0.1)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }

      const blockW = maxX - minX + 1;
      const blockH = b.endY - b.startY + 1;
      const insetX = 6;
      const insetY = blockH > 20 ? 3 : 1;

      const left = minX + insetX;
      const top = b.startY + insetY;
      const width = blockW - (insetX * 2);
      const height = blockH - (insetY * 2);

      if (width > 20 && height > 6) {
        const blurred = await sharp(inputPath)
          .extract({ left, top, width, height })
          .blur(12)
          .toBuffer();
        composites.push({ input: blurred, left, top });
      }
    }
  }

  await sharp(inputPath)
    .composite(composites)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  console.log(`Saved redacted Week Aug-Sep 2026 to ${outputPath} (${composites.length} event containers redacted)`);
}

async function run() {
  try {
    await redactAugust2026();
    await redactSeptember2026();
    await redactWeekAugSep2026();
    console.log('All calendar proof images successfully redacted!');
  } catch (err) {
    console.error('Redaction failed:', err);
    process.exit(1);
  }
}

run();
