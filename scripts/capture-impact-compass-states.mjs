/**
 * Capture Impact Compass intro / questionnaire / results — desktop + mobile.
 * Usage: MOCKUP_BASE=http://localhost:3460 node scripts/capture-impact-compass-states.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.MOCKUP_BASE || "http://localhost:3460";
const OUT = path.resolve(
  "mockup-screenshots",
  "diagnostic-impact-compass-correction-2026-11-20"
);

const STORAGE_KEY = "pmw-strategy-diagnostic";
// Completed sample answers (0–4) — mid-range scores for a filled results view.
const COMPLETED = {
  v: 1,
  answers: [3, 2, 1, 3, 2, 2, 3, 1, 3, 2, 1, 3],
  completed: true
};
const PARTIAL = {
  v: 1,
  answers: [2, 3, 2, 2, null, null, null, null, null, null, null, null],
  completed: false
};

async function dismissCookie(page) {
  const accept = page.getByRole("button", { name: /^Accept$/i });
  try {
    await accept.click({ timeout: 2500 });
  } catch {
    // absent
  }
}

async function hideDevChrome(page) {
  await page.addStyleTag({
    content:
      "nextjs-portal,[data-next-badge-root],[data-nextjs-toast]{display:none!important}"
  });
}

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.waitForTimeout(400);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", file);
}

async function gotoFresh(page, width, height, storage) {
  await page.setViewportSize({ width, height });
  await page.goto(`${BASE}/strategy-positioning`, {
    waitUntil: "networkidle",
    timeout: 60000
  });
  await dismissCookie(page);
  await hideDevChrome(page);
  if (storage) {
    await page.evaluate(
      ({ key, value }) => {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event("pmw-strategy-diagnostic-change"));
      },
      { key: STORAGE_KEY, value: storage }
    );
    await page.reload({ waitUntil: "networkidle" });
    await dismissCookie(page);
    await hideDevChrome(page);
  } else {
    await page.evaluate(key => {
      localStorage.removeItem(key);
      window.dispatchEvent(new Event("pmw-strategy-diagnostic-change"));
    }, STORAGE_KEY);
    await page.reload({ waitUntil: "networkidle" });
    await dismissCookie(page);
    await hideDevChrome(page);
  }
}

async function captureViewport(browser, label, width, height) {
  const page = await browser.newPage();

  // Intro
  await gotoFresh(page, width, height, null);
  await shot(page, `${label}-01-intro`);

  // Questionnaire (mid progress)
  await gotoFresh(page, width, height, PARTIAL);
  await page.getByRole("button", { name: /continue|resume|start/i }).first().click();
  await page.waitForTimeout(500);
  // If still on intro resume UI, click continue/resume
  const continueBtn = page.getByRole("button", { name: /continue|resume/i });
  if (await continueBtn.count()) {
    try {
      await continueBtn.first().click({ timeout: 2000 });
    } catch {
      // already in questionnaire
    }
  }
  // Ensure we are on a question — click Start if needed
  const start = page.getByRole("link", { name: /start diagnostic/i });
  if (await start.count()) {
    await start.click();
  }
  const resume = page.getByRole("button", { name: /continue where|resume/i });
  if (await resume.count()) {
    await resume.first().click();
  }
  await page.waitForSelector(".dxQuestion, .dxTiles", { timeout: 10000 });
  await shot(page, `${label}-02-questionnaire`);

  // Results
  await gotoFresh(page, width, height, COMPLETED);
  await page.waitForSelector(".dxResults", { timeout: 10000 });
  await shot(page, `${label}-03-results`);

  await page.close();
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  await captureViewport(browser, "desktop-1440", 1440, 900);
  await captureViewport(browser, "phone-390", 390, 844);
} finally {
  await browser.close();
}
console.log("done");
