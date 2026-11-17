/**
 * Local mock-up screenshot pack for the 12 Nov 2026 developer brief.
 * Full-page desktop ~1440px and phone ~390px. One maintained capture script.
 *
 * Usage (dev server on MOCKUP_BASE, default http://localhost:3000):
 *   npx --yes playwright@1.49.1 install chromium
 *   node scripts/capture-mockup-screenshots.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.MOCKUP_BASE || "http://localhost:3000";
const OUT = path.resolve("mockup-screenshots");

const ROUTES = [
  "/",
  "/services",
  "/contactus",
  "/industries",
  "/aboutus",
  "/results",
  "/strategy-positioning",
  "/services/influencer-marketing",
  "/services/social-media-marketing",
  "/services/pr",
  "/services/email-marketing",
  "/services/seo-and-content-marketing",
  "/services/ads-ppc",
  "/services/lead-generation",
  "/services/marketing-analytics",
  "/public-sector",
  "/public-sector/campaign-evaluation",
  "/public-sector/campaigns-and-public-awareness",
  "/public-sector/digital-communications",
  "/public-sector/community-engagement",
  "/public-sector/internal-and-change-communications",
  "/public-sector/education-marketing",
  "/public-sector/how-to-buy",
  "/public-sector/demonstrations",
  "/about/people",
  "/accessibility",
  "/social-value",
  "/policies",
  "/industries/public-sector-and-local-government",
  "/industries/charities-and-non-profit",
  "/industries/education-and-learning",
  "/specialisms/web3-marketing"
];

function folderFor(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "__");
}

async function dismissCookie(page) {
  const accept = page.getByRole("button", { name: /^Accept$/i });
  try {
    await accept.click({ timeout: 2500 });
    await page.waitForTimeout(200);
  } catch {
    // Already dismissed or banner absent.
  }
}

async function shot(page, route, width, label) {
  const dir = path.join(OUT, folderFor(route));
  fs.mkdirSync(dir, { recursive: true });
  await page.setViewportSize({ width, height: 900 });
  const res = await page.goto(`${BASE}${route}`, {
    waitUntil: "networkidle",
    timeout: 60000
  });
  const status = res?.status() ?? 0;
  await page.waitForTimeout(500);
  await dismissCookie(page);
  // Hide Next.js dev overlays so the pack is reviewable, not tooling chrome.
  await page.addStyleTag({
    content:
      "nextjs-portal,[data-next-badge-root],[data-nextjs-toast]{display:none!important}"
  });
  // Wait for styles to settle after banner dismiss / hydration.
  await page.waitForTimeout(300);
  const scroll = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  const file = path.join(dir, `${label}-${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  const overflow = scroll.scrollWidth > scroll.clientWidth + 1;
  return { route, label, width, status, overflow, file };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const report = [];
  for (const route of ROUTES) {
    report.push(await shot(page, route, 1440, "desktop"));
    report.push(await shot(page, route, 390, "phone"));
    console.log("ok", route);
  }
  await browser.close();
  const overflows = report.filter(r => r.overflow);
  const bad = report.filter(r => r.status >= 400);
  fs.writeFileSync(
    path.join(OUT, "capture-report.json"),
    JSON.stringify({ report, overflows, bad }, null, 2)
  );
  console.log(
    JSON.stringify(
      {
        total: report.length,
        overflows: overflows.length,
        badStatuses: bad.length
      },
      null,
      2
    )
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
