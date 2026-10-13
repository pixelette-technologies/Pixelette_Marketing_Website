/**
 * Border-flood white → transparent for maquette layer cutouts.
 *
 * Only removes white that is connected to the frame edge. Interior whites
 * (specular highlights, pale clothing) stay. Does not global-key white.
 *
 * Usage:
 *   node scripts/maquette-border-alpha.mjs 05-blue-cylinder 07-centre-sphere
 *   node scripts/maquette-border-alpha.mjs --all
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/home/maquette");
const REVIEW = path.join(ROOT, "layers-review");
const OUT = path.join(ROOT, "layers");
const PREVIEW = path.join(ROOT, "layers-alpha-preview");

/** RGB must be at/above this to count as floodable white (JPEG softens pure #fff). */
const WHITE_MIN = 248;
/** Soft fringe: light pixels touching the flood get alpha from whiteness. */
const FRINGE_MIN = 220;
/**
 * Contact shadows on white: true-gray pixels connected to the border flood
 * become soft black alpha. Chroma must stay tight — cream forms and pale
 * clothing sit around chroma 19–32 and must not be treated as shadow.
 */
/** True gray only — warm off-white clothing is chroma ~3–20 and must not match. */
const SHADOW_CHROMA_MAX = 2;
const SHADOW_LUMA_MIN = 200;

const LAYER_FILES = [
  "01-plum-cylinder",
  "02-pink-cube",
  "03-cream-cylinder",
  "04-mustard-cube",
  "05-blue-cylinder",
  "06-cream-beam",
  "07-centre-sphere",
  "08-moving-sphere",
  "09-ladder",
  "11-person-ladder",
  "12-person-beam",
  "13-person-pointing",
  "14-person-tablet",
  "15-person-sphere",
  "16-person-blue",
];

function isFloodWhite(r, g, b) {
  return r >= WHITE_MIN && g >= WHITE_MIN && b >= WHITE_MIN;
}

function fringeAlpha(r, g, b) {
  const min = Math.min(r, g, b);
  if (min < FRINGE_MIN) return 255;
  // 255 at FRINGE_MIN → 0 at 255
  return Math.round(((255 - min) / (255 - FRINGE_MIN)) * 255);
}

function isSoftShadow(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min > SHADOW_CHROMA_MAX) return false;
  const luma = (r + g + b) / 3;
  return luma >= SHADOW_LUMA_MIN;
}

function borderFloodAlpha(rgba, width, height) {
  const n = width * height;
  // 1 = pure white flood → full transparent; 2 = soft shadow → alpha from luma
  const flooded = new Uint8Array(n);
  const queue = new Int32Array(n);
  let qh = 0;
  let qt = 0;

  const enqueueWhite = (x, y) => {
    const i = y * width + x;
    if (flooded[i]) return;
    const o = i * 4;
    if (!isFloodWhite(rgba[o], rgba[o + 1], rgba[o + 2])) return;
    flooded[i] = 1;
    queue[qt++] = i;
  };

  for (let x = 0; x < width; x++) {
    enqueueWhite(x, 0);
    enqueueWhite(x, height - 1);
  }
  for (let y = 1; y < height - 1; y++) {
    enqueueWhite(0, y);
    enqueueWhite(width - 1, y);
  }

  while (qh < qt) {
    const i = queue[qh++];
    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) enqueueWhite(x - 1, y);
    if (x + 1 < width) enqueueWhite(x + 1, y);
    if (y > 0) enqueueWhite(x, y - 1);
    if (y + 1 < height) enqueueWhite(x, y + 1);
  }

  const whiteCount = qt;

  // Expand only from the white flood into edge-connected soft contact shadows.
  const shadowQueue = new Int32Array(n);
  let sh = 0;
  let st = 0;
  const tryShadow = (x, y) => {
    const i = y * width + x;
    if (flooded[i]) return;
    const o = i * 4;
    if (!isSoftShadow(rgba[o], rgba[o + 1], rgba[o + 2])) return;
    flooded[i] = 2;
    shadowQueue[st++] = i;
  };

  for (let i = 0; i < whiteCount; i++) {
    const idx = queue[i];
    const x = idx % width;
    const y = (idx / width) | 0;
    if (x > 0) tryShadow(x - 1, y);
    if (x + 1 < width) tryShadow(x + 1, y);
    if (y > 0) tryShadow(x, y - 1);
    if (y + 1 < height) tryShadow(x, y + 1);
  }

  while (sh < st) {
    const i = shadowQueue[sh++];
    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) tryShadow(x - 1, y);
    if (x + 1 < width) tryShadow(x + 1, y);
    if (y > 0) tryShadow(x, y - 1);
    if (y + 1 < height) tryShadow(x, y + 1);
  }

  let shadowPixels = 0;
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    if (flooded[i] === 1) {
      rgba[o + 3] = 0;
    } else if (flooded[i] === 2) {
      shadowPixels++;
      const luma = (rgba[o] + rgba[o + 1] + rgba[o + 2]) / 3;
      // White→0 alpha, darker gray→more opaque soft shadow.
      const a = Math.max(0, Math.min(255, Math.round(255 - luma)));
      rgba[o] = 0;
      rgba[o + 1] = 0;
      rgba[o + 2] = 0;
      rgba[o + 3] = a;
    }
  }

  // Soft anti-alias fringe on the flood frontier only (not into subject whites).
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (flooded[i]) continue;
      let touches = false;
      if (x > 0 && flooded[i - 1]) touches = true;
      else if (x + 1 < width && flooded[i + 1]) touches = true;
      else if (y > 0 && flooded[i - width]) touches = true;
      else if (y + 1 < height && flooded[i + width]) touches = true;
      if (!touches) continue;
      const o = i * 4;
      const a = fringeAlpha(rgba[o], rgba[o + 1], rgba[o + 2]);
      if (a < 255) rgba[o + 3] = Math.min(rgba[o + 3], a);
    }
  }

  let opaque = 0;
  for (let i = 0; i < n; i++) {
    if (rgba[i * 4 + 3] > 0) opaque++;
  }
  return { flooded: whiteCount, shadowPixels, opaque, holeWhite: 0 };
}

