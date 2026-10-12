import assert from "node:assert/strict";
import test from "node:test";
import {
  DurableContactDeliveryControl,
  createMemoryDeliveryStore,
  sendWithBoundedRetry,
} from "../src/lib/contactDeliveryControl.ts";

const eventId = "11111111-1111-4111-8111-111111111111";
const payload = { eventId, email: "test@example.invalid", message: "synthetic" };
const secret = "synthetic-test-secret-with-at-least-32-characters";

function fixture(options: {
  now?: () => number;
  rateLimitMax?: number;
  maxSubmissionAttempts?: number;
  leaseMs?: number;
} = {}) {
  const store = createMemoryDeliveryStore();
  const control = new DurableContactDeliveryControl({
    entity: "MARKETING",
    store,
    hmacSecret: secret,
    rateLimitMax: options.rateLimitMax ?? 20,
    maxSubmissionAttempts: options.maxSubmissionAttempts ?? 3,
    leaseMs: options.leaseMs,
    now: options.now,
  });
  return { store, control };
}

test("persists a successful receipt and replays it without another send", async () => {
  const store = createMemoryDeliveryStore();
  const control = new DurableContactDeliveryControl({
    entity: "MARKETING",
    store,
    hmacSecret: secret,
    rateLimitMax: 20,
  });
  const first = await control.begin(eventId, payload, "192.0.2.1");
  assert.equal(first.action, "SEND");
  if (first.action !== "SEND") return;
  assert.equal(first.idempotencyKey, `contact/marketing/${eventId}`);
  await control.complete(first.lease, "provider-receipt-test-1");

  const restarted = new DurableContactDeliveryControl({
    entity: "MARKETING",
    store,
    hmacSecret: secret,
    rateLimitMax: 20,
  });
  const replay = await restarted.begin(eventId, payload, "192.0.2.1");
  assert.deepEqual(replay, {
    action: "REPLAY",
    submissionId: eventId,
    providerReceiptId: "provider-receipt-test-1",
  });
});

test("blocks concurrent and payload-conflicting use of one event ID", async () => {
  const { control } = fixture();
  const first = await control.begin(eventId, payload, "192.0.2.2");
  assert.equal(first.action, "SEND");
  const concurrent = await control.begin(eventId, payload, "192.0.2.2");
  assert.equal(concurrent.action, "IN_PROGRESS");
  if (first.action !== "SEND") return;
  await control.fail(first.lease);
  const conflict = await control.begin(eventId, { ...payload, message: "changed" }, "192.0.2.2");
  assert.equal(conflict.action, "CONFLICT");
});

test("enforces a persistent rate limit without storing the source address", async () => {
  const { store, control } = fixture({ rateLimitMax: 2 });
  const first = await control.begin("11111111-1111-4111-8111-111111111112", payload, "198.51.100.20");
  assert.equal(first.action, "SEND");
  if (first.action === "SEND") await control.fail(first.lease);
  const second = await control.begin("11111111-1111-4111-8111-111111111113", payload, "198.51.100.20");
  assert.equal(second.action, "SEND");
  if (second.action === "SEND") await control.fail(second.lease);
  const limited = await control.begin("11111111-1111-4111-8111-111111111114", payload, "198.51.100.20");
  assert.equal(limited.action, "RATE_LIMITED");

  const serialized = JSON.stringify(await store.getRateTimestamps("MARKETING", "any"));
  assert.doesNotMatch(serialized, /198\.51\.100\.20|test@example\.invalid/);
});

test("caps failed submission attempts across restarts", async () => {
  const store = createMemoryDeliveryStore();
  const make = () =>
    new DurableContactDeliveryControl({
      entity: "MARKETING",
      store,
      hmacSecret: secret,
      rateLimitMax: 20,
      maxSubmissionAttempts: 2,
    });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const control = make();
    const decision = await control.begin(eventId, payload, `203.0.113.${attempt + 1}`);
    assert.equal(decision.action, "SEND");
    if (decision.action === "SEND") await control.fail(decision.lease);
  }
  const exhausted = await make().begin(eventId, payload, "203.0.113.3");
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
  assert.throws(
    () =>
      new DurableContactDeliveryControl({
        entity: "MARKETING",
        hmacSecret: secret,
      }),
    /DELIVERY_STORE_REQUIRED/,
  );
  assert.throws(
    () =>
      new DurableContactDeliveryControl({
        entity: "MARKETING",
        store: createMemoryDeliveryStore(),
        hmacSecret: "short",
      }),
    /HMAC_SECRET_TOO_SHORT/,
  );
});

test("rejects malformed provider receipt IDs", async () => {
  const { control } = fixture();
  const decision = await control.begin(eventId, payload, "192.0.2.30");
  assert.equal(decision.action, "SEND");
  if (decision.action !== "SEND") return;
  await assert.rejects(
    control.complete(decision.lease, "bad receipt with spaces"),
    /INVALID_PROVIDER_RECEIPT_ID/,
  );
  await control.complete(decision.lease, "provider_receipt_valid");
});

test("an expired lease cannot overwrite a successor lease", async () => {
  let now = 1_800_000_000_000;
  const { control } = fixture({ now: () => now, leaseMs: 1000 });
  const first = await control.begin(eventId, payload, "192.0.2.50");
  assert.equal(first.action, "SEND");
  if (first.action !== "SEND") return;
  now += 1001;
  const successor = await control.begin(eventId, payload, "192.0.2.50");
  assert.equal(successor.action, "SEND");
  if (successor.action !== "SEND") return;
  await assert.rejects(control.fail(first.lease), /LOCK_OWNERSHIP_LOST/);
  await control.fail(successor.lease);
});
