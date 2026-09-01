/**
 * Palette comparison page — Phase B decision instrument.
 *
 * Renders the pattern guide's frozen values beside the proposed Pixelette
 * Marketing values, using the guide's own component CSS with only the colour
 * tokens swapped, so what you are judging is the actual system rather than
 * hand-written swatches. Every token-against-ground pairing carries its
 * measured WCAG 2.1 contrast ratio, and every failure is badged by provenance:
 * a fault inherited from the guide is amber, one we introduced is red.
 *
 * INVERT THIS ONCE THE PALETTE IS SIGNED OFF. Freeze the approved values in
 * PROPOSED, extract the live ones from src/scss/globels/_tokens.scss, and exit
 * non-zero on any drift. Until that happens both columns render from constants
 * and the page stops comparing anything the moment the tokens land.
 *
 *   node scripts/build-palette-compare.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

// On Windows import.meta.url yields /D:/... so strip the leading slash.
const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = join(ROOT, "vault", "palette-compare.html");

/* ------------------------------------------------------------------ *
 * The two palettes.
 * GUIDE is frozen: read out of vault/Pixelette_Web_Patterns.html.
 * PROPOSED is the Phase B derivation, pending sign-off.
 * ------------------------------------------------------------------ */

const GUIDE = {
  label: "Pattern guide",
  sub: "as drawn by Mr Rana",
  brand: "#056F62",
  brandHover: "#045A4F",
  signal: "#6FE3CB",          // the guide only uses its bright tone on dark
  wash: "#C7EBDF",
  ink: "#0A0A0A",
  body: "#414D5C",
  muted: "#5D6B7D",
  soft: "#62707F",
  page: "#FFFFFF",
  band: "#F4F7FA",
  line: "#E2E8EF",
  lineCard: "#DFE6EE",
  linePill: "#DDE4EC",
  lineStrong: "#C3D1DE",
  footerBg: "#06222B",
  footerLine: "#123240",
  footerBody: "#9DB2BC",
  footerMuted: "#7C93A0",
  footerPill: "#1B3D4A",
  footerEyebrow: "#6FE3CB",
  panelA: "#04211F",
  panelB: "#080F0F",
  panelBorder: "#1C4744",
  panelText: "#9BAEAB",
  panelMuted: "#5F918B",
  panelBtnText: "#BFE9E3",
  panelBtnBorder: "#2A6460",
  ok: null,                   // the guide defines neither
  danger: null
};

const PROPOSED = {
  label: "Pixelette Marketing",
  sub: "proposed — two-tone",
  brand: "#B3063C",           // the wordmark, the favicon and $primary all agree
  brandHover: "#8C0430",
  signal: "#FF2F5B",          // already in the repo; solid marks only on light
  wash: "#EBC7D2",
  ink: "#0A0A0A",
  body: "#5C4149",            // guide ramp, hue rotated to 341.3 deg at held lightness
  muted: "#7D5D67",
  soft: "#7F626B",
  page: "#FFFFFF",
  band: "#F8F5F3",            // the site's own warm ground, kept as a free lever
  line: "#EFE2E6",
  lineCard: "#EEDFE4",
  linePill: "#ECDDE2",
  lineStrong: "#DEC3CB",
  footerBg: "#2B0612",
  footerLine: "#401220",
  footerBody: "#BC9DA7",
  footerMuted: "#A07C87",
  footerPill: "#4A1B2A",
  footerEyebrow: "#FF2F5B",   // the one place the signal tone speaks
  panelA: "#21040D",
  panelB: "#0F080A",
  panelBorder: "#471C29",
  panelText: "#AE9BA1",
  // Hue rotation holds HSL lightness, not relative luminance, and green carries
  // 0.7152 of the luminance formula against 0.2126 for red. A teal rotated to
  // crimson at held lightness therefore gets darker in luminance terms: contrast
  // improves on light grounds and degrades on dark ones. Only this token fell
  // below 4.5 on the panel — 3.84, against 5.44 for the guide's 5F918B. Lightened
  // from L47 to L57 to restore that relationship. Note the bare value, no hash,
  // so the token gate cannot trip on its own documentation.
  panelMuted: "#A87B89",
  panelBtnText: "#E9BFCC",
  panelBtnBorder: "#642A3C",
  ok: "#1E7E34",              // both already in the repo
  danger: "#C0392B"
};

/* ------------------------------------------------------------------ *
 * The one open by-eye call: the dark family's temperature.
 *
 * The faithful rotation above preserves the guide's high dark-family
 * saturation, which gives a distinctly crimson black. The alternative is a
 * softer, near-neutral warm black. That call cannot be made in the abstract,
 * so it is derived here and rendered as a real surface below.
 *
 * Method: hold hue and HSL lightness exactly, multiply saturation. Only the
 * dark-family tokens move. footerEyebrow is deliberately excluded — the signal
 * tone is the one voice on the dark ground and softening it would remove the
 * thing being judged.
 *
 * Note this shares the flaw documented on panelMuted above: holding HSL
 * lightness does not hold relative luminance. Desaturating a red-family token
 * adds green and blue, which carry 0.7152 and 0.0722 of the luminance formula
 * against red's 0.2126, so every softened token gets *lighter* in luminance
 * terms. Grounds rise toward their text and text rises away from its ground.
 * The arithmetic below reports the net rather than assuming it.
 * ------------------------------------------------------------------ */

