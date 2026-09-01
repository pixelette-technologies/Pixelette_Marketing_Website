/**
 * Palette comparison page — Phase B decision instrument.
 *
 * Renders the pattern guide's frozen values beside the live Pixelette
 * Marketing values, using the guide's own component CSS with only the colour
 * tokens swapped, so what you are judging is the actual system rather than
 * hand-written swatches. Every token-against-ground pairing carries its
 * measured WCAG 2.1 contrast ratio, and every failure is badged by provenance:
 * a fault inherited from the guide is amber, one we introduced is red.
 *
 * INVERTED on 1 September 2026, the moment the palette was signed off.
 * APPROVED is now frozen at the signed-off values and the live column is read
 * back out of src/scss/globels/_tokens.scss, so this exits non-zero both on an
 * introduced contrast failure and on any token drifting away from what was
 * approved. It is a regression gate now, not only a decision instrument.
 *
 *   node scripts/build-palette-compare.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

// On Windows import.meta.url yields /D:/... so strip the leading slash.
const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = join(ROOT, "vault", "palette-compare.html");

/* ------------------------------------------------------------------ *
 * The two frozen palettes.
 * GUIDE is read out of vault/Pixelette_Web_Patterns.html.
 * APPROVED is the Phase B derivation as signed off on 1 September 2026.
 * Neither is edited without a decision behind it.
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

const APPROVED = {
  label: "Pixelette Marketing",
  sub: "approved — two-tone",
  brand: "#B3063C",           // the wordmark, the favicon and $primary all agree
  brandHover: "#8C0430",
  signal: "#FF2F5B",          // already in the repo; solid marks only on light
  wash: "#EBC7D2",
  tint: "#F9EBF0",            // diagram and highlight fill
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
 * The live palette, read back out of the stylesheet.
 *
 * The generator is now inverted. APPROVED above is frozen at the values
 * signed off by eye on 1 September 2026; this reads what src/scss actually
 * emits, and any divergence is drift that exits non-zero. Before the
 * inversion both columns rendered from the same constants, which would have
 * meant the page silently stopped comparing anything the moment the tokens
 * landed — the failure this file exists to prevent.
 *
 * The dark family's temperature was the one open by-eye call. A softened,
 * near-neutral warm alternative was derived by holding hue and HSL lightness
 * and multiplying saturation by 0.35, rendered beside the faithful rotation
 * and measured: it cleared every threshold, so the call was purely by eye.
 * The faithful rotation was chosen. That work is written up in
 * vault/Brand layer.md; it is not re-derived here.
 * ------------------------------------------------------------------ */

const TOKENS = join(ROOT, "src", "scss", "globels", "_tokens.scss");

// Generator key -> the custom property that carries it. Anything absent from
// this map is not gated, so a token added to the brand layer must be added
// here too or it drifts unwatched.
const TOKEN_OF = {
  brand: "--color-brand",
  brandHover: "--color-brand-hover",
  signal: "--color-brand-signal",
  wash: "--color-brand-wash",
  tint: "--color-brand-tint",
  ink: "--color-ink",
  body: "--color-body",
  muted: "--color-muted",
  soft: "--color-soft",
  page: "--color-page",
  band: "--color-band",
  line: "--color-line",
  lineCard: "--color-line-card",
  linePill: "--color-line-pill",
  lineStrong: "--color-line-strong",
  footerBg: "--color-footer-bg",
  footerLine: "--color-footer-line",
  footerBody: "--color-footer-body",
  footerMuted: "--color-footer-muted",
  footerPill: "--color-footer-pill",
  footerEyebrow: "--color-footer-eyebrow",
  panelA: "--color-panel-a",
  panelB: "--color-panel-b",
  panelBorder: "--color-panel-border",
  panelText: "--color-panel-text",
  panelMuted: "--color-panel-muted",
  panelBtnText: "--color-panel-btn-text",
  panelBtnBorder: "--color-panel-btn-border",
  ok: "--color-ok",
  danger: "--color-danger"
};

