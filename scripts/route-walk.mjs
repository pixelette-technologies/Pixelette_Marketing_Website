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
 * The route list is DISCOVERED rather than hard-coded, so it cannot drift:
 *   - /sitemap.xml is the canonical list of public routes
 *   - /success_stories and /story/[id] are deliberately absent from it (they
 *     are noindex legacy content), so they are added and their ids scraped
 *     from the index page
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

const stories = await get("/success_stories");
if (stories.status !== 200) fail(`/success_stories returned ${stories.status}`);
const storyPaths = [...new Set([...stories.body.matchAll(/href="(\/story\/[^"]+)"/g)].map(m => m[1]))];

const routes = [...new Set([...fromSitemap, "/success_stories", ...storyPaths])].sort();

const groups = {
  static: routes.filter(r => !/^\/(services|industries|blog|story)\//.test(r)),
  services: routes.filter(r => r.startsWith("/services/")),
  industries: routes.filter(r => r.startsWith("/industries/")),
  blog: routes.filter(r => r.startsWith("/blog/")),
  story: routes.filter(r => r.startsWith("/story/"))
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
  ok++;
}

console.log(`passed  ${ok}/${routes.length}`);

if (failures.length) {
  console.error(`\n${failures.length} route(s) failed:`);
  for (const f of failures) console.error(`  ${f.route}  —  ${f.why}`);
  process.exit(1);
}

console.log("\nEvery route returned 200 and rendered an h1.");
