import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { DurableContactDeliveryControl, sendWithBoundedRetry } from "../src/lib/contactDeliveryControl.ts";

const eventId = "11111111-1111-4111-8111-111111111111";
const payload = { eventId, email: "test@example.invalid", message: "synthetic" };
const secret = "synthetic-test-secret-with-at-least-32-characters";

async function fixture(options: { now?: () => number; rateLimitMax?: number; maxSubmissionAttempts?: number; leaseMs?: number } = {}) {
  const directory = await mkdtemp(join(tmpdir(), "marketing-contact-control-"));
  const control = new DurableContactDeliveryControl({
    entity: "MARKETING",
    storeDirectory: directory,
    hmacSecret: secret,
    rateLimitMax: options.rateLimitMax ?? 20,
    maxSubmissionAttempts: options.maxSubmissionAttempts ?? 3,
    leaseMs: options.leaseMs,
    now: options.now,
  });
  return { directory, control };
}

test("persists a successful receipt and replays it without another send", async (t) => {
  const { directory, control } = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const first = await control.begin(eventId, payload, "192.0.2.1");
  assert.equal(first.action, "SEND");
  if (first.action !== "SEND") return;
  assert.equal(first.idempotencyKey, `contact/marketing/${eventId}`);
  await control.complete(first.lease, "provider-receipt-test-1");

  const restarted = new DurableContactDeliveryControl({
    entity: "MARKETING", storeDirectory: directory, hmacSecret: secret, rateLimitMax: 20,
  });
  const replay = await restarted.begin(eventId, payload, "192.0.2.1");
  assert.deepEqual(replay, {
    action: "REPLAY", submissionId: eventId, providerReceiptId: "provider-receipt-test-1",
  });
});

test("blocks concurrent and payload-conflicting use of one event ID", async (t) => {
  const { directory, control } = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const first = await control.begin(eventId, payload, "192.0.2.2");
  assert.equal(first.action, "SEND");
  const concurrent = await control.begin(eventId, payload, "192.0.2.2");
  assert.equal(concurrent.action, "IN_PROGRESS");
  if (first.action !== "SEND") return;
  await control.fail(first.lease);
  const conflict = await control.begin(eventId, { ...payload, message: "changed" }, "192.0.2.2");
  assert.equal(conflict.action, "CONFLICT");
});

test("enforces a persistent rate limit without storing the source address", async (t) => {
  const { directory, control } = await fixture({ rateLimitMax: 2 });
  t.after(() => rm(directory, { recursive: true, force: true }));
  const first = await control.begin("11111111-1111-4111-8111-111111111112", payload, "198.51.100.20");
  assert.equal(first.action, "SEND");
  if (first.action === "SEND") await control.fail(first.lease);
  const second = await control.begin("11111111-1111-4111-8111-111111111113", payload, "198.51.100.20");
  assert.equal(second.action, "SEND");
  if (second.action === "SEND") await control.fail(second.lease);
  const limited = await control.begin("11111111-1111-4111-8111-111111111114", payload, "198.51.100.20");
  assert.equal(limited.action, "RATE_LIMITED");

  const rateDirectory = join(directory, "MARKETING", "rate");
  const files = await readdir(rateDirectory);
  const content = (await Promise.all(files.filter((name) => name.endsWith(".json"))
    .map((name) => readFile(join(rateDirectory, name), "utf8")))).join("\n");
  assert.doesNotMatch(content, /198\.51\.100\.20|test@example\.invalid/);
});

test("caps failed submission attempts across restarts", async (t) => {
  const { directory, control } = await fixture({ maxSubmissionAttempts: 2 });
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const decision = await control.begin(eventId, payload, `203.0.113.${attempt + 1}`);
    assert.equal(decision.action, "SEND");
    if (decision.action === "SEND") await control.fail(decision.lease);
  }
  const exhausted = await control.begin(eventId, payload, "203.0.113.3");
  assert.equal(exhausted.action, "EXHAUSTED");
});

test("retries provider work at most three times and stops after success", async () => {
  let calls = 0;
  const delays: number[] = [];
  const result = await sendWithBoundedRetry(
    async () => ({ accepted: ++calls === 3 }),
    (value) => value.accepted,
    { sleep: async (milliseconds) => { delays.push(milliseconds); } },
  );
  assert.equal(result.ok, true);
  assert.equal(calls, 3);
  assert.deepEqual(delays, [250, 500]);

  calls = 0;
  const failed = await sendWithBoundedRetry(
    async () => { calls += 1; throw new Error("synthetic provider failure"); },
    () => true,
    { sleep: async () => undefined },
  );
  assert.deepEqual(failed, { ok: false, attempts: 3 });
  assert.equal(calls, 3);
});