function readLive() {
  const src = readFileSync(TOKENS, "utf8");
  const out = { label: "Pixelette Marketing", sub: "live, from _tokens.scss" };
  const missing = [];
  for (const [key, prop] of Object.entries(TOKEN_OF)) {
    // The trailing colon is what keeps --color-brand from matching
    // --color-brand-hover, and --color-panel-b from matching -border.
    const m = src.match(new RegExp(`${prop}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
    if (m) out[key] = m[1].toUpperCase();
    else missing.push(prop);
  }
  return { live: out, missing };
}

const { live: LIVE, missing: MISSING } = readLive();

const DRIFT = Object.keys(TOKEN_OF)
  .filter(k => APPROVED[k] && LIVE[k] && APPROVED[k].toUpperCase() !== LIVE[k])
  .map(k => ({ key: k, prop: TOKEN_OF[k], approved: APPROVED[k].toUpperCase(), live: LIVE[k] }));

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

  for (const [key, p] of [["guide", GUIDE], ["live", LIVE]]) {
    if (!p[fg] || !p[bg]) {
      row[key] = null;
      continue;
    }
    const r = ratio(p[fg], p[bg]);
    row[key] = { r, fg: p[fg], bg: p[bg], pass: need === 0 || r >= need };
  }

  // Provenance: a failure both palettes share came from the guide and is not
  // ours to fix. A failure only we have, we introduced.
  if (row.live && !row.live.pass) {
    row.verdict = row.guide && !row.guide.pass ? "inherited" : "introduced";
  } else {
    row.verdict = "pass";
  }
  return row;
}

const RESULTS = CHECKS.map(evaluate);
const introduced = RESULTS.filter(r => r.verdict === "introduced");
const inherited = RESULTS.filter(r => r.verdict === "inherited");

// Anything the checks cannot see. A token can drift without moving a single
// contrast ratio — a ground swapped for another of the same luminance, a
// hairline retuned — so drift is gated separately from the arithmetic.
const blocking = DRIFT.length > 0 || MISSING.length > 0;

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
    ${cell(r.live, r.need)}
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
      <td class="mono nw">${APPROVED[key] ? sw(APPROVED[key]) + APPROVED[key] : "—"}</td>
      <td class="mono nw">${LIVE[key] ? sw(LIVE[key]) + LIVE[key] : "—"}</td>
    </tr>`
  )
  .join("\n");

const driftRows = DRIFT.map(d => `<tr>
    <td class="k">${d.key}<div class="note">${d.prop}</div></td>
    <td class="mono nw">${sw(d.approved)}${d.approved}</td>
    <td class="mono nw">${sw(d.live)}${d.live}</td>
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

  /* The guide's own component CSS, emitted once per palette under its own
     namespace. Without these four blocks the specimens render as unstyled
     markup — no serif headings, no filled button, no card, no dark ground —
     and the page compares nothing but a handful of inline colours. */
${componentCss(GUIDE, "gA")}
${componentCss(LIVE, "pA")}
</style>

<div class="wrap">

<header class="top">
  <p class="kick">Pixelette Group Revamp · Phase B · decision instrument</p>
  <h1>Marketing palette, against the guide</h1>
  <p style="font-size:1.05rem;max-width:66ch">The guide's frozen values on the left, the live
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
      <div class="colhead"><b>${APPROVED.label}</b><span>${APPROVED.sub}</span></div>
      <div style="${vars(APPROVED)}">${specimen("pA")}</div>
    </div>
  </div>
</section>

<section>
  <div class="sechead"><h2>Drift</h2>
  <p class="note" style="max-width:74ch">The approved values are frozen in this script; the live column is
  read back out of <code>src/scss/globels/_tokens.scss</code> on every run. A token can drift without moving
  a single contrast ratio — one ground swapped for another of the same luminance, a hairline retuned — so
  this is gated separately from the arithmetic and fails the build on its own.</p></div>

  ${
    MISSING.length > 0
      ? `<div class="call bad"><span class="tag">${MISSING.length} token(s) not found in the stylesheet</span>
         <p>${MISSING.join(", ")}. Either the token was renamed without updating TOKEN_OF in this script, or
         it was dropped from the brand layer. Until it resolves, that token is ungated.</p></div>`
      : ""
  }
  ${
    DRIFT.length === 0
      ? `<div class="call ok"><span class="tag">No drift</span>
         <p>Every gated token in <code>_tokens.scss</code> matches the value signed off on 1 September 2026.</p></div>`
      : `<div class="call bad"><span class="tag">${DRIFT.length} token(s) drifted</span>
         <p>These no longer match what was approved: ${DRIFT.map(d => d.prop).join(", ")}. Either revert the
         stylesheet or, if the change is deliberate, get it signed off and re-freeze APPROVED in this script.
         Do not do the second quietly.</p></div>`
  }

  ${
    DRIFT.length === 0
      ? ""
      : `<div class="scroll"><table>
    <thead><tr><th>Token</th><th>Approved</th><th>Live</th></tr></thead>
    <tbody>
${driftRows}
    </tbody>
  </table></div>`
  }
</section>

<section>
  <div class="sechead"><h2>The arithmetic</h2>
  <p class="note" style="max-width:70ch">Threshold is selected by kind: body text 4.5:1, large text and
  non-text elements that carry meaning 3:1, decorative fills nothing. A failure both palettes share is
  <em>inherited</em> from the guide and is not ours to fix; one only we have, we <em>introduced</em>.</p></div>

  ${
    introduced.length === 0
      ? `<div class="call ok"><span class="tag">Nothing introduced</span>
         <p>Every check the guide passes, the live palette also passes. The brand tone clears the
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
      <th style="text-align:right">Live</th>
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
    <thead><tr><th>Role</th><th>Guide</th><th>Approved</th><th>Live</th></tr></thead>
    <tbody>
${tokenRows}
    </tbody>
  </table></div>
</section>

<footer class="foot">
  Generated by <code>scripts/build-palette-compare.mjs</code> · WCAG 2.1 contrast against sRGB relative
  luminance · approved values frozen 1 September 2026, live values read from
  <code>src/scss/globels/_tokens.scss</code> on every run.
</footer>

</div>`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, page, "utf8");

console.log(`Palette comparison written to ${OUT}`);
console.log(`  checks run:  ${RESULTS.length}`);
console.log(`  introduced:  ${introduced.length}${introduced.length ? " — " + introduced.map(r => r.name).join(", ") : ""}`);
console.log(`  inherited:   ${inherited.length}${inherited.length ? " — " + inherited.map(r => r.name).join(", ") : ""}`);
console.log(`  drift:       ${DRIFT.length ? DRIFT.map(d => d.prop).join(", ") : "none"}`);
console.log(`  ungated:     ${MISSING.length ? MISSING.join(", ") : "none"}`);

if (introduced.length > 0) {
  console.error("\nIntroduced contrast failures block the build.");
}
if (DRIFT.length > 0) {
  console.error(
    "\nThe live tokens no longer match what was signed off. Revert the stylesheet, or get" +
      "\nthe change approved and re-freeze APPROVED in this script. Do not do the second quietly."
  );
}
if (MISSING.length > 0) {
  console.error(
    "\nTokens named in TOKEN_OF are absent from _tokens.scss, so they are ungated:" +
      `\n  ${MISSING.join(", ")}`
  );
}
if (introduced.length > 0 || blocking) process.exit(1);
