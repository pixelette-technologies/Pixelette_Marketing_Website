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

// --- The 8 Sep 2026 brief's three additional fields -------------------------
// All three are OPTIONAL, which is why the fixture above is untouched: making
// any of them required would have failed the acceptance test AND every one of
// the twelve rejection cases, since each asserts a specific code and would
// have got INVALID_CONTACT_FIELDS instead.

test("accepts the enquiry fields when supplied", () => {
  const body = valid() as unknown as Record<string, unknown>;
  body.company = "Example Ltd";
  body.companyWebsite = "example.invalid";
  body.improve = "Pipeline";
  const result = validateContactPayload(body, "TEST-NOTICE-V1", now);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.company, "Example Ltd");
    assert.equal(result.value.companyWebsite, "example.invalid");
    assert.equal(result.value.improve, "Pipeline");
  }
});

// The form posts every key it holds, so an untouched optional field arrives as
// "" rather than absent. If "" were treated as invalid, every enquiry that left
// Company blank would fail.
test("accepts the enquiry fields left empty", () => {
  const body = valid() as unknown as Record<string, unknown>;
  body.company = "";
  body.companyWebsite = "";
  body.improve = "";
  const result = validateContactPayload(body, "TEST-NOTICE-V1", now);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.company, undefined);
    assert.equal(result.value.improve, undefined);
  }
});

for (const [name, mutate] of [
  ["unlisted improve option", (body: Record<string, unknown>) => { body.improve = "Vibes"; }],
  ["overlong company", (body: Record<string, unknown>) => { body.company = "x".repeat(201); }],
  ["overlong company website", (body: Record<string, unknown>) => { body.companyWebsite = "x".repeat(201); }]
] as const) {
  test(`rejects ${name}`, () => {
    const body = valid() as unknown as Record<string, unknown>;
    mutate(body);
    const result = validateContactPayload(body, "TEST-NOTICE-V1", now);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.code, "INVALID_CONTACT_FIELDS");
  });
}

// The allowlist must still be closed after being widened by three.
test("still rejects a field outside the widened allowlist", () => {
  const body = valid() as unknown as Record<string, unknown>;
  body.budget = "50000";
  const result = validateContactPayload(body, "TEST-NOTICE-V1", now);
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.code, "UNSUPPORTED_FIELD");
});
