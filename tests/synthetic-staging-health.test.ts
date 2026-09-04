import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  checkSyntheticStagingHealth,
  syntheticStagingHealthEndpoint,
} from "../src/lib/syntheticStagingHealth.ts";
import { readSyntheticStagingConfiguration } from "../src/lib/syntheticStagingJourney.ts";
import { marketingBdEndpointSha256 } from "../src/lib/marketingBdTransport.ts";

const endpoint = "https://bd-stage.example.invalid/marketnerve/v1/source-submissions";

function configuration() {
  return readSyntheticStagingConfiguration({
    VERCEL_ENV: "preview",
    MARKETING_SYNTHETIC_STAGE_ENABLED: "1",
    MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET: "synthetic-preview-trigger-value-00001",
    MARKETING_BD_STAGE_URL: endpoint,
    MARKETING_BD_STAGE_URL_SHA256: marketingBdEndpointSha256(endpoint),
    MARKETING_TRANSPORT_SECRET: "synthetic-transport-value-0000000001",
    MARKETING_DEFAULT_CAMPAIGN_ID: "PMC-marketing-202609-01",
    MARKETING_RETENTION_REVIEW_DAYS: "365",
    MARKETING_SYNTHETIC_STAGE_DAILY_WRITE_LIMIT: "1",
  });
}

function healthResponse(overrides: Record<string, unknown> = {}, options: {
  status?: number;
  headers?: Record<string, string>;
} = {}) {
  return new Response(JSON.stringify({
    status: "ready",
    schema_version: "MKT_BD_SYNTHETIC_STAGING_V1",
    data_classification: "synthetic-only",
    package_manifest_attested: true,
    package_manifest_sha256: "a".repeat(64),
    ...overrides,
  }), {
    status: options.status ?? 200,
    headers: options.headers ?? {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
      "X-Marketing-Data-Classification": "synthetic-only",
    },
  });
}

test("health endpoint is derived only from the validated receiver source endpoint", () => {
  assert.equal(
    syntheticStagingHealthEndpoint(endpoint),
    "https://bd-stage.example.invalid/marketnerve/healthz",
  );
  assert.throws(
    () => syntheticStagingHealthEndpoint("http://bd-stage.example.invalid/v1/source-submissions"),
    /HEALTH_ENDPOINT_INVALID/,
  );
  assert.throws(
    () => syntheticStagingHealthEndpoint("https://bd-stage.example.invalid/v1/other"),
    /HEALTH_ENDPOINT_INVALID/,
  );
});

test("read-only health check accepts exact synthetic and manifest attestation", async () => {
  let requestMethod = "";
  const result = await checkSyntheticStagingHealth({
    configuration: configuration(),
    fetchImpl: async (_input, init) => {
      requestMethod = String(init?.method);
      return healthResponse();
    },
  });
  assert.equal(requestMethod, "GET");
  assert.equal(result.ready, true);
  assert.equal(result.schemaVersion, "MKT_BD_SYNTHETIC_STAGING_V1");
  assert.equal(result.packageManifestSha256, "A".repeat(64));
});

test("health check refuses anti-bot, caching and incomplete attestation responses", async () => {
  await assert.rejects(
    () => checkSyntheticStagingHealth({
      configuration: configuration(),
      fetchImpl: async () => healthResponse({}, { status: 202 }),
    }),
    /HEALTH_RESPONSE_REFUSED/,
  );
  await assert.rejects(
    () => checkSyntheticStagingHealth({
      configuration: configuration(),
      fetchImpl: async () => healthResponse({}, {
        headers: {
          "Cache-Control": "public",
          "Content-Type": "application/json",
          "X-Marketing-Data-Classification": "synthetic-only",
        },
      }),
    }),
    /HEALTH_RESPONSE_REFUSED/,
  );
  await assert.rejects(
    () => checkSyntheticStagingHealth({
      configuration: configuration(),
      fetchImpl: async () => healthResponse({ package_manifest_attested: false }),
    }),
    /HEALTH_ATTESTATION_INVALID/,
  );
});

test("health route is read-only and cannot send, spend or apply learning", () => {
  const source = readFileSync(
    new URL("../src/app/api/staging/health/route.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /export async function GET/);
  assert.doesNotMatch(source, /export async function POST|sendMarketingBdSubmission|Resend|applyLiveLearning/);
  assert.match(source, /emailDispatched:\s*false/);
  assert.match(source, /realDataProcessed:\s*false/);
  assert.match(source, /publicAction:\s*false/);
  assert.match(source, /spend:\s*false/);
  assert.match(source, /liveLearningApplied:\s*false/);
});
