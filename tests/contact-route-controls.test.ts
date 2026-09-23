import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const route = readFileSync("src/app/api/contact/route.ts", "utf8");
const form = readFileSync("src/components/common/ContactUsForm.tsx", "utf8");
const nextConfig = readFileSync("next.config.ts", "utf8");

test("contact route has no recipient or sender fallback", () => {
  assert.match(route, /CONTACT_TO_EMAIL/);
  assert.match(route, /CONTACT_FROM_EMAIL/);
  assert.doesNotMatch(route, /sales@pixelettemarketing\.com/i);
  assert.doesNotMatch(route, /noreply@pixelettemarketing\.com/i);
});

test("contact route fails closed on content type, origin and actual body bytes", () => {
  assert.match(route, /Unsupported content type/);
  assert.match(route, /mediaType !== "application\/json"/);
  assert.match(route, /allowedOrigins\.includes\(origin\)/);
  assert.match(route, /TextEncoder\(\)\.encode\(rawBody\)\.byteLength > 16_384/);
});

test("payload validation runs before provider construction", () => {
  const validation = route.indexOf("validateContactPayload(body");
  const provider = route.indexOf("new Resend(configuration.apiKey)");
  assert.ok(validation >= 0 && provider > validation);
  assert.doesNotMatch(route, /console\.(log|info|warn|error)/);
});

test("route binds durable idempotency, receipt storage, rate limiting and bounded provider retry", () => {
  assert.match(route, /MARKETING_CONTACT_STORE_DIR/);
  assert.match(route, /MARKETING_CONTACT_RATE_LIMIT_SECRET/);
  assert.match(route, /new DurableContactDeliveryControl/);
  assert.match(route, /control\.begin\(submission\.eventId/);
  assert.match(route, /idempotencyKey: decision\.idempotencyKey/);
  assert.match(route, /sendWithBoundedRetry/);
  assert.match(route, /control\.complete\(decision\.lease/);
  assert.match(route, /control\.fail\(decision\.lease/);
  assert.match(form, /eventId \?\? crypto\.randomUUID\(\)/);
});

test("form remains unavailable until privacy and consent configuration is complete", () => {
  assert.match(form, /const governanceReady = Boolean\(privacyNoticeUrl && noticeVersion && consentText\)/);
  // The notice is a route on this site, not a deploy-time URL that can ship as
  // a placeholder and still pass the gate.
  assert.match(form, /const privacyNoticeUrl = PRIVACY_HREF;/);
  assert.match(form, /if \(!governanceReady\)/);
  assert.match(form, /type='checkbox' name='consent'/);
  assert.match(form, /Read the privacy notice/);
});

test("security headers constrain framing, capabilities and transport", () => {
  for (const header of [
    "Content-Security-Policy",
    "Permissions-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "Referrer-Policy"
  ]) {
    assert.match(nextConfig, new RegExp(header));
  }
  assert.match(nextConfig, /frame-ancestors 'self'/);
  assert.match(nextConfig, /form-action 'self'/);
});
