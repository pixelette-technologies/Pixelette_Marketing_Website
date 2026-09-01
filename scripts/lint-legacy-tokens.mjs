/**
 * The token gate.
 *
 * Fails the build on any hard-coded colour in src/, so the palette owns the
 * site and a future brand change is one edit to _tokens.scss rather than a
 * hunt through 79 partials and 47 inline styles.
 *
 * KEEP THE MATCHER DUMB. It does not parse comments, so a provenance note that
 * writes a retired value with a hash would trip the gate on its own
 * documentation. The convention throughout this codebase is to write such notes
 * BARE — `was B3063C`, no hash — and every note already follows it.
 *
 *   node scripts/lint-legacy-tokens.mjs
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");

/**
 * Every exemption carries its reason. An exemption without one is a bug
 * waiting to be copied.
 */
const EXEMPT = [
  ["src/scss/globels/_tokens.scss", "defines the tokens in the first place"],
  ["src/assets/common/Logo.tsx", "the wordmark is the colour authority"],
  ["src/assets/common/LogoBlack.tsx", "the wordmark is the colour authority"],
  ["src/lib/emailPalette.ts", "HTML email cannot resolve var(); see the file's own note"],
  ["src/data/aboutus/ourTeamData.ts", "per-person card tints — content data, not design tokens"]
];

/**
 * Third-party logos. Another company's brand colours are theirs, not ours to
 * tokenise, and recolouring them would misrepresent the mark.
 */
const THIRD_PARTY_LOGOS = new Set([
  "Canva.tsx", "Sprout.tsx", "Ahrefs.tsx", "Apollo.tsx", "Calendly.tsx",
  "CoSchedule.tsx", "Grammerly.tsx", "HotJar.tsx", "Jira.tsx", "LinkedIn.tsx",
  "Loom.tsx", "PyTorch.tsx", "Semrush.tsx", "Buffer.tsx", "MailChimp.tsx",
  "Insta.tsx", "Github.tsx"
]);

// Hex colours, rgb()/rgba() with numeric channels, and the two named colours
// that actually appear in this codebase — in VALUE position only, so class
// names like .hover_white_arrowCard and .bg_white are not matches.
const PATTERNS = [
  [/#[0-9a-fA-F]{3,8}\b/g, "hex colour"],
  [/\brgba?\(\s*\d/g, "rgb()/rgba() literal"],
  [/:\s*(white|black)\b/g, "named colour"],
  [/\bsolid\s+(white|black)\b/g, "named colour"]
];

const EXTS = new Set([".scss", ".ts", ".tsx", ".css"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

const exemptPaths = new Set(EXEMPT.map(([p]) => p.replace(/\//g, "\\")));
const exemptPathsFwd = new Set(EXEMPT.map(([p]) => p));

const findings = [];

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  const relFwd = rel.replace(/\\/g, "/");
  if (exemptPaths.has(rel) || exemptPathsFwd.has(relFwd)) continue;
  if (THIRD_PARTY_LOGOS.has(relFwd.split("/").pop())) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const [re, kind] of PATTERNS) {
      re.lastIndex = 0;
      const m = line.match(re);
      if (m) findings.push({ file: relFwd, line: i + 1, kind, text: m[0], src: line.trim() });
    }
  });
}

console.log("Token gate");
console.log(`  files scanned   ${walk(SRC).length}`);
console.log(`  exemptions      ${EXEMPT.length} explicit + ${THIRD_PARTY_LOGOS.size} third-party logos`);
console.log(`  findings        ${findings.length}`);

if (findings.length) {
  console.error("\nHard-coded colours found. Use a token from src/scss/globels/_tokens.scss.\n");
  for (const f of findings.slice(0, 60)) {
    console.error(`  ${f.file}:${f.line}  ${f.kind} ${f.text}`);
    console.error(`      ${f.src.slice(0, 110)}`);
  }
  if (findings.length > 60) console.error(`  … and ${findings.length - 60} more`);
  process.exit(1);
}

console.log("\nNo hard-coded colours outside the stated exemptions.");
