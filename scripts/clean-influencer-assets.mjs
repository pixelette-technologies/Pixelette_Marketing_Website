/**
 * Rebuild Influencer & Partnerships imagery from the approved 4K mock.
 *
 * Source: native 4096×6144 PNG (6× the earlier 682×1024 preview).
 * Hero: dark left copy field + collage right. Keep "Creators Content
 * Community" annotation in the collage — do not redraw in HTML, do not
 * scrub it. Scrub only baked heading glyphs that bleed into the collage
 * left edge. Never blur faces.
 * Close: camera crop that ends BEFORE the mock CTA pill.
 * Cards: photo interiors only (stop above mock icon discs).
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC =
  "C:/Users/Bilal/.cursor/projects/d-Projects-pixelette-marketing/assets/pixelette_influencer_marketing_4K.png";
const OUT = "public/services/influencer-partnerships";
const WORK = path.join(OUT, "_work");
fs.mkdirSync(WORK, { recursive: true });

// Native 4K — no upscale. Prior crops were authored on a 2728-wide canvas
// (4× of 682); this PNG is 4096 wide (6× of 682) → scale = 1.5.
const SCALE = 4096 / 2728;
const s = (n) => Math.round(n * SCALE);

const fullPath = path.join(WORK, "full.png");
await sharp(SRC).png().toFile(fullPath);
const fullMeta = await sharp(fullPath).metadata();
console.log(`source ${fullMeta.width}x${fullMeta.height}`);

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
const heroTop = s(240);
const heroH = s(1000);
const collageL = s(980);
const collageW = fullMeta.width - collageL;

let collage = await sharp(fullPath)
  .extract({ left: collageL, top: heroTop, width: collageW, height: heroH })
  .toBuffer();

// Scrub leftover heading glyphs that bleed into collage left edge only.
// Do NOT scrub the Creators Content Community annotation.
collage = await coverZones(collage, [
  {
    l: 0,
    t: s(160),
    w: s(220),
    h: s(380),
    sample: [s(240), s(400), s(140), s(160)],
    blur: 30,
    brightness: 0.55
  }
]);

const leftW = s(1000);
const heroW = leftW + collageW - s(60);
const heroTmp = path.join(WORK, "hero-out.jpg");

await sharp({
  create: {
    width: heroW,
    height: heroH,
    channels: 3,
    background: { r: 26, g: 4, b: 18 }
  }
})
  .composite([{ input: collage, left: leftW - s(60), top: 0 }])
  .jpeg({ quality: 94 })
  .toFile(heroTmp);

{
  const hm = await sharp(heroTmp).metadata();
  const cover = await sharp({
    create: {
      width: s(920),
      height: hm.height,
      channels: 3,
      background: { r: 26, g: 4, b: 18 }
    }
  })
    .jpeg()
    .toBuffer();
  const blend = await sharp(heroTmp)
    .extract({ left: s(880), top: 0, width: s(140), height: hm.height })
    .blur(18)
    .modulate({ brightness: 0.5, saturation: 1.08 })
    .toBuffer();
  const heroTmp2 = path.join(WORK, "hero-out2.jpg");
  await sharp(heroTmp)
    .composite([
      { input: cover, left: 0, top: 0 },
      { input: blend, left: s(860), top: 0 }
    ])
    .jpeg({ quality: 94 })
    .toFile(heroTmp2);
  await replaceFile(path.join(OUT, "hero-collage-4k.jpg"), heroTmp2);
}

// ---------- CLOSE (camera only — crop ends before mock CTA, no scrub) ----------
const closeTop = s(3330);
const closeH = s(500);
const camLeft = s(1180);
const camW = s(720);
const closeTmp = path.join(WORK, "close-out.jpg");
await sharp(fullPath)
  .extract({ left: camLeft, top: closeTop, width: camW, height: closeH })
  .jpeg({ quality: 94 })
  .toFile(closeTmp);
await replaceFile(path.join(OUT, "close-camera-4k.jpg"), closeTmp);

// ---------- CARDS ----------
const cards = [
  { name: "deliver-sourcing", left: s(180), top: s(1580), width: s(700), height: s(340) },
  { name: "deliver-strategy", left: s(1020), top: s(1580), width: s(700), height: s(340) },
  { name: "deliver-content", left: s(1860), top: s(1580), width: s(700), height: s(340) },
  { name: "deliver-performance", left: s(580), top: s(2600), width: s(700), height: s(340) },
  { name: "deliver-amplification", left: s(1460), top: s(2600), width: s(700), height: s(340) }
];

for (const c of cards) {
  const tmp = path.join(WORK, `${c.name}.jpg`);
  let buf = await sharp(fullPath)
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .jpeg({ quality: 94 })
    .toBuffer();
  buf = await coverZones(buf, [
    {
      l: 0,
      t: c.height - s(56),
      w: s(72),
      h: s(56),
      sample: [s(90), c.height - s(110), s(60), s(40)],
      blur: 20,
      brightness: 1
    }
  ]);
  await sharp(buf).jpeg({ quality: 94 }).toFile(tmp);
  await replaceFile(path.join(OUT, `${c.name}-4k.jpg`), tmp);
}

console.log("assets rewritten:");
for (const f of fs.readdirSync(OUT).filter((x) => x.endsWith(".jpg"))) {
  const m = await sharp(path.join(OUT, f)).metadata();
  console.log(`  ${f} ${m.width}x${m.height}`);
}