/**
 * Forms/ladder only: remove flat white trapped inside the subject (e.g. between
 * ladder rungs). Never run on people — enclosed shirt/sneaker whites must stay.
 */
function clearEnclosedWhite(rgba, width, height) {
  const n = width * height;
  const seen = new Uint8Array(n);
  const queue = new Int32Array(n);
  let holeWhite = 0;

  for (let start = 0; start < n; start++) {
    if (seen[start]) continue;
    const so = start * 4;
    if (rgba[so + 3] === 0) continue;
    if (!isFloodWhite(rgba[so], rgba[so + 1], rgba[so + 2])) continue;

    let qh = 0;
    let qt = 0;
    queue[qt++] = start;
    seen[start] = 1;
    const comp = [];

    while (qh < qt) {
      const i = queue[qh++];
      comp.push(i);
      const x = i % width;
      const y = (i / width) | 0;
      const tryN = (ni) => {
        if (seen[ni]) return;
        const o = ni * 4;
        if (rgba[o + 3] === 0) return;
        if (!isFloodWhite(rgba[o], rgba[o + 1], rgba[o + 2])) return;
        seen[ni] = 1;
        queue[qt++] = ni;
      };
      if (x > 0) tryN(i - 1);
      if (x + 1 < width) tryN(i + 1);
      if (y > 0) tryN(i - width);
      if (y + 1 < height) tryN(i + width);
    }

    // Border-connected white was already cleared; any remaining flood-white
    // component is an interior hole (ladder gaps, etc.).
    for (const i of comp) {
      rgba[i * 4 + 3] = 0;
      holeWhite++;
    }
  }
  return holeWhite;
}

async function processLayer(stem) {
  const input = path.join(REVIEW, `${stem}.png`);
  if (!fs.existsSync(input)) {
    throw new Error(`Missing review asset: ${input}`);
  }

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.from(data);
  const stats = borderFloodAlpha(rgba, info.width, info.height);
  // Ladder only: white trapped between rungs. Do not run on spheres (specular
  // holes) or people (shirts/sneakers).
  if (stem === "09-ladder") {
    stats.holeWhite = clearEnclosedWhite(rgba, info.width, info.height);
    stats.opaque = 0;
    for (let i = 0; i < info.width * info.height; i++) {
      if (rgba[i * 4 + 3] > 0) stats.opaque++;
    }
  }

  fs.mkdirSync(OUT, { recursive: true });
  const outPath = path.join(OUT, `${stem}.png`);
  await sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outPath);

  // Chequerboard preview for by-eye review (not for production).
  fs.mkdirSync(PREVIEW, { recursive: true });
  const tile = 16;
  const preview = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const a = rgba[i + 3] / 255;
      const cell = ((x / tile) | 0) + ((y / tile) | 0);
      const g = cell % 2 === 0 ? 210 : 150;
      preview[i] = Math.round(rgba[i] * a + g * (1 - a));
      preview[i + 1] = Math.round(rgba[i + 1] * a + g * (1 - a));
      preview[i + 2] = Math.round(rgba[i + 2] * a + g * (1 - a));
      preview[i + 3] = 255;
    }
  }
  const previewPath = path.join(PREVIEW, `${stem}-chequer.png`);
  await sharp(preview, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(previewPath);

  // Dark ground preview — spots leftover white fringe.
  const dark = Buffer.alloc(info.width * info.height * 4);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const a = rgba[i + 3] / 255;
      dark[i] = Math.round(rgba[i] * a + 32 * (1 - a));
      dark[i + 1] = Math.round(rgba[i + 1] * a + 32 * (1 - a));
      dark[i + 2] = Math.round(rgba[i + 2] * a + 40 * (1 - a));
      dark[i + 3] = 255;
    }
  }
  const darkPath = path.join(PREVIEW, `${stem}-dark.png`);
  await sharp(dark, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(darkPath);

  return { stem, outPath, previewPath, darkPath, ...stats, width: info.width, height: info.height };
}

const args = process.argv.slice(2).filter((a) => a !== "--");
const stems =
  args.includes("--all")
    ? LAYER_FILES
    : args.length
      ? args.map((a) => a.replace(/\.png$/i, ""))
      : ["05-blue-cylinder", "07-centre-sphere"];

const unknown = stems.filter((s) => !LAYER_FILES.includes(s));
if (unknown.length) {
  console.error("Unknown layer stems:", unknown.join(", "));
  process.exit(1);
}

const results = [];
for (const stem of stems) {
  const r = await processLayer(stem);
  results.push(r);
  console.log(
    `${stem}: ${r.width}×${r.height} white=${r.flooded} shadow=${r.shadowPixels} holes=${r.holeWhite} opaque=${r.opaque} → ${path.relative(process.cwd(), r.outPath)}`,
  );
}

console.log(`\nPreviews in ${path.relative(process.cwd(), PREVIEW)}/ (chequer + dark).`);
console.log("Stop for by-eye before --all.");