test("fails closed on unsafe durable-control configuration", () => {
  assert.throws(() => new DurableContactDeliveryControl({
    entity: "MARKETING", storeDirectory: "relative/path", hmacSecret: secret,
  }), /STORE_DIRECTORY_MUST_BE_CANONICAL_NON_ROOT_ABSOLUTE/);
  assert.throws(() => new DurableContactDeliveryControl({
    entity: "MARKETING", storeDirectory: tmpdir(), hmacSecret: "short",
  }), /HMAC_SECRET_TOO_SHORT/);
});

test("rejects forged lease paths and malformed provider receipt IDs", async (t) => {
  const { directory, control } = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const decision = await control.begin(eventId, payload, "192.0.2.30");
  assert.equal(decision.action, "SEND");
  if (decision.action !== "SEND") return;
  await assert.rejects(control.complete({ ...decision.lease, receiptPath: join(directory, "outside.json") }, "receipt"), /INVALID_DELIVERY_LEASE/);
  await assert.rejects(control.complete(decision.lease, "bad receipt with spaces"), /INVALID_PROVIDER_RECEIPT_ID/);
  await control.complete(decision.lease, "provider_receipt_valid");
});

test("rejects tampered receipt and rate-record schemas", async (t) => {
  const { directory, control } = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const first = await control.begin(eventId, payload, "192.0.2.40");
  assert.equal(first.action, "SEND");
  if (first.action !== "SEND") return;
  await control.complete(first.lease, "provider_receipt_valid");
  const receipt = JSON.parse(await readFile(first.lease.receiptPath, "utf8"));
  await writeFile(first.lease.receiptPath, `${JSON.stringify({
    ...receipt, providerReceiptId: "bad receipt with spaces", rawContact: "synthetic@example.invalid",
  })}\n`, "utf8");
  await assert.rejects(control.begin(eventId, payload, "192.0.2.41"), /CORRUPT_DURABLE_RECEIPT/);

  const rateDirectory = join(directory, "MARKETING", "rate");
  const rateFiles = (await readdir(rateDirectory)).filter((name) => name.endsWith(".json"));
  assert.ok(rateFiles.length > 0);
  for (const rateFile of rateFiles) {
    const ratePath = join(rateDirectory, rateFile);
    const rate = JSON.parse(await readFile(ratePath, "utf8"));
    await writeFile(ratePath, `${JSON.stringify({ ...rate, rawSourceKey: "192.0.2.40", contactEmail: "synthetic@example.invalid" })}\n`, "utf8");
  }
  await assert.rejects(
    control.begin("11111111-1111-4111-8111-111111111115", payload, "192.0.2.40"),
    /CORRUPT_RATE_LIMIT_RECORD/,
  );
});

test("an expired lease cannot overwrite a successor lease", async (t) => {
  let now = 1_800_000_000_000;
  const { directory, control } = await fixture({ now: () => now, leaseMs: 1000 });
  t.after(() => rm(directory, { recursive: true, force: true }));
  const first = await control.begin(eventId, payload, "192.0.2.50");
  assert.equal(first.action, "SEND");
  if (first.action !== "SEND") return;
  now += 1001;
  const successor = await control.begin(eventId, payload, "192.0.2.50");
  assert.equal(successor.action, "SEND");
  if (successor.action !== "SEND") return;
  await assert.rejects(control.fail(first.lease), /LOCK_OWNERSHIP_LOST/);
  const current = JSON.parse(await readFile(successor.lease.receiptPath, "utf8"));
  assert.equal(current.state, "PENDING");
  assert.equal(current.attempts, 2);
  await control.fail(successor.lease);
});

test("rejects an impossible negative lock expiry", async (t) => {
  const { directory, control } = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const decision = await control.begin(eventId, payload, "192.0.2.60");
  assert.equal(decision.action, "SEND");
  if (decision.action !== "SEND") return;
  const lock = JSON.parse(await readFile(decision.lease.lockPath, "utf8"));
  await writeFile(decision.lease.lockPath, `${JSON.stringify({ ...lock, expiresAt: -1 })}\n`, "utf8");
  await assert.rejects(control.begin(eventId, payload, "192.0.2.60"), /CORRUPT_DURABLE_LOCK/);
});
