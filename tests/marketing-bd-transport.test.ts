import assert from "node:assert/strict";
import test from "node:test";
import type { GovernedContactSubmission } from "../src/lib/contactContract";
import {
  buildMarketingBdSourceEnvelope,
  marketingBdEndpointSha256,
  marketingBdSignature,
  sendMarketingBdSubmission,
  stableJson,
  validateMarketingBdTransportConfiguration,
} from "../src/lib/marketingBdTransport.ts";

const endpoint = "https://bd-stage.example.invalid/v1/source-submissions";
const configuration = {
  endpoint,
  endpointSha256: marketingBdEndpointSha256(endpoint),
  secret: "synthetic-marketing-transport-secret-0001",
  defaultCampaignId: "PMC-marketing-202608-30",
  retentionReviewDays: 365,
};

const submission: GovernedContactSubmission = {
  eventId: "123e4567-e89b-42d3-a456-426614174000",
  firstName: "Synthetic",
  lastName: "Lead",
  email: "synthetic@example.invalid",
  description: "Synthetic enquiry for local acceptance only.",
  consent: true,
  noticeVersion: "synthetic-v1",
  formStartedAt: "2026-08-30T11:59:00.000Z",
  sourcePage: "/contact",
  attribution: {
    campaignId: "external-campaign-name",
    utmSource: "synthetic",
    utmMedium: "test",
    utmCampaign: "local-acceptance",
  },
};

test("configuration fails closed for invalid endpoint, weak secret and noncanonical campaign", () => {
  const prefixedEndpoint = "https://bd-stage.example.invalid/marketnerve/v1/source-submissions";
  assert.equal(validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: prefixedEndpoint,
    endpointSha256: marketingBdEndpointSha256(prefixedEndpoint),
  }).endpoint, prefixedEndpoint);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: "http://example.invalid/v1/source-submissions",
  }), /ENDPOINT_INVALID/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: "https://example.invalid/v1/marketing-lead-events",
  }), /ENDPOINT_INVALID/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: "https://user:pass@example.invalid/marketnerve/v1/source-submissions",
  }), /ENDPOINT_INVALID/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: "https://example.invalid/market%2Fnerve/v1/source-submissions",
  }), /ENDPOINT_INVALID/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpoint: "https://other-stage.example.invalid/v1/source-submissions",
  }), /ENDPOINT_BINDING_MISMATCH/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    endpointSha256: "not-a-sha256",
  }), /ENDPOINT_BINDING_INVALID/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    secret: "short",
  }), /SECRET_TOO_SHORT/);
  assert.throws(() => validateMarketingBdTransportConfiguration({
    ...configuration,
    defaultCampaignId: "campaign",
  }), /CAMPAIGN_INVALID/);
});

test("source envelope maps the governed form to the accepted Marketing source contract", () => {
  const envelope = buildMarketingBdSourceEnvelope(
    submission,
    configuration,
    "https://www.pixelettemarketing.com",
    Date.parse("2026-08-30T12:00:00.000Z"),
  );
  assert.equal(envelope.entity, "marketing");
  assert.equal(envelope.eventId, "MLE-MARKETING-123E4567E89B42D3A456426614174000");
  assert.equal(envelope.correlationId, "MKT-CONTACT-123E4567E89B42D3A456426614174000");
  assert.equal(envelope.sourceRecordId, "FORM-MARKETING-123E4567E89B42D3A456426614174000");
  assert.equal(envelope.campaignId, configuration.defaultCampaignId);
  assert.equal(envelope.sourceUrl, "https://www.pixelettemarketing.com/contact");
  assert.equal(envelope.retentionReviewAt, "2027-08-30T12:00:00.000Z");
  assert.equal(
    (envelope.payload.attribution as Record<string, unknown>).campaignName,
    "external-campaign-name",
  );
  assert.doesNotMatch(stableJson(envelope), /formStartedAt/);
});

