import assert from "node:assert/strict";
import test from "node:test";
import { validateContactPayload } from "../src/lib/contactContract.ts";

const now = Date.parse("2026-08-09T12:00:00Z");
const valid = () => ({
  eventId: "11111111-1111-4111-8111-111111111111",
  firstName: "Test",
  lastName: "Person",
  email: "test@example.invalid",
  description: "This is an authorised synthetic enquiry fixture.",
  consent: true,
  noticeVersion: "TEST-NOTICE-V1",
  formStartedAt: "2026-08-09T11:59:50Z",
  sourcePage: "/contactus",
  _website: "",
  attribution: {
    campaignId: "TEST-CAMPAIGN",
    utmSource: "synthetic",
    landingPage: "/contactus",
    referrer: "https://example.invalid/source"
  }
});

test("accepts a complete synthetic governed submission", () => {
  const result = validateContactPayload(valid(), "TEST-NOTICE-V1", now);
  assert.equal(result.ok, true);
});

for (const [name, mutate, code] of [
  ["unknown top-level field", (body: Record<string, unknown>) => { body.unknown = "x"; }, "UNSUPPORTED_FIELD"],
  ["attachment field", (body: Record<string, unknown>) => { body.attachment = "file"; }, "UNSUPPORTED_FIELD"],
  ["honeypot populated", (body: Record<string, unknown>) => { body._website = "bot"; }, "SPAM_REJECTED"],
  ["consent false", (body: Record<string, unknown>) => { body.consent = false; }, "CONSENT_OR_NOTICE_VERSION_INVALID"],
  ["notice version drift", (body: Record<string, unknown>) => { body.noticeVersion = "OLD"; }, "CONSENT_OR_NOTICE_VERSION_INVALID"],
  ["invalid email", (body: Record<string, unknown>) => { body.email = "not-an-email"; }, "INVALID_CONTACT_FIELDS"],
  ["invalid event ID", (body: Record<string, unknown>) => { body.eventId = "not-a-uuid"; }, "INVALID_CONTACT_FIELDS"],
  ["too-fast submission", (body: Record<string, unknown>) => { body.formStartedAt = "2026-08-09T11:59:59Z"; }, "FORM_TIMING_INVALID"],
  ["stale submission", (body: Record<string, unknown>) => { body.formStartedAt = "2026-08-08T11:59:00Z"; }, "FORM_TIMING_INVALID"],
  ["external source page", (body: Record<string, unknown>) => { body.sourcePage = "https://evil.invalid/"; }, "SOURCE_PAGE_INVALID"],
  ["unknown attribution field", (body: Record<string, unknown>) => { body.attribution = { unknown: "x" }; }, "ATTRIBUTION_INVALID"],
  ["overlong attribution", (body: Record<string, unknown>) => { body.attribution = { utmSource: "x".repeat(201) }; }, "ATTRIBUTION_INVALID"]
] as const) {
  test(`rejects ${name}`, () => {
    const body = valid() as unknown as Record<string, unknown>;
    mutate(body);
    const result = validateContactPayload(body, "TEST-NOTICE-V1", now);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.code, code);
  });
}

test("fails closed when the approved notice version is absent", () => {
  const result = validateContactPayload(valid(), "", now);
  assert.deepEqual(result, { ok: false, code: "FORM_GOVERNANCE_NOT_READY" });
});