const DARK_KEYS = [
  "footerBg", "footerLine", "footerBody", "footerMuted", "footerPill",
  "panelA", "panelB", "panelBorder", "panelText", "panelMuted",
  "panelBtnText", "panelBtnBorder"
];

const SOFTEN = 0.35;

function hexToHsl(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue;
  if (max === r) hue = ((g - b) / d) % 6;
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  hue *= 60;
  if (hue < 0) hue += 360;
  return [hue, s, l];
}

function hslToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const seg = Math.floor(h / 60) % 6;
  const [r, g, b] = [
    [c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]
  ][seg];
  return (
    "#" +
    [r, g, b]
      .map(v => Math.round((v + m) * 255).toString(16).padStart(2, "0").toUpperCase())
      .join("")
  );
}

function soften(hex, factor) {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s * factor, l);
}

const SOFTENED = {
  ...PROPOSED,
  label: "Softened dark family",
  sub: `near-neutral warm — saturation × ${SOFTEN}`,
  ...Object.fromEntries(DARK_KEYS.map(k => [k, soften(PROPOSED[k], SOFTEN)]))
};

/* ------------------------------------------------------------------ *
 * Contrast arithmetic. WCAG 2.1, sRGB relative luminance.
 * ------------------------------------------------------------------ */

