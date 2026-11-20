/**
 * Rebuild Influencer & Partnerships imagery from the approved mock.
 * Goal: photo/collage only — no baked-in headings, CTAs, or scribble doubles.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/Bilal/.cursor/projects/d-Projects-pixelette-marketing/assets/a_clean_modern_marketing_website_landing_page_u-af2f9f23-985d-4a54-9579-98174c5d9d1f.jpg";
const OUT = "public/services/influencer-partnerships";
const WORK = path.join(OUT, "_work");

fs.mkdirSync(WORK, { recursive: true });

async function solidishCover(buf, regions) {
  const overlays = [];
  for (const [l, t, w, h, sample] of regions) {
    const [sl, st, sw, sh] = sample;
    const soft = await sharp(buf)
      .extract({ left: sl, top: st, width: sw, height: sh })
      .blur(48)
      .resize(w, h, { fit: "fill" })
      .modulate({ brightness: 0.9 })
      .toBuffer();
    overlays.push({ input: soft, left: l, top: t });
  }
  return sharp(buf).composite(overlays).toBuffer();
}

const fullPath = path.join(WORK, "full4.png");
if (!fs.existsSync(fullPath)) {
  await sharp(SRC)
    .resize({ width: 2728, kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(fullPath);
}

const W = 2728;

// ---------- HERO: dark left + collage right, no copy column ----------
const heroTop = 230;
const heroH = 980;
const collageL = 920;
const collageW = W - collageL;

let collage = await sharp(fullPath)
  .extract({ left: collageL, top: heroTop, width: collageW, height: heroH })
  .toBuffer();

// Scrub handwritten "Creators Content Community" (HTML redraws it)
collage = await solidishCover(collage, [
  [360, 0, 560, 230, [180, 280, 200, 140]],
  [0, 720, 180, 180, [100, 500, 140, 100]]
]);

const leftW = 980;
const heroW = leftW + collageW - 40;

await sharp({
  create: {
    width: heroW,
    height: heroH,
    channels: 3,
    background: { r: 28, g: 5, b: 20 }
  }
})
  .composite([{ input: collage, left: leftW - 40, top: 0 }])
  .jpeg({ quality: 92 })
  .toFile(path.join(OUT, "hero.jpg"));

// Hard-clean left band so no mock text can survive under HTML
{
  const heroNow = path.join(OUT, "hero.jpg");
  const heroTmp = path.join(WORK, "hero-clean.jpg");
  const hm = await sharp(heroNow).metadata();
  const cover = await sharp({
    create: {
      width: 900,
      height: hm.height,
      channels: 3,
      background: { r: 28, g: 5, b: 20 }
    }
  })
    .jpeg()
    .toBuffer();
  const blend = await sharp(heroNow)
    .extract({ left: 860, top: 0, width: 140, height: hm.height })
    .blur(22)
    .modulate({ brightness: 0.48, saturation: 1.1 })
    .toBuffer();
  await sharp(heroNow)
    .composite([
      { input: cover, left: 0, top: 0 },
      { input: blend, left: 840, top: 0 }
    ])
    .jpeg({ quality: 92 })
    .toFile(heroTmp);
  fs.unlinkSync(heroNow);
  fs.renameSync(heroTmp, heroNow);
}// ---------- CLOSE: dark left + camera right, no CTA pill ----------
const closeTop = 3380;
const closeH = 480;
let closePhoto = await sharp(fullPath)
  .extract({ left: 1480, top: closeTop, width: 1120, height: closeH })
  .toBuffer();

closePhoto = await solidishCover(closePhoto, [
  [0, 120, 380, 180, [520, 60, 220, 140]]
]);

const closeW = 2200;
await sharp({
  create: {
    width: closeW,
    height: closeH,
    channels: 3,
    background: { r: 28, g: 5, b: 20 }
  }
})
  .composite([{ input: closePhoto, left: closeW - 1120, top: 0 }])
  .jpeg({ quality: 92 })
  .toFile(path.join(OUT, "close.jpg"));

{
  const c = path.join(OUT, "close.jpg");
  const cTmp = path.join(WORK, "close-clean.jpg");
  const cm = await sharp(c).metadata();
  const leftCover = await sharp({
    create: {
      width: Math.round(cm.width * 0.55),
      height: cm.height,
      channels: 3,
      background: { r: 28, g: 5, b: 20 }
    }
  })
    .jpeg()
    .toBuffer();
  const mid = await sharp(c)
    .extract({
      left: Math.round(cm.width * 0.5),
      top: 0,
      width: 120,
      height: cm.height
    })
    .blur(26)
    .modulate({ brightness: 0.42 })
    .toBuffer();
  await sharp(c)
    .composite([
      { input: leftCover, left: 0, top: 0 },
      { input: mid, left: Math.round(cm.width * 0.5), top: 0 }
    ])
    .jpeg({ quality: 92 })
    .toFile(cTmp);
  fs.unlinkSync(c);
  fs.renameSync(cTmp, c);
}// ---------- CARDS: photo interiors only (stop above icon discs) ----------
const cards = [
  { name: "deliver-sourcing", left: 160, top: 1560, width: 720, height: 380 },
  { name: "deliver-strategy", left: 1000, top: 1560, width: 720, height: 380 },
  { name: "deliver-content", left: 1840, top: 1560, width: 720, height: 380 },
  {
    name: "deliver-performance",
    left: 560,
    top: 2580,
    width: 720,
    height: 380
  },
  {
    name: "deliver-amplification",
    left: 1440,
    top: 2580,
    width: 720,
    height: 380
  }
];

for (const c of cards) {
  await sharp(fullPath)
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .jpeg({ quality: 93 })
    .toFile(path.join(OUT, `${c.name}.jpg`));
}

console.log("assets rewritten:");
for (const f of fs.readdirSync(OUT).filter(x => x.endsWith(".jpg"))) {
  const m = await sharp(path.join(OUT, f)).metadata();
  console.log(`  ${f} ${m.width}x${m.height}`);
}
