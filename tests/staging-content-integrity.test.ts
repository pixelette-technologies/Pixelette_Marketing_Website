import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import dynamicMarketData from "../src/data/dynamicMarketData.ts";

const supportedIndustryRoutes = new Set(["web_3", "fintech", "tech", "saas", "ai"]);

test("every home-page industry card resolves to a supported industry route", () => {
  for (const industry of dynamicMarketData) {
    assert.equal(typeof industry.route, "string");
    assert.equal(supportedIndustryRoutes.has(industry.route), true, industry.mainHeading);
  }
});

test("the contact page does not expose internal drafting instructions", async () => {
  const sourcePath = fileURLToPath(
    new URL("../src/components/ui/contactUs/Located.tsx", import.meta.url)
  );
  const source = await readFile(sourcePath, "utf8");

  assert.equal(source.includes("not really happy with how it’s currently done here"), false);
  assert.equal(source.includes("Show locations in a different way"), false);
});