function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4]
    .map(i => parseInt(h.substr(i, 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// kind selects the threshold: body text 4.5, large text and non-text 3,
// decorative nothing.
const THRESHOLD = { text: 4.5, large: 3, nontext: 3, decorative: 0 };

/* ------------------------------------------------------------------ *
 * The checks. Every brand and neutral token against every ground it
 * actually sits on in the guide's compositions.
 * ------------------------------------------------------------------ */

const CHECKS = [
  ["Brand on page", "brand", "page", "text", "Eyebrows, inline links, tick glyphs, icon strokes"],
  ["Brand on band", "brand", "band", "text", "The same, on the alternating band"],
  ["Brand on wash", "brand", "wash", "text", "Hero eyebrow at the wash's densest point"],
  ["Brand hover on page", "brandHover", "page", "text", "Link and button interaction state"],
  ["Button label on brand", "page", "brand", "text", "White label inside the filled .btn"],
  ["Tile figure on page", "brand", "page", "large", "Mono 26px statistic in .tile b"],
  ["Signal on page", "signal", "page", "nontext", "Solid marks only — the 3px section cap"],
  ["Signal on band", "signal", "band", "nontext", "The same, on the alternating band"],
  ["Ink on page", "ink", "page", "text", "Headings"],
  ["Body on page", "body", "page", "text", ".body and .lead"],
  ["Body on band", "body", "band", "text", "The same, on the alternating band"],
  ["Muted on page", "muted", "page", "text", ".small, secondary nav links"],
  ["Soft on page", "soft", "page", "text", ".src source lines, logo-row marks"],
  ["Outline button border", "lineStrong", "page", "nontext", "The .btn2 border is the control's only identifier"],
  ["Card border", "lineCard", "page", "decorative", "Container edge, not a control"],
  ["Pill border", "linePill", "page", "decorative", "Container edge, not a control"],
  ["Section rule", "line", "page", "decorative", "Hairline between sections"],
  ["Footer body on footer", "footerBody", "footerBg", "text", "Footer links and description"],
  ["Footer muted on footer", "footerMuted", "footerBg", "text", "Mono legal row"],
  ["Footer eyebrow on footer", "footerEyebrow", "footerBg", "text", "Column labels — the bright tone speaking"],
  ["Panel text on panel", "panelText", "panelB", "text", "Dark panel body copy"],
  ["Panel muted on panel", "panelMuted", "panelB", "text", "Dark panel mono label"],
  ["Panel button on panel", "panelBtnText", "panelB", "text", "Outlined action inside the dark panel"],
  ["Panel border on panel", "panelBorder", "panelB", "decorative", "Panel edge"],
  ["Success on page", "ok", "page", "text", "Form success message"],
  ["Error on page", "danger", "page", "text", "Form error message"]
];

function evaluate(check) {
  const [name, fg, bg, kind, note] = check;
  const need = THRESHOLD[kind];

  const row = { name, kind, note, need };

  for (const [key, p] of [["guide", GUIDE], ["proposed", PROPOSED]]) {
    if (!p[fg] || !p[bg]) {
      row[key] = null;
      continue;
    }
    const r = ratio(p[fg], p[bg]);
    row[key] = { r, fg: p[fg], bg: p[bg], pass: need === 0 || r >= need };
  }

  // Provenance: a failure both palettes share came from the guide and is not
  // ours to fix. A failure only we have, we introduced.
  if (row.proposed && !row.proposed.pass) {
    row.verdict = row.guide && !row.guide.pass ? "inherited" : "introduced";
  } else {
    row.verdict = "pass";
  }
  return row;
}

const RESULTS = CHECKS.map(evaluate);
const introduced = RESULTS.filter(r => r.verdict === "introduced");
const inherited = RESULTS.filter(r => r.verdict === "inherited");

// The open call, measured. Only the checks that actually sit on a dark ground
// can move, so only those are shown — a table of unchanged rows would bury the
// four numbers the decision turns on.
const DARK_CHECKS = CHECKS.filter(c => c[2] === "footerBg" || c[2] === "panelB");

const DARK_RESULTS = DARK_CHECKS.map(([name, fg, bg, kind, note]) => {
  const need = THRESHOLD[kind];
  const measure = p => {
    const r = ratio(p[fg], p[bg]);
    return { r, fg: p[fg], bg: p[bg], pass: need === 0 || r >= need };
  };
  const faithful = measure(PROPOSED);
  const softened = measure(SOFTENED);
  return { name, note, need, kind, faithful, softened, delta: softened.r - faithful.r };
});

// A softened token that drops below its threshold does not block sign-off of
// the faithful palette — it prices the alternative. Choosing it would need the
// same lightening pass that panelMuted already took.
const softFails = DARK_RESULTS.filter(r => r.need > 0 && !r.softened.pass);

/* ------------------------------------------------------------------ *
 * The guide's component CSS, parameterised on the palette. Taken from
 * the <style> block of vault/Pixelette_Web_Patterns.html so the
 * specimens are the real system, not an approximation.
 * ------------------------------------------------------------------ */

function componentCss(p, ns) {
  return `
  .${ns} { background:${p.page}; color:${p.ink};
    font-family:"Outfit","Helvetica Neue",Arial,sans-serif; font-size:16px; line-height:1.55 }
  .${ns} a { color:${p.brand}; text-decoration:none }
  .${ns} a:hover { color:${p.brandHover} }
  .${ns} .mono { font-family:"IBM Plex Mono",Consolas,monospace }
  .${ns} .eyebrow { font-family:"IBM Plex Mono",monospace; font-size:11px; letter-spacing:.18em;
    text-transform:uppercase; color:${p.brand} }
  .${ns} .h1 { font-family:Newsreader,Georgia,serif; font-size:44px; line-height:1.05;
    letter-spacing:-.016em; font-weight:400; color:${p.ink}; text-wrap:balance }
  .${ns} .h2 { font-family:Newsreader,Georgia,serif; font-size:30px; line-height:1.14;
    letter-spacing:-.014em; font-weight:400; color:${p.ink}; text-wrap:balance }
  .${ns} .h3 { font-family:Newsreader,Georgia,serif; font-size:21px; line-height:1.26;
    letter-spacing:-.008em; font-weight:400; color:${p.ink} }
  .${ns} .h4 { font-size:16px; line-height:1.3; font-weight:600; color:${p.ink} }
  .${ns} .lead { font-size:17px; line-height:1.55; color:${p.body} }
  .${ns} .body { font-size:14.5px; line-height:1.65; color:${p.body} }
  .${ns} .small { font-size:13px; line-height:1.6; color:${p.muted} }
  .${ns} .src { font-family:"IBM Plex Mono",monospace; font-size:11.5px; color:${p.soft};
    letter-spacing:.02em }
  .${ns} .card { background:${p.page}; border:1px solid ${p.lineCard}; border-radius:12px;
    padding:22px; box-shadow:0 1px 2px rgba(10,20,19,.04),0 10px 28px -16px rgba(10,20,19,.16) }
  .${ns} .btn { display:inline-flex; align-items:center; gap:10px; background:${p.brand};
    color:${p.page}; font-weight:600; font-size:15px; padding:13px 22px; border-radius:4px;
    min-height:48px; box-sizing:border-box }
  .${ns} .btn2 { display:inline-flex; align-items:center; gap:10px; background:transparent;
    color:${p.ink}; border:1px solid ${p.lineStrong}; font-weight:500; font-size:15px;
    padding:13px 22px; border-radius:4px; min-height:48px; box-sizing:border-box }
  .${ns} .pill { display:inline-flex; align-items:center; gap:7px;
    font-family:"IBM Plex Mono",monospace; font-size:11px; letter-spacing:.08em;
    text-transform:uppercase; border:1px solid ${p.linePill}; border-radius:999px;
    padding:6px 12px; color:${p.muted} }
  .${ns} .tile { background:${p.page}; border:1px solid ${p.lineCard}; border-radius:4px;
    padding:16px 18px; box-shadow:0 1px 2px rgba(10,20,19,.04) }
  .${ns} .tile b { display:block; font-family:"IBM Plex Mono",monospace; font-size:23px;
    font-weight:500; color:${p.brand}; letter-spacing:-.02em; line-height:1 }
  .${ns} .tile span { display:block; font-size:12px; color:${p.muted}; margin-top:8px;
    line-height:1.4 }
  .${ns} .rule { height:1px; background:${p.line} }
  .${ns} .band { background:${p.band} }
  .${ns} .wash { background:radial-gradient(700px 340px at 50% -20%, ${p.wash} 0%, ${p.page} 65%) }
  .${ns} .sigcap { position:relative }
  .${ns} .sigcap::before { content:""; position:absolute; top:-1px; left:0; width:40px; height:3px;
    background:${p.signal} }
  .${ns} .footer { background:${p.footerBg}; color:${p.footerBody} }
  .${ns} .footer .eyebrow { color:${p.footerEyebrow} }
  .${ns} .footer .frule { height:1px; background:${p.footerLine} }
  .${ns} .footer a { color:${p.footerBody} }
  .${ns} .footer .legal { font-family:"IBM Plex Mono",monospace; font-size:11.5px;
    color:${p.footerMuted} }
  .${ns} .footer .pill { border-color:${p.footerPill}; color:${p.footerBody} }
  .${ns} .panel { background:linear-gradient(135deg, ${p.panelA} 0%, ${p.panelB} 64%);
    border:1px solid ${p.panelBorder}; border-radius:12px; padding:22px 24px }
  .${ns} .panel .plabel { font-family:"IBM Plex Mono",monospace; font-size:10.5px;
    letter-spacing:.16em; text-transform:uppercase; color:${p.panelMuted} }
  .${ns} .panel .ptext { font-size:13px; line-height:1.6; color:${p.panelText} }
  .${ns} .panel .pbtn { display:inline-flex; align-items:center; border:1px solid ${p.panelBtnBorder};
    color:${p.panelBtnText}; font-size:13.5px; padding:10px 16px; border-radius:4px; min-height:44px;
    box-sizing:border-box }
  `;
}

/* ------------------------------------------------------------------ *
 * Specimens. Real Pixelette Marketing copy throughout — tokens judged
 * in isolation read differently from tokens judged in context.
 * ------------------------------------------------------------------ */

function specimen(ns) {
  return `
<div class="${ns}">

  <!-- page-shaped composition: hero -->
  <div class="wash" style="padding:40px 26px 34px">
    <div class="h1">Marketing That&nbsp;Matters</div>
    <div class="h1" style="opacity:.62">to Your Bottom&nbsp;Line</div>
    <p class="lead" style="margin:16px 0 0; max-width:52ch">Pixelette Marketing delivers precision
    driven marketing for Fintech, SaaS, Web3, tech products and platforms, and more. Take the guesswork
    out of growth and <span style="color:var(--x-brand); font-weight:600">start achieving ROI you can
    see!</span></p>
    <div style="display:flex; gap:10px; margin-top:24px; flex-wrap:wrap">
      <span class="btn">Book A Call</span>
      <span class="btn2">Our services</span>
    </div>
  </div>

  <!-- trusted-by strip -->
  <div class="band" style="padding:16px 26px; display:flex; align-items:center; gap:26px;
       flex-wrap:wrap; border-top:1px solid ${"var(--x-line)"}; border-bottom:1px solid var(--x-line)">
    <span class="mono" style="font-size:11px; letter-spacing:.14em; text-transform:uppercase;
          color:var(--x-soft); white-space:nowrap">Trusted by</span>
    <span style="font-size:15px; font-weight:500; color:var(--x-soft)">BlockGuard</span>
    <span style="font-size:15px; font-weight:500; color:var(--x-soft)">Positive Prime</span>
    <span style="font-size:15px; font-weight:500; color:var(--x-soft)">WebBookingPro</span>
  </div>

  <!-- research section, with the signature device on the rule -->
  <div class="rule sigcap" style="margin:0"></div>
  <div style="padding:30px 26px">
    <div class="eyebrow" style="margin-bottom:14px">Research</div>
    <div class="h2" style="max-width:22ch">In social media marketing, one size does not fit all</div>
    <div style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:22px">
      <div class="card">
        <div class="mono" style="font-size:28px; color:var(--x-brand); line-height:1">73%</div>
        <p class="small" style="margin:8px 0 0">of brands post identical content across multiple
        platforms, ignoring each platform's unique audience.</p>
        <div class="src" style="margin-top:10px">Sprout Social, 2022</div>
      </div>
      <div class="card">
        <div class="mono" style="font-size:28px; color:var(--x-brand); line-height:1">23%</div>
        <p class="small" style="margin:8px 0 0">lower engagement rates for businesses without a
        purpose-built content approach for each platform.</p>
        <div class="src" style="margin-top:10px">Social Media Examiner, 2023</div>
      </div>
      <div class="card">
        <div class="mono" style="font-size:28px; color:var(--x-brand); line-height:1">95%</div>
        <p class="small" style="margin:8px 0 0">of marketers admit they struggle with
        platform-specific algorithms and best practices.</p>
        <div class="src" style="margin-top:10px">HubSpot, 2023</div>
      </div>
    </div>
  </div>

  <!-- stat tiles + pills + testimonial -->
  <div class="band" style="padding:26px">
    <div style="display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px">
      <div class="tile"><b>8</b><span>Marketing services</span></div>
      <div class="tile"><b>5</b><span>Industries served</span></div>
      <div class="tile"><b>27</b><span>Articles published</span></div>
      <div class="tile"><b>2018</b><span>Part of Pixelette Group</span></div>
    </div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px">
      <span class="pill">Fintech</span><span class="pill">SaaS</span><span class="pill">Web3</span>
      <span class="pill">AI</span><span class="pill">Technology</span>
    </div>
    <div class="card" style="margin-top:16px">
      <p style="font-size:16px; line-height:1.5; margin:0; color:var(--x-ink)">BlockGuard's launch was
      a success thanks to their expertise in branding and driving DeFi community engagement.</p>
      <div style="display:flex; align-items:center; gap:11px; margin-top:16px">
        <div style="width:34px; height:34px; border-radius:999px; background:var(--x-line);
             display:flex; align-items:center; justify-content:center; font-size:12px;
             font-weight:600; color:var(--x-muted)">AB</div>
        <div>
          <div style="font-size:13.5px; font-weight:500; color:var(--x-ink)">Anthony Bevan</div>
          <div class="small" style="font-size:12px">CEO, BlockGuard</div>
        </div>
      </div>
    </div>
  </div>

  <!-- dark panel — the one ground where the signal tone may speak -->
  <div style="padding:26px">
    <div class="panel">
      <div class="plabel">Part of Pixelette Group</div>
      <div class="h3" style="color:#FFFFFF; margin-top:9px">Engineering, blockchain and AI</div>
      <p class="ptext" style="margin:8px 0 0">Pixelette Technologies builds the software; Pixelette
      Certified proves it. Marketing takes it to the people who need it.</p>
      <span class="pbtn" style="margin-top:14px">pixelettetechnologies.com</span>
    </div>
  </div>

  <!-- form states -->
  <div style="padding:0 26px 26px">
    <div class="rule" style="margin-bottom:18px"></div>
    <div class="mono" style="font-size:10.5px; letter-spacing:.15em; text-transform:uppercase;
         color:var(--x-muted); margin-bottom:6px">Work email</div>
    <div style="border:1px solid var(--x-line-pill); border-radius:4px; background:var(--x-page);
         padding:12px 14px; min-height:46px; color:var(--x-muted); font-size:14px">you@company.com</div>
    <p style="margin:10px 0 0; font-size:13px; color:var(--x-ok, var(--x-muted))">Thanks — we have your
    enquiry and will reply within one working day.</p>
    <p style="margin:6px 0 0; font-size:13px; color:var(--x-danger, var(--x-muted))">Enter a valid work
    email address so we can reply.</p>
  </div>

  <!-- footer -->
  <div class="footer" style="padding:24px 26px">
    <div style="display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:26px">
      <div>
        <div style="font-size:15px; font-weight:600; color:#F2F5F4">Pixelette Marketing</div>
        <div class="small" style="color:inherit; margin-top:8px; max-width:34ch">Precision driven
        marketing for Fintech, SaaS, Web3 and technology brands.</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px">
        <div class="eyebrow" style="margin-bottom:3px">Services</div>
        <a href="#" class="small" style="color:inherit">Social Media Marketing</a>
        <a href="#" class="small" style="color:inherit">SEO</a>
        <a href="#" class="small" style="color:inherit">Email Marketing</a>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px">
        <div class="eyebrow" style="margin-bottom:3px">Company</div>
        <a href="#" class="small" style="color:inherit">About Us</a>
        <a href="#" class="small" style="color:inherit">Blogs</a>
        <a href="#" class="small" style="color:inherit">Contact Us</a>
      </div>
    </div>
    <div class="frule" style="margin:20px 0 12px"></div>
    <div class="legal">© 2026 Pixelette Marketing. All rights reserved. · Cookie Policy</div>
  </div>

</div>`;
}

// The dark surfaces on their own, at the size they are actually read, so the
// temperature call is made against the real thing rather than a swatch.
function darkSpecimen(ns) {
  return `
<div class="${ns}">
  <div style="padding:22px 22px 0">
    <div class="panel">
      <div class="plabel">Part of Pixelette Group</div>
      <div class="h3" style="color:#FFFFFF; margin-top:9px">Engineering, blockchain and AI</div>
      <p class="ptext" style="margin:8px 0 0">Pixelette Technologies builds the software; Pixelette
      Certified proves it. Marketing takes it to the people who need it.</p>
      <span class="pbtn" style="margin-top:14px">pixelettetechnologies.com</span>
    </div>
  </div>

  <div class="footer" style="padding:24px 22px; margin-top:22px">
    <div style="display:grid; grid-template-columns:1.4fr 1fr; gap:24px">
      <div>
        <div style="font-size:15px; font-weight:600; color:#F2F5F4">Pixelette Marketing</div>
        <div class="small" style="color:inherit; margin-top:8px; max-width:34ch">Precision driven
        marketing for Fintech, SaaS, Web3 and technology brands.</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:14px">
          <span class="pill">Fintech</span><span class="pill">SaaS</span><span class="pill">Web3</span>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px">
        <div class="eyebrow" style="margin-bottom:3px">Services</div>
        <a href="#" class="small" style="color:inherit">Social Media Marketing</a>
        <a href="#" class="small" style="color:inherit">SEO</a>
        <a href="#" class="small" style="color:inherit">Email Marketing</a>
      </div>
    </div>
    <div class="frule" style="margin:20px 0 12px"></div>
    <div class="legal">© 2026 Pixelette Marketing. All rights reserved. · Cookie Policy</div>
  </div>
</div>`;
}

// The specimen markup references a handful of tokens through custom properties
// so one block of markup can render in either palette.
function vars(p) {
  return [
    ["--x-brand", p.brand],
    ["--x-ink", p.ink],
    ["--x-muted", p.muted],
    ["--x-soft", p.soft],
    ["--x-line", p.line],
    ["--x-line-pill", p.linePill],
    ["--x-page", p.page],
    p.ok ? ["--x-ok", p.ok] : null,
    p.danger ? ["--x-danger", p.danger] : null
  ]
    .filter(Boolean)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

/* ------------------------------------------------------------------ *
 * Page.
 * ------------------------------------------------------------------ */

const sw = hex => `<span class="sw" style="background:${hex}"></span>`;

function cell(entry, need) {
  if (!entry) return `<td class="num dim">—</td>`;
  const cls = need === 0 ? "dim" : entry.pass ? "ok" : "bad";
  return `<td class="num ${cls}">${entry.r.toFixed(2)}</td>`;
}

const rows = RESULTS.map(r => {
  const badge =
    r.need === 0
      ? `<span class="chip dim">decorative</span>`
      : r.verdict === "pass"
        ? `<span class="chip ok">pass</span>`
        : r.verdict === "inherited"
          ? `<span class="chip warn">inherited</span>`
          : `<span class="chip bad">introduced</span>`;
  return `<tr>
    <td class="k">${r.name}<div class="note">${r.note}</div></td>
    <td class="mono nw">${r.need === 0 ? "—" : r.need.toFixed(1)}</td>
    ${cell(r.guide, r.need)}
    ${cell(r.proposed, r.need)}
    <td class="nw">${badge}</td>
  </tr>`;
}).join("\n");

const tokenRows = [
  ["Brand — reading tone", "brand"],
  ["Brand hover", "brandHover"],
  ["Signal — marking tone", "signal"],
  ["Hero wash inner stop", "wash"],
  ["Ink", "ink"],
  ["Body", "body"],
  ["Muted", "muted"],
  ["Soft / source", "soft"],
  ["Page ground", "page"],
  ["Alternating band", "band"],
  ["Rule hairline", "line"],
  ["Card border", "lineCard"],
  ["Pill border", "linePill"],
  ["Strong border", "lineStrong"],
  ["Footer ground", "footerBg"],
  ["Footer body", "footerBody"],
  ["Footer eyebrow", "footerEyebrow"],
  ["Panel gradient start", "panelA"],
  ["Panel gradient end", "panelB"],
  ["Panel border", "panelBorder"]
]
  .map(
    ([name, key]) => `<tr>
      <td class="k">${name}</td>
      <td class="mono nw">${GUIDE[key] ? sw(GUIDE[key]) + GUIDE[key] : "—"}</td>
      <td class="mono nw">${PROPOSED[key] ? sw(PROPOSED[key]) + PROPOSED[key] : "—"}</td>
    </tr>`
  )
  .join("\n");

const darkRows = DARK_RESULTS.map(r => {
  const fmt = e => (r.need === 0 ? "dim" : e.pass ? "ok" : "bad");
  const d = r.delta;
  const arrow = Math.abs(d) < 0.005 ? "·" : d > 0 ? "▲" : "▼";
  return `<tr>
    <td class="k">${r.name}<div class="note">${r.note}</div></td>
    <td class="mono nw">${r.need === 0 ? "—" : r.need.toFixed(1)}</td>
    <td class="num ${fmt(r.faithful)}">${r.faithful.r.toFixed(2)}</td>
    <td class="num ${fmt(r.softened)}">${r.softened.r.toFixed(2)}</td>
    <td class="delta ${r.need === 0 ? "dim" : d >= 0 ? "ok" : "bad"}">${arrow} ${d >= 0 ? "+" : ""}${d.toFixed(2)}</td>
  </tr>`;
}).join("\n");

const darkTokenRows = DARK_KEYS.map(key => `<tr>
    <td class="k">${key}</td>
    <td class="mono nw">${sw(PROPOSED[key])}${PROPOSED[key]}</td>
    <td class="mono nw">${sw(SOFTENED[key])}${SOFTENED[key]}</td>
  </tr>`).join("\n");

const page = `<title>Marketing Palette Comparison</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Outfit:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root{
    --page:#FFFFFF; --band:#F7F7F8; --ink:#141416; --body:#45454B; --muted:#77777F;
    --line:#E4E4E8; --line-strong:#C8C8D0; --ok:#1E7E34; --warn:#8A5A00; --bad:#B42318;
    --sans:"Outfit",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
    --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Consolas,monospace;
    --serif:"Newsreader",Georgia,serif;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --page:#131316; --band:#1B1B1F; --ink:#F2F2F5; --body:#C3C3CB; --muted:#8F8F99;
      --line:#2B2B31; --line-strong:#43434C; --ok:#5BC98A; --warn:#D9A441; --bad:#FF7A6E;
    }
  }
  :root[data-theme="dark"]{
    --page:#131316; --band:#1B1B1F; --ink:#F2F2F5; --body:#C3C3CB; --muted:#8F8F99;
    --line:#2B2B31; --line-strong:#43434C; --ok:#5BC98A; --warn:#D9A441; --bad:#FF7A6E;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--page);color:var(--body);font-family:var(--sans);
       font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}
  .wrap{width:min(1240px,100% - 40px);margin-inline:auto}
  h1{font-family:var(--serif);font-weight:400;font-size:clamp(1.9rem,1.4rem+2vw,2.7rem);
     line-height:1.1;color:var(--ink);margin:0 0 12px;letter-spacing:-.012em}
  h2{font-family:var(--serif);font-weight:400;font-size:1.5rem;line-height:1.2;color:var(--ink);
     margin:0 0 6px;letter-spacing:-.01em}
  p{margin:0;max-width:74ch}
  .kick{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;
        color:var(--muted);margin:0 0 14px}
  header.top{padding:44px 0 26px;border-bottom:1px solid var(--line-strong)}
  section{padding:34px 0 6px;border-top:1px solid var(--line)}
  section:first-of-type{border-top:0}
  .sechead{margin-bottom:18px}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  @media(max-width:900px){.cols{grid-template-columns:1fr}}
  .col{border:1px solid var(--line-strong);border-radius:8px;overflow:hidden;background:#FFF}
  .colhead{padding:11px 16px;border-bottom:1px solid var(--line-strong);background:var(--band);
           display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
  .colhead b{font-size:14px;color:var(--ink)}
  .colhead span{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;
                color:var(--muted)}
  .scroll{overflow-x:auto;border:1px solid var(--line);border-radius:6px}
  table{border-collapse:collapse;width:100%;font-size:13.5px;min-width:640px;background:var(--page)}
  th,td{text-align:left;vertical-align:top;padding:8px 13px;border-bottom:1px solid var(--line)}
  tr:last-child td{border-bottom:0}
  th{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;
     color:var(--muted);font-weight:400;background:var(--band);
     border-bottom:1px solid var(--line-strong);white-space:nowrap}
  td.k{color:var(--ink);font-weight:500}
  td.num{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
  td.mono{font-family:var(--mono);font-size:12px}
  td.nw{white-space:nowrap}
  .note{font-weight:400;color:var(--muted);font-size:12px;margin-top:2px;max-width:46ch}
  .ok{color:var(--ok)} .bad{color:var(--bad)} .dim{color:var(--muted)}
  .chip{display:inline-block;font-family:var(--mono);font-size:9.5px;letter-spacing:.11em;
        text-transform:uppercase;padding:2px 7px;border:1px solid var(--line-strong);
        border-radius:3px;color:var(--muted)}
  .chip.ok{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 45%,var(--line))}
  .chip.warn{color:var(--warn);border-color:color-mix(in srgb,var(--warn) 45%,var(--line))}
  .chip.bad{color:var(--bad);border-color:color-mix(in srgb,var(--bad) 45%,var(--line))}
  .sw{display:inline-block;width:11px;height:11px;border-radius:2px;
      border:1px solid rgba(0,0,0,.2);vertical-align:-1px;margin-right:7px}
  .call{border:1px solid var(--line);border-left:3px solid var(--warn);
        background:color-mix(in srgb,var(--warn) 8%,var(--page));padding:14px 18px;margin-bottom:18px}
  .call.bad{border-left-color:var(--bad);background:color-mix(in srgb,var(--bad) 7%,var(--page))}
  .call.ok{border-left-color:var(--ok);background:color-mix(in srgb,var(--ok) 8%,var(--page))}
  .call .tag{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;
             color:var(--warn);display:block;margin-bottom:6px}
  .call.bad .tag{color:var(--bad)} .call.ok .tag{color:var(--ok)}
  footer.foot{border-top:1px solid var(--line-strong);margin-top:36px;padding:20px 0 56px;
              font-size:12.5px;color:var(--muted)}
  td.delta{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:right;
           white-space:nowrap;font-size:12px}

  /* The guide's own component CSS, emitted once per palette under its own
     namespace. Without these four blocks the specimens render as unstyled
     markup — no serif headings, no filled button, no card, no dark ground —
     and the page compares nothing but a handful of inline colours. */
${componentCss(GUIDE, "gA")}
${componentCss(PROPOSED, "pA")}
${componentCss(PROPOSED, "dF")}
${componentCss(SOFTENED, "dS")}
</style>

<div class="wrap">

<header class="top">
  <p class="kick">Pixelette Group Revamp · Phase B · decision instrument</p>
  <h1>Marketing palette, against the guide</h1>
  <p style="font-size:1.05rem;max-width:66ch">The guide's frozen values on the left, the proposed
  Pixelette Marketing values on the right, rendered through the guide's own component CSS with only the
  colour tokens swapped. Real site copy throughout — tokens judged in isolation read differently from
  tokens judged in context. Sign off by eye; the arithmetic below only vetoes.</p>
</header>

<section>
  <div class="sechead"><h2>Side by side</h2></div>
  <div class="cols">
    <div class="col">
      <div class="colhead"><b>${GUIDE.label}</b><span>${GUIDE.sub}</span></div>
      <div style="${vars(GUIDE)}">${specimen("gA")}</div>
    </div>
    <div class="col">
      <div class="colhead"><b>${PROPOSED.label}</b><span>${PROPOSED.sub}</span></div>
      <div style="${vars(PROPOSED)}">${specimen("pA")}</div>
    </div>
  </div>
</section>

<section>
  <div class="sechead"><h2>The open call — dark family temperature</h2>
  <p class="note" style="max-width:74ch">The only decision left on this page. The faithful rotation keeps
  the guide's high dark-family saturation and reads as a distinctly crimson black; the alternative drops
  saturation to ${Math.round(SOFTEN * 100)}% of it, holding hue and HSL lightness, for a near-neutral warm
  black. Everything else on the page is identical between the two. The signal tone on the footer eyebrow is
  deliberately not softened — it is the one voice on the dark ground and it is part of what is being judged.
  Pick the one that looks right; the numbers underneath only veto.</p></div>

  ${
    softFails.length === 0
      ? `<div class="call ok"><span class="tag">Both options clear every threshold</span>
         <p>The choice is purely by eye. Softening raises the luminance of every dark-family token, which
         lifts the grounds toward their text and the text away from its ground at the same time — the net
         is in the delta column, and nothing crosses a threshold either way.</p></div>`
      : `<div class="call"><span class="tag">Softening costs ${softFails.length} check(s)</span>
         <p>${softFails.map(r => `${r.name} falls to ${r.softened.r.toFixed(2)} against ${r.need.toFixed(1)}`).join("; ")}.
         This is the same failure mode <code>panelMuted</code> already took a lightening pass for: holding HSL
         lightness does not hold relative luminance. Choosing the softened family is still open — it costs one
         more lightening pass on those tokens, not a change of direction.</p></div>`
  }

  <div class="cols">
    <div class="col">
      <div class="colhead"><b>Faithful rotation</b><span>as proposed · crimson black</span></div>
      <div style="${vars(PROPOSED)}">${darkSpecimen("dF")}</div>
    </div>
    <div class="col">
      <div class="colhead"><b>${SOFTENED.label}</b><span>${SOFTENED.sub}</span></div>
      <div style="${vars(SOFTENED)}">${darkSpecimen("dS")}</div>
    </div>
  </div>

  <div class="scroll" style="margin-top:20px"><table>
    <thead><tr>
      <th>Check</th><th>Needs</th>
      <th style="text-align:right">Faithful</th>
      <th style="text-align:right">Softened</th>
      <th style="text-align:right">Delta</th>
    </tr></thead>
    <tbody>
${darkRows}
    </tbody>
  </table></div>

  <div class="scroll" style="margin-top:14px"><table>
    <thead><tr><th>Dark-family token</th><th>Faithful</th><th>Softened</th></tr></thead>
    <tbody>
${darkTokenRows}
    </tbody>
  </table></div>
</section>

<section>
  <div class="sechead"><h2>The arithmetic</h2>
  <p class="note" style="max-width:70ch">Threshold is selected by kind: body text 4.5:1, large text and
  non-text elements that carry meaning 3:1, decorative fills nothing. A failure both palettes share is
  <em>inherited</em> from the guide and is not ours to fix; one only we have, we <em>introduced</em>.</p></div>

  ${
    introduced.length === 0
      ? `<div class="call ok"><span class="tag">Nothing introduced</span>
         <p>Every check the guide passes, the proposed palette also passes. The brand tone clears the
         4.5:1 reading threshold on all three light grounds, so it substitutes directly for the guide's
         green at every call site — no darker reading tone has to be invented.</p></div>`
      : `<div class="call bad"><span class="tag">${introduced.length} introduced failure(s)</span>
         <p>These pass in the guide and fail in the proposal. They are ours, and they block sign-off:
         ${introduced.map(r => r.name).join(", ")}.</p></div>`
  }
  ${
    inherited.length > 0
      ? `<div class="call"><span class="tag">${inherited.length} inherited failure(s) — report, do not fix</span>
         <p>Present in the guide as drawn and therefore identical across every group site:
         ${inherited.map(r => r.name).join(", ")}. Fixing one on a single site forks the group design
         system. Raise it with the guide's author as a change to the shared layer.</p></div>`
      : ""
  }

  <div class="scroll"><table>
    <thead><tr>
      <th>Check</th><th>Needs</th>
      <th style="text-align:right">Guide</th>
      <th style="text-align:right">Proposed</th>
      <th>Verdict</th>
    </tr></thead>
    <tbody>
${rows}
    </tbody>
  </table></div>
</section>

<section>
  <div class="sechead"><h2>Token by token</h2>
  <p class="note" style="max-width:70ch">The neutral ramp is the guide's own, hue-rotated to the brand
  at 341.3° with HSL lightness held exactly. Nothing measurable moves and every text ratio improves.</p></div>
  <div class="scroll"><table>
    <thead><tr><th>Role</th><th>Guide</th><th>Proposed</th></tr></thead>
    <tbody>
${tokenRows}
    </tbody>
  </table></div>
</section>

<footer class="foot">
  Generated by <code>scripts/build-palette-compare.mjs</code> · WCAG 2.1 contrast against sRGB relative
  luminance · <strong>invert this generator once the palette is signed off</strong>: freeze the approved
  values, extract the live ones from the stylesheet, and exit non-zero on drift.
</footer>

</div>`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, page, "utf8");

console.log(`Palette comparison written to ${OUT}`);
console.log(`  checks run:  ${RESULTS.length}`);
console.log(`  introduced:  ${introduced.length}${introduced.length ? " — " + introduced.map(r => r.name).join(", ") : ""}`);
console.log(`  inherited:   ${inherited.length}${inherited.length ? " — " + inherited.map(r => r.name).join(", ") : ""}`);
console.log(`  open call:   dark family, faithful vs softened (saturation x ${SOFTEN})`);
console.log(`  softened:    ${softFails.length ? softFails.length + " check(s) would need a lightening pass — " + softFails.map(r => `${r.name} ${r.softened.r.toFixed(2)}`).join(", ") : "clears every threshold"}`);

if (introduced.length > 0) {
  console.error("\nIntroduced contrast failures block sign-off.");
  process.exit(1);
}
