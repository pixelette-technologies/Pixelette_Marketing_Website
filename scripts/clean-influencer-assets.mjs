/**
 * Rebuild Influencer & Partnerships imagery from the approved mock.
 *
 * Rules for this pass:
 * - Hero: dark left copy field + collage right. Scrub baked scribble/glyphs only —
 *   never blur faces. HTML redraws the annotation.
 * - Close: camera crop that ends BEFORE the mock CTA pill. Page layout puts the
 *   photo in a right column so HTML CTA cannot sit over baked UI.
 * - Cards: photo interiors only (stop above mock icon discs).
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/Bilal/.cursor/projects/d-Projects-pixelette-marketing/assets/a_clean_modern_marketing_website_landing_page_u-af2f9f23-985d-4a54-9579-98174c5d9d1f.jpg";
const OUT = "public/services/influencer-partnerships";
const WORK = path.join(OUT, "_work");
fs.mkdirSync(WORK, { recursive: true });

const fullPath = path.join(WORK, "full4.png");
await sharp(SRC)
  .resize({ width: 2728, kernel: sharp.kernel.lanczos3 })
  .png()
  .toFile(fullPath);

async function replaceFile(dest, tmp) {
  if (fs.existsSync(dest)) fs.unlinkSync(dest);
  fs.renameSync(tmp, dest);
}

async function coverZones(inputBuf, zones) {
  const overlays = [];
  for (const z of zones) {
    const soft = await sharp(inputBuf)
      .extract({
        left: z.sample[0],
        top: z.sample[1],
        width: z.sample[2],
        height: z.sample[3]
      })
      .blur(z.blur ?? 36)
      .resize(z.w, z.h, { fit: "fill" })
      .modulate({ brightness: z.brightness ?? 0.9, saturation: z.saturation ?? 1 })
      .toBuffer();
    overlays.push({ input: soft, left: z.l, top: z.t });
  }
  return sharp(inputBuf).composite(overlays).toBuffer();
}

// ---------- HERO ----------
// Collage only (creators / phone / polaroids). No left copy column from the mock.
const heroTop = 240;
const heroH = 1000;
const collageL = 980;
const collageW = 2728 - collageL;

let collage = await sharp(fullPath)
  .extract({ left: collageL, top: heroTop, width: collageW, height: heroH })
  .toBuffer();

// Scrub baked "Creators Content Community" + arrow (above the woman, not on face).
// Sample from magenta brush / urban bg to the LEFT of the woman, not forehead.
collage = await coverZones(collage, [
  {
    // scribble block
    l: 420,
    t: 10,
    w: 620,
    h: 200,
    sample: [120, 220, 180, 140],
    blur: 42,
    brightness: 0.82,
    saturation: 1.05
  },
  {
    // leftover heading glyphs that bleed into collage left edge ("ands.")
    l: 0,
    t: 160,
    w: 220,
    h: 380,
    sample: [240, 400, 140, 160],
    blur: 30,
    brightness: 0.55
  }
]);

const leftW = 1000;
const heroW = leftW + collageW - 60;
const heroTmp = path.join(WORK, "hero-out.jpg");

await sharp({
  create: {
    width: heroW,
    height: heroH,
    channels: 3,
    background: { r: 26, g: 4, b: 18 }
  }
})
  .composite([{ input: collage, left: leftW - 60, top: 0 }])
  .jpeg({ quality: 92 })
  .toFile(heroTmp);

// Hard opaque left copy field — HTML owns all type/CTA here
{
  const hm = await sharp(heroTmp).metadata();
  const cover = await sharp({
    create: {
      width: 920,
      height: hm.height,
      channels: 3,
      background: { r: 26, g: 4, b: 18 }
    }
  })
    .jpeg()
    .toBuffer();
  const blend = await sharp(heroTmp)
    .extract({ left: 880, top: 0, width: 140, height: hm.height })
    .blur(18)
    .modulate({ brightness: 0.5, saturation: 1.08 })
    .toBuffer();
  const heroTmp2 = path.join(WORK, "hero-out2.jpg");
  await sharp(heroTmp)
    .composite([
      { input: cover, left: 0, top: 0 },
      { input: blend, left: 860, top: 0 }
    ])
    .jpeg({ quality: 92 })
    .toFile(heroTmp2);
  await replaceFile(path.join(OUT, "hero.jpg"), heroTmp2);
}

// ---------- CLOSE (camera only, ends before CTA pill ~x 1985 in band) ----------
// close-band sits at y 3300 in full4; CTA starts ~x 1985 within that band.
const closeTop = 3330;
const closeH = 500;
const cam = await sharp(fullPath)
  .extract({ left: 1100, top: closeTop, width: 850, height: closeH })
  .jpeg({ quality: 93 })
  .toBuffer();

// Verify / scrub any CTA bleed at the right edge of this crop
let camClean = cam;
{
  const { data, info } = await sharp(cam).raw().toBuffer({ resolveWithObject: true });
  let hits = 0;
  for (let y = 250; y < info.height - 40; y += 1) {
    for (let x = info.width - 120; x < info.width; x += 1) {
      const i = (y * info.width + x) * 3;
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2];
      if (r > 185 && g < 110 && b > 60 && r - g > 100) hits++;
    }
  }
  if (hits > 80) {
    camClean = await coverZones(cam, [
      {
        l: info.width - 140,
        t: 250,
        w: 140,
        h: 180,
        sample: [info.width - 280, 120, 100, 100],
        blur: 28,
        brightness: 0.55
      }
    ]);
  }
  console.log("close crop CTA-edge magenta hits:", hits);
}

const closeTmp = path.join(WORK, "close-out.jpg");
await sharp(camClean).jpeg({ quality: 93 }).toFile(closeTmp);
await replaceFile(path.join(OUT, "close.jpg"), closeTmp);

// ---------- CARDS ----------
const cards = [
  { name: "deliver-sourcing", left: 180, top: 1580, width: 700, height: 340 },
  { name: "deliver-strategy", left: 1020, top: 1580, width: 700, height: 340 },
  { name: "deliver-content", left: 1860, top: 1580, width: 700, height: 340 },
  { name: "deliver-performance", left: 580, top: 2600, width: 700, height: 340 },
  { name: "deliver-amplification", left: 1460, top: 2600, width: 700, height: 340 }
];

for (const c of cards) {
  const tmp = path.join(WORK, `${c.name}.jpg`);
  let buf = await sharp(fullPath)
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .jpeg({ quality: 93 })
    .toBuffer();
  // Cover residual icon disc / cream strip at bottom-left if present
  buf = await coverZones(buf, [
    {
      l: 0,
      t: c.height - 56,
      w: 72,
      h: 56,
      sample: [90, c.height - 110, 60, 40],
      blur: 20,
      brightness: 1
    }
  ]);
  await sharp(buf).jpeg({ quality: 93 }).toFile(tmp);
  await replaceFile(path.join(OUT, `${c.name}.jpg`), tmp);
}

console.log("assets rewritten:");
for (const f of fs.readdirSync(OUT).filter(x => x.endsWith(".jpg"))) {
  const m = await sharp(path.join(OUT, f)).metadata();
  console.log(`  ${f} ${m.width}x${m.height}`);
}