test("signature and request are deterministic and accept only governed no-store receipts", async () => {
  const now = Date.parse("2026-08-30T12:00:00.000Z");
  const envelope = buildMarketingBdSourceEnvelope(
    submission,
    configuration,
    "https://www.pixelettemarketing.com",
    now,
  );
  const timestamp = Math.floor(now / 1000);
  assert.equal(
    marketingBdSignature(configuration.secret, timestamp, envelope.eventId, envelope),
    marketingBdSignature(configuration.secret, timestamp, envelope.eventId, envelope),
  );
  let captured: RequestInit | undefined;
  const accepted = await sendMarketingBdSubmission(envelope, configuration, {
    now: () => now,
    fetchImpl: async (_input, init) => {
      captured = init;
      return new Response(JSON.stringify({
        transport_status: "DELIVERED",
        receiver_receipt: { status: "STAGED FOR BD" },
      }), {
        status: 200,
        headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
      });
    },
  });
  assert.equal(accepted.accepted, true);
  assert.equal(accepted.providerReceiptId, `bd_${envelope.eventId}`);
  assert.equal(captured?.method, "POST");
  assert.equal(captured?.body, stableJson(envelope));
  const headers = captured?.headers as Record<string, string>;
  assert.equal(headers["X-Marketing-Idempotency-Key"], envelope.eventId);
  assert.equal(
    headers["X-Marketing-Signature"],
    marketingBdSignature(configuration.secret, timestamp, envelope.eventId, envelope),
  );

  const refused = await sendMarketingBdSubmission(envelope, configuration, {
    now: () => now,
    fetchImpl: async () => new Response(JSON.stringify({
      transport_status: "DELIVERED",
      receiver_receipt: { status: "STAGED FOR BD" },
    }), { status: 200, headers: { "Content-Type": "application/json" } }),
  });
  assert.deepEqual(refused, { accepted: false });
});

test("duplicate is safe while retry, dead-letter and invalid receipts fail closed", async () => {
  const now = Date.parse("2026-08-30T12:00:00.000Z");
  const envelope = buildMarketingBdSourceEnvelope(
    submission,
    configuration,
    "https://www.pixelettemarketing.com",
    now,
  );
  const invoke = (body: unknown) => sendMarketingBdSubmission(envelope, configuration, {
    now: () => now,
    fetchImpl: async () => new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
    }),
  });
  assert.equal((await invoke({
    transport_status: "DUPLICATE",
    receiver_receipt: { status: "STAGED FOR BD" },
  })).accepted, true);
  assert.equal((await invoke({ transport_status: "RETRYABLE", receiver_receipt: {} })).accepted, false);
  assert.equal((await invoke({ transport_status: "DEAD_LETTER", receiver_receipt: {} })).accepted, false);
  assert.equal((await invoke({
    transport_status: "DELIVERED",
    receiver_receipt: { status: "REJECTED" },
  })).accepted, false);
});

test("receiver refusals expose only a bounded machine code", async () => {
  const now = Date.parse("2026-08-30T12:00:00.000Z");
  const envelope = buildMarketingBdSourceEnvelope(
    submission,
    configuration,
    "https://www.pixelettemarketing.com",
    now,
  );
  const refused = await sendMarketingBdSubmission(envelope, configuration, {
    now: () => now,
    fetchImpl: async () => new Response(JSON.stringify({ error: "ALLOWLISTED_STAGING_SOURCE_REQUIRED" }), {
      status: 401,
      headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
    }),
  });
  assert.deepEqual(refused, { accepted: false, refusalCode: "ALLOWLISTED_STAGING_SOURCE_REQUIRED" });

  const unbounded = await sendMarketingBdSubmission(envelope, configuration, {
    now: () => now,
    fetchImpl: async () => new Response(JSON.stringify({ error: "refused: source https://private.example" }), {
      status: 401,
      headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
    }),
  });
  assert.deepEqual(unbounded, { accepted: false, refusalCode: undefined });
});
