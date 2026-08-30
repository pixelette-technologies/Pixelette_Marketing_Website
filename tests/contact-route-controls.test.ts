import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const route = readFileSync("src/app/api/contact/route.ts", "utf8");
const form = readFileSync("src/components/common/ContactUsForm.tsx", "utf8");
const nextConfig = readFileSync("next.config.ts", "utf8");
const envExample = readFileSync(".env.example", "utf8");

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
  const bdProvider = route.indexOf("sendMarketingBdSubmission(bdEnvelope");
  const provider = route.indexOf("new Resend(configuration.apiKey)");
  assert.ok(validation >= 0 && bdProvider > validation && provider > bdProvider);
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
  assert.match(route, /MARKETING_BD_STAGE_URL/);
  assert.match(route, /MARKETING_TRANSPORT_SECRET/);
  assert.match(route, /sendMarketingBdSubmission/);
  assert.match(route, /Marketing to BD handoff failed/);
  assert.match(form, /eventId \?\? crypto\.randomUUID\(\)/);
});

test("environment example enumerates the complete fail-closed contact and BD contract", () => {
  for (const name of [
    "RESEND_API_KEY",
    "CONTACT_TO_EMAIL",
    "CONTACT_FROM_EMAIL",
    "CONTACT_ALLOWED_ORIGINS",
    "CONTACT_PRIVACY_NOTICE_VERSION",
    "MARKETING_CONTACT_STORE_DIR",
    "MARKETING_CONTACT_RATE_LIMIT_SECRET",
    "MARKETING_BD_STAGE_URL",
    "MARKETING_TRANSPORT_SECRET",
    "MARKETING_DEFAULT_CAMPAIGN_ID",
    "MARKETING_RETENTION_REVIEW_DAYS",
    "NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_URL",
    "NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_VERSION",
    "NEXT_PUBLIC_CONTACT_CONSENT_TEXT",
  ]) {
    assert.match(envExample, new RegExp(`^${name}=$`, "m"));
  }
  assert.match(envExample, /persistent storage/);
  assert.match(envExample, /Ephemeral serverless/);
});

test("form remains unavailable until privacy and consent configuration is complete", () => {
  assert.match(form, /const governanceReady = Boolean\(privacyNoticeUrl && noticeVersion && consentText\)/);
  assert.match(form, /if \(!governanceReady\)/);
  assert.match(form, /type='checkbox' name='consent'/);
  assert.match(form, /Read the privacy notice/);
});

test("form captures governed campaign attribution without referrer path or query data", () => {
  assert.match(form, /new URLSearchParams\(window\.location\.search\)/);
  for (const parameter of [
    "campaign_id",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ]) {
    assert.match(form, new RegExp(`params\\.get\\("${parameter}"\\)`));
  }
  assert.match(form, /landingPage: window\.location\.pathname/);
  assert.match(form, /referrer = parsed\.origin/);
  assert.doesNotMatch(form, /referrer = `\$\{parsed\.origin\}\$\{parsed\.pathname\}`/);
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
