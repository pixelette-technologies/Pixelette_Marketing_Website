/**
 * The route walk.
 *
 * Replaces the page-count check, which proves nothing here: no route uses
 * generateStaticParams, so a production build does not pre-render the 50
 * dynamic pages and there is no route table to count against.
 *
 * Requests every route from a running server and asserts each one returns 200
 * and renders an <h1>. A conversion that has broken a template usually breaks
 * it into a 500 or an empty shell, and both show up here.
 *
 * It also asserts the two design-system caps that exist only in rendered
 * markup and that no compiler can see: at most three .band-dark grounds and
 * at most one .rule-cap mark per route. Both are stated in _surfaces.scss.
 *
 * The route list is DISCOVERED rather than hard-coded, so it cannot drift:
 * /sitemap.xml is the canonical list of public routes.
 *
 * /success_stories and /story/[id] were DELETED on 25 Sep 2026 — placeholder
 * legacy content. They used to be walked from here; now the walk asserts they
 * are gone, so a revert or a stray restore fails loudly instead of quietly
 * putting the placeholder pages back.
 *
 *   node scripts/route-walk.mjs [baseUrl]
 *
 * Defaults to http://localhost:3001. Point it at a production server before
 * shipping; against the dev server it still catches template breakage, which
 * is what it is for during the conversion.
 */

const BASE = (process.argv[2] || "http://localhost:3001").replace(/\/$/, "");

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.ok ? await res.text() : "";
  return { status: res.status, body };
}

function fail(msg) {
  console.error(`\n${msg}`);
  process.exit(1);
}

console.log(`Route walk against ${BASE}\n`);

// --- discover -------------------------------------------------------------
let sitemap;
try {
  sitemap = await get("/sitemap.xml");
} catch {
  fail(`Could not reach ${BASE}. Start the server first.`);
}
if (sitemap.status !== 200) fail(`/sitemap.xml returned ${sitemap.status}`);

const fromSitemap = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1].replace(/^https?:\/\/[^/]+/, ""))
  .map(p => (p === "" ? "/" : p));

for (const gone of ["/success_stories", "/story/1"]) {
  const r = await get(gone);
  if (r.status !== 404) fail(`${gone} returned ${r.status}; it was deleted and must 404`);
}

const routes = [...new Set(fromSitemap)].sort();

const groups = {
  static: routes.filter(r => !/^\/(services|industries|blog)\//.test(r)),
  services: routes.filter(r => r.startsWith("/services/")),
  industries: routes.filter(r => r.startsWith("/industries/")),
  blog: routes.filter(r => r.startsWith("/blog/"))
};

for (const [name, list] of Object.entries(groups)) {
  console.log(`  ${name.padEnd(12)} ${list.length}`);
}
console.log(`  ${"TOTAL".padEnd(12)} ${routes.length}\n`);

// --- walk -----------------------------------------------------------------
const failures = [];
let ok = 0;

for (const route of routes) {
  let r;
  try {
    r = await get(route);
  } catch (e) {
    failures.push({ route, why: `request failed: ${e.message}` });
    continue;
  }

  if (r.status !== 200) {
    failures.push({ route, why: `status ${r.status}` });
    continue;
  }
  if (!/<h1[\s>]/.test(r.body)) {
    failures.push({ route, why: "no <h1> rendered" });
    continue;
  }

  // The two design-system caps that a section rewrite is most likely to break,
  // and that neither the compiler nor the token gate can see. Both are stated
  // in _surfaces.scss: three .band-dark per page, and exactly one .rule-cap
  // mannerism. Counted from CLASS ATTRIBUTES rather than the raw body so the
  // stylesheet's own rule text can never be mistaken for a call site.
  const dark = (r.body.match(/class="[^"]*\bband-dark\b[^"]*"/g) || []).length;
  if (dark > 3) {
    failures.push({ route, why: `${dark} dark bands (max 3)` });
    continue;
  }
  const caps = (r.body.match(/class="[^"]*\brule-cap\b[^"]*"/g) || []).length;
  if (caps > 1) {
    failures.push({ route, why: `${caps} rule-cap marks (max 1)` });
    continue;
  }
  ok++;
}

console.log(`passed  ${ok}/${routes.length}`);

if (failures.length) {
  console.error(`\n${failures.length} route(s) failed:`);
  for (const f of failures) console.error(`  ${f.route}  —  ${f.why}`);
  process.exit(1);
}

console.log("\nEvery route returned 200, rendered an h1 and held the ground caps.");
