import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  SYNTHETIC_STAGING_MARKERS,
  authoriseSyntheticStagingTrigger,
  buildSyntheticStagingSubmission,
  executeSyntheticStagingFullJourney,
  executeSyntheticStagingJourney,
  readSyntheticStagingConfiguration,
  syntheticStagingEventId,
} from "../src/lib/syntheticStagingJourney.ts";
import { marketingBdEndpointSha256 } from "../src/lib/marketingBdTransport.ts";

const trigger = "synthetic-preview-trigger-secret-00001";
const transportSecret = "synthetic-marketing-transport-secret-0001";
const campaignId = "PMC-marketing-202609-01";
const eventId = "123e4567-e89b-42d3-a456-426614174000";
const nowMs = Date.parse("2026-09-01T12:00:00.000Z");

function environment(overrides: Record<string, string | undefined> = {}): Record<string, string | undefined> {
  const endpoint = "https://bd-stage.example.invalid/v1/source-submissions";
  return {
    VERCEL_ENV: "preview",
    MARKETING_SYNTHETIC_STAGE_ENABLED: "1",
    MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET: trigger,
    MARKETING_BD_STAGE_URL: endpoint,
    MARKETING_BD_STAGE_URL_SHA256: marketingBdEndpointSha256(endpoint),
    MARKETING_TRANSPORT_SECRET: transportSecret,
    MARKETING_DEFAULT_CAMPAIGN_ID: campaignId,
    MARKETING_RETENTION_REVIEW_DAYS: "365",
    MARKETING_SYNTHETIC_STAGE_DAILY_WRITE_LIMIT: "1",
    ...overrides,
  };
}

test("configuration exists only in explicitly enabled Vercel Preview", () => {
  assert.equal(readSyntheticStagingConfiguration(environment()).transport.defaultCampaignId, campaignId);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ VERCEL_ENV: "production" })), /STAGING_DISABLED/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ MARKETING_SYNTHETIC_STAGE_ENABLED: "0" })), /STAGING_DISABLED/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET: "short" })), /TRIGGER_SECRET_INVALID/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({ MARKETING_SYNTHETIC_STAGE_DAILY_WRITE_LIMIT: "2" })), /DAILY_WRITE_LIMIT_INVALID/);
  assert.throws(() => readSyntheticStagingConfiguration(environment({
    MARKETING_BD_STAGE_URL: "https://other-stage.example.invalid/v1/source-submissions",
  })), /ENDPOINT_BINDING_MISMATCH/);
});

test("one deterministic unique synthetic event is permitted per UTC day", () => {
  const first = syntheticStagingEventId(trigger, nowMs);
  const sameDay = syntheticStagingEventId(trigger, nowMs + 60_000);
  const nextDay = syntheticStagingEventId(trigger, nowMs + 86_400_000);
  assert.match(first, /^[0-9a-f-]{36}$/);
  assert.equal(sameDay, first);
  assert.notEqual(nextDay, first);
  assert.throws(() => syntheticStagingEventId(trigger, -1), /TIME_INVALID/);
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
  assert.match(source, /syntheticStagingEventId/);
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

test("full hosted journey returns a durable BD outcome and changes only the staged next action", async () => {
  const configuration = readSyntheticStagingConfiguration(environment());
  const calls: string[] = [];
  const response = (body: Record<string, unknown>) => new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
      "X-Marketing-Data-Classification": "synthetic-only",
    },
  });
  const result = await executeSyntheticStagingFullJourney({
    configuration,
    origin: "https://preview.example.invalid",
    eventId,
    nowMs,
    fetchImpl: async (input) => {
      const path = new URL(String(input)).pathname;
      calls.push(path);
      if (path.endsWith("/source-submissions")) {
        return response({ transport_status: "DELIVERED", receiver_receipt: { status: "STAGED FOR BD" } });
      }
      if (path.endsWith("/synthetic-learning/query") && calls.length === 2) {
        return response({
          learning_status: "AWAITING_OUTCOME",
          next_action: SYNTHETIC_STAGING_MARKERS.baselineNextAction,
          applies_live_change: false,
        });
      }
      if (path.endsWith("/synthetic-outcomes")) {
        return response({
          outcome_status: "RECORDED",
          learning_projection: {
            learning_status: "PROJECTED",
            learning: { previous_next_action: SYNTHETIC_STAGING_MARKERS.baselineNextAction },
          },
        });
      }
      if (path.endsWith("/synthetic-outcomes/query")) {
        return response({ outcome_status: "RETURNED" });
      }
      return response({
        learning_status: "LEARNING_PROJECTED",
        next_action: SYNTHETIC_STAGING_MARKERS.learnedNextAction,
        applies_live_change: false,
        learning: {
          previous_next_action: SYNTHETIC_STAGING_MARKERS.baselineNextAction,
          accepted_for_live_learning: false,
          learning_state: "INSUFFICIENT_EVIDENCE_FOR_PATTERN_PROPOSAL",
        },
      });
    },
  });
  assert.equal(result.accepted, true);
  assert.deepEqual(calls, [
    "/v1/source-submissions",
    "/v1/synthetic-learning/query",
    "/v1/synthetic-outcomes",
    "/v1/synthetic-outcomes/query",
    "/v1/synthetic-learning/query",
  ]);
  assert.equal(result.outcomeStatus, "RECORDED");
  assert.equal(result.outcomeReturnStatus, "RETURNED");
  assert.equal(result.nextActionChanged, true);
  assert.equal(result.appliesLiveChange, false);
  assert.equal(result.acceptedForLiveLearning, false);
});

test("full hosted journey fails closed when staged outcome evidence is incomplete", async () => {
  const configuration = readSyntheticStagingConfiguration(environment());
  let call = 0;
  const result = await executeSyntheticStagingFullJourney({
    configuration,
    origin: "https://preview.example.invalid",
    eventId,
    nowMs,
    fetchImpl: async () => {
      call += 1;
      const bodies = [
        { transport_status: "DELIVERED", receiver_receipt: { status: "STAGED FOR BD" } },
        { learning_status: "AWAITING_OUTCOME", next_action: SYNTHETIC_STAGING_MARKERS.baselineNextAction, applies_live_change: false },
        { outcome_status: "RECORDED", learning_projection: { learning_status: "PROJECTED" } },
        { outcome_status: "RETURNED" },
        { learning_status: "LEARNING_PROJECTED", next_action: SYNTHETIC_STAGING_MARKERS.learnedNextAction, applies_live_change: true },
      ];
      return new Response(JSON.stringify(bodies[call - 1]), {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
          "X-Marketing-Data-Classification": "synthetic-only",
        },
      });
    },
  });
  assert.equal(result.accepted, false);
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
