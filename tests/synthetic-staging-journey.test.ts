import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  SYNTHETIC_STAGING_MARKERS,
  authoriseSyntheticStagingTrigger,
  buildSyntheticStagingSubmission,
  executeSyntheticStagingJourney,
  readSyntheticStagingConfiguration,
} from "../src/lib/syntheticStagingJourney.ts";

const trigger = "synthetic-preview-trigger-secret-00001";
const transportSecret = "synthetic-marketing-transport-secret-0001";
const campaignId = "PMC-marketing-202609-01";
const eventId = "123e4567-e89b-42d3-a456-426614174000";
const nowMs = Date.parse("2026-09-01T12:00:00.000Z");

function environment(overrides: Record<string, string | undefined> = {}): Record<string, string | undefined> {
  return {
    VERCEL_ENV: "preview",
    MARKETING_SYNTHETIC_STAGE_ENABLED: "1",
    MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET: trigger,
    MARKETING_BD_STAGE_URL: "https://bd-stage.example.invalid/v1/source-submissions",
    MARKETING_TRANSPORT_SECRET: transportSecret,
    MARKETING_DEFAULT_CAMPAIGN_ID: campaignId,
    MARKETING_RETENTION_REVIEW_DAYS: "365",
    ...overrides,
  };
}

test("configuration exists only in explicitly enabled Vercel Preview", () => {
  assert.equal(readSyntheticStagingConfiguration(environment()).transport.defaultCampaignId, campaignId);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ VERCEL_ENV: "production" })), /STAGING_DISABLED/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ MARKETING_SYNTHETIC_STAGE_ENABLED: "0" })), /STAGING_DISABLED/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET: "short" })), /TRIGGER_SECRET_INVALID/);
});

test("trigger comparison fails closed", () => {
  assert.doesNotThrow(() => authoriseSyntheticStagingTrigger(trigger, trigger));
  assert.throws(() => authoriseSyntheticStagingTrigger("wrong", trigger), /TRIGGER_REFUSED/);
  assert.throws(() => authoriseSyntheticStagingTrigger(null, trigger), /TRIGGER_REFUSED/);
});

test("submission contains only the reserved synthetic journey", () => {
  const submission = buildSyntheticStagingSubmission(eventId, campaignId, nowMs);
  assert.equal(submission.firstName, "Synthetic");
  assert.equal(submission.lastName, "Journey");
  assert.equal(submission.email, SYNTHETIC_STAGING_MARKERS.email);
  assert.equal(submission.description, SYNTHETIC_STAGING_MARKERS.description);
  assert.equal(submission.noticeVersion, SYNTHETIC_STAGING_MARKERS.noticeVersion);
  assert.equal(submission.formStartedAt, "2026-09-01T11:59:57.000Z");
  assert.equal(submission.attribution.utmCampaign, campaignId);
  assert.throws(() => buildSyntheticStagingSubmission("not-a-uuid", campaignId, nowMs), /EVENT_ID_INVALID/);
  assert.throws(() => buildSyntheticStagingSubmission(eventId, campaignId, 0), /TIME_INVALID/);
});

test("route cannot dispatch email or apply live learning", () => {
  const source = readFileSync(
    new URL("../src/app/api/staging/synthetic-journey/route.ts", import.meta.url),
    "utf8",
  );
  const configurationSource = readFileSync(
    new URL("../src/lib/syntheticStagingJourney.ts", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /\bResend\b|sendContactEmail|emailDispatched:\s*true/);
  assert.doesNotMatch(source, /liveLearningApplied:\s*true|applyLiveLearning/);
  assert.match(source, /readSyntheticStagingConfiguration/);
  assert.match(configurationSource, /VERCEL_ENV\s*!==\s*"preview"/);
  assert.match(source, /x-marketing-staging-trigger/);
  assert.match(source, /emailDispatched:\s*false/);
  assert.match(source, /liveLearningApplied:\s*false/);
});

test("website staging journey reaches the governed receiver without email or live learning", async () => {
  const configuration = readSyntheticStagingConfiguration(environment());
  let captured: Record<string, unknown> | undefined;
  const result = await executeSyntheticStagingJourney({
    configuration,
    origin: "https://preview.example.invalid",
    eventId,
    nowMs,
    fetchImpl: async (_input, init) => {
      captured = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({
        transport_status: "DELIVERED",
        receiver_receipt: { status: "STAGED FOR BD" },
      }), { status: 200, headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } });
    },
  });
  assert.equal(result.accepted, true);
  assert.equal(result.submissionId, "MLE-MARKETING-123E4567E89B42D3A456426614174000");
  assert.equal((captured?.payload as Record<string, unknown>).email, "journey@example.invalid");
  assert.equal(captured?.sourceUrl, "https://preview.example.invalid/contact-us");
  assert.equal(captured?.campaignId, campaignId);
});

test("invalid origin and non-governed receiver response fail closed", async () => {
  const configuration = readSyntheticStagingConfiguration(environment());
  await assert.rejects(() => executeSyntheticStagingJourney({
    configuration,
    origin: "http://preview.example.invalid",
    eventId,
    nowMs,
  }), /ORIGIN_INVALID/);
  const result = await executeSyntheticStagingJourney({
    configuration,
    origin: "https://preview.example.invalid",
    eventId,
    nowMs,
    fetchImpl: async () => new Response(JSON.stringify({
      transport_status: "DELIVERED",
      receiver_receipt: { status: "REJECTED" },
    }), { status: 200, headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } }),
  });
  assert.equal(result.accepted, false);
});
