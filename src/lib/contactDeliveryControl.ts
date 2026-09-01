import { createHmac, randomUUID } from "node:crypto";
import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, resolve } from "node:path";

const EVENT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ENTITY = /^[A-Z][A-Z0-9_-]{1,31}$/;
const PAYLOAD_HASH = /^[a-f0-9]{64}$/;
const PROVIDER_RECEIPT_ID = /^[A-Za-z0-9_-]{1,256}$/;

type ReceiptState = "PENDING" | "FAILED" | "SUCCEEDED";

interface ReceiptRecord {
  schemaVersion: 1;
  entity: string;
  eventId: string;
  payloadHash: string;
  state: ReceiptState;
  attempts: number;
  createdAt: string;
  updatedAt: string;
  providerReceiptId?: string;
  failureCode?: "PROVIDER_DELIVERY_FAILED";
}

interface LockRecord {
  schemaVersion: 1;
  token: string;
  expiresAt: number;
}

export interface DeliveryLease {
  eventId: string;
  payloadHash: string;
  lockToken: string;
  receiptPath: string;
  lockPath: string;
}

export type BeginDeliveryResult =
  | { action: "SEND"; idempotencyKey: string; lease: DeliveryLease }
  | { action: "REPLAY"; submissionId: string; providerReceiptId: string }
  | { action: "IN_PROGRESS" }
  | { action: "RATE_LIMITED"; retryAfterSeconds: number }
  | { action: "CONFLICT" }
  | { action: "EXHAUSTED" };

export interface ContactDeliveryOptions {
  entity: string;
  storeDirectory: string;
  hmacSecret: string;
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
  leaseMs?: number;
  maxSubmissionAttempts?: number;
  now?: () => number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, allowed: readonly string[], required: readonly string[]): boolean {
  const keys = Object.keys(value);
  return keys.every((key) => allowed.includes(key)) && required.every((key) => keys.includes(key));
}

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value;
}

function stableJson(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("NON_FINITE_PAYLOAD_NUMBER");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (isRecord(value)) {
    const entries = Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  throw new Error("UNSUPPORTED_PAYLOAD_VALUE");
}

async function readJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const parsed: unknown = JSON.parse(await readFile(path, "utf8"));
    if (!isRecord(parsed)) throw new Error("CORRUPT_DURABLE_RECORD");
    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeJsonAtomically(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${randomUUID()}.tmp`;
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value)}\n`, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
  try {
    await rename(temporary, path);
  } catch (error) {
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

function receiptFrom(value: Record<string, unknown> | null): ReceiptRecord | null {
  if (value === null) return null;
  const allowed = [
    "schemaVersion", "entity", "eventId", "payloadHash", "state", "attempts",
    "createdAt", "updatedAt", "providerReceiptId", "failureCode",
  ];
  const required = ["schemaVersion", "entity", "eventId", "payloadHash", "state", "attempts", "createdAt", "updatedAt"];
  if (
    !hasExactKeys(value, allowed, required) ||
    value.schemaVersion !== 1 ||
    typeof value.entity !== "string" || !ENTITY.test(value.entity) ||
    typeof value.eventId !== "string" || !EVENT_ID.test(value.eventId) || value.eventId !== value.eventId.toLowerCase() ||
    typeof value.payloadHash !== "string" || !PAYLOAD_HASH.test(value.payloadHash) ||
    !["PENDING", "FAILED", "SUCCEEDED"].includes(String(value.state)) ||
    !Number.isSafeInteger(value.attempts) ||
    Number(value.attempts) < 1 ||
    !isIsoTimestamp(value.createdAt) ||
    !isIsoTimestamp(value.updatedAt) ||
    Date.parse(value.updatedAt) < Date.parse(value.createdAt)
  ) {
    throw new Error("CORRUPT_DURABLE_RECEIPT");
  }
  const validStateShape =
    (value.state === "PENDING" && value.providerReceiptId === undefined && value.failureCode === undefined) ||
    (value.state === "FAILED" && value.providerReceiptId === undefined && value.failureCode === "PROVIDER_DELIVERY_FAILED") ||
    (value.state === "SUCCEEDED" && typeof value.providerReceiptId === "string"
      && PROVIDER_RECEIPT_ID.test(value.providerReceiptId) && value.failureCode === undefined);
  if (!validStateShape) {
    throw new Error("CORRUPT_DURABLE_RECEIPT");
  }
  return value as unknown as ReceiptRecord;
}

function lockFrom(value: Record<string, unknown> | null): LockRecord {
  if (!value || !hasExactKeys(value, ["schemaVersion", "token", "expiresAt"], ["schemaVersion", "token", "expiresAt"])
    || value.schemaVersion !== 1 || typeof value.token !== "string" || !EVENT_ID.test(value.token)
    || typeof value.expiresAt !== "number" || !Number.isSafeInteger(value.expiresAt) || value.expiresAt < 0) {
    throw new Error("CORRUPT_DURABLE_LOCK");
  }
  return value as unknown as LockRecord;
}

export class DurableContactDeliveryControl {
  private readonly entity: string;
  private readonly storeDirectory: string;
  private readonly hmacSecret: string;
  private readonly rateLimitMax: number;
  private readonly rateLimitWindowMs: number;
  private readonly leaseMs: number;
  private readonly maxSubmissionAttempts: number;
  private readonly now: () => number;

  constructor(options: ContactDeliveryOptions) {
    if (!ENTITY.test(options.entity)) throw new Error("INVALID_ENTITY");
    const resolvedStoreDirectory = resolve(options.storeDirectory);
    if (!isAbsolute(options.storeDirectory) || resolvedStoreDirectory !== options.storeDirectory
      || parse(resolvedStoreDirectory).root === resolvedStoreDirectory) {
      throw new Error("STORE_DIRECTORY_MUST_BE_CANONICAL_NON_ROOT_ABSOLUTE");
    }
    if (options.hmacSecret.length < 32) throw new Error("HMAC_SECRET_TOO_SHORT");
    const rateLimitMax = options.rateLimitMax ?? 5;
    const rateLimitWindowMs = options.rateLimitWindowMs ?? 600_000;
    const leaseMs = options.leaseMs ?? 30_000;
    const maxSubmissionAttempts = options.maxSubmissionAttempts ?? 3;
    if (![rateLimitMax, rateLimitWindowMs, leaseMs, maxSubmissionAttempts].every(Number.isSafeInteger)) {
      throw new Error("INVALID_CONTROL_LIMIT");
    }
    if (rateLimitMax < 1 || rateLimitWindowMs < 1000 || leaseMs < 1000 || maxSubmissionAttempts < 1) {
      throw new Error("INVALID_CONTROL_LIMIT");
    }
    this.entity = options.entity;
    this.storeDirectory = resolvedStoreDirectory;
    this.hmacSecret = options.hmacSecret;
    this.rateLimitMax = rateLimitMax;
    this.rateLimitWindowMs = rateLimitWindowMs;
    this.leaseMs = leaseMs;
    this.maxSubmissionAttempts = maxSubmissionAttempts;
    this.now = options.now ?? Date.now;
  }

  private hmac(value: string): string {
    return createHmac("sha256", this.hmacSecret).update(value, "utf8").digest("hex");
  }

  private async acquireLock(path: string): Promise<string | null> {
    await mkdir(dirname(path), { recursive: true });
    const token = randomUUID();
    const record: LockRecord = { schemaVersion: 1, token, expiresAt: this.now() + this.leaseMs };
    try {
      const handle = await open(path, "wx", 0o600);
      try {
        await handle.writeFile(`${JSON.stringify(record)}\n`, "utf8");
        await handle.sync();
      } finally {
        await handle.close();
      }
      return token;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }

    const existing = lockFrom(await readJson(path));
    if (existing.expiresAt > this.now()) return null;

    const stalePath = `${path}.stale.${randomUUID()}`;
    try {
      await rename(path, stalePath);
      await unlink(stalePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
    return this.acquireLock(path);
  }

  private async releaseLock(path: string, token: string): Promise<void> {
    const existing = lockFrom(await readJson(path));
    if (!existing || existing.token !== token) throw new Error("LOCK_OWNERSHIP_LOST");
    await unlink(path);
  }

  private async reserveRateLimit(sourceKey: string): Promise<{ allowed: true } | { allowed: false; retryAfterSeconds: number }> {
    if (!sourceKey || sourceKey.length > 512) throw new Error("INVALID_RATE_LIMIT_KEY");
    const keyHash = this.hmac(`rate:${sourceKey}`);
    const directory = join(this.storeDirectory, this.entity, "rate");
    const recordPath = join(directory, `${keyHash}.json`);
    const lockPath = join(directory, `${keyHash}.lock`);
    const token = await this.acquireLock(lockPath);
    if (!token) return { allowed: false, retryAfterSeconds: 1 };
    try {
      const existing = await readJson(recordPath);
      const rawTimestamps = existing?.timestamps ?? [];
      if ((existing && (!hasExactKeys(existing, ["schemaVersion", "timestamps"], ["schemaVersion", "timestamps"])
        || existing.schemaVersion !== 1)) || !Array.isArray(rawTimestamps)
        || rawTimestamps.some((item) => typeof item !== "number" || !Number.isSafeInteger(item) || item < 0)) {
        throw new Error("CORRUPT_RATE_LIMIT_RECORD");
      }
      const now = this.now();
      const timestamps = rawTimestamps.filter((item) => item > now - this.rateLimitWindowMs);
      if (timestamps.length >= this.rateLimitMax) {
        const retryAfterSeconds = Math.max(1, Math.ceil((timestamps[0] + this.rateLimitWindowMs - now) / 1000));
        return { allowed: false, retryAfterSeconds };
      }
      timestamps.push(now);
      await writeJsonAtomically(recordPath, { schemaVersion: 1, timestamps });
      return { allowed: true };
    } finally {
      await this.releaseLock(lockPath, token);
    }
  }

  async begin(eventId: string, payload: unknown, sourceKey: string): Promise<BeginDeliveryResult> {
    if (!EVENT_ID.test(eventId)) throw new Error("INVALID_EVENT_ID");
    const rate = await this.reserveRateLimit(sourceKey);
    if (!rate.allowed) return { action: "RATE_LIMITED", retryAfterSeconds: rate.retryAfterSeconds };

    const payloadHash = this.hmac(`payload:${stableJson(payload)}`);
    const directory = join(this.storeDirectory, this.entity, "receipts");
    const receiptPath = join(directory, `${eventId.toLowerCase()}.json`);
    const lockPath = join(directory, `${eventId.toLowerCase()}.lock`);
    const lockToken = await this.acquireLock(lockPath);
    if (!lockToken) return { action: "IN_PROGRESS" };

    try {
      const existing = receiptFrom(await readJson(receiptPath));
      if (existing && (existing.entity !== this.entity || existing.eventId !== eventId.toLowerCase())) {
        throw new Error("CORRUPT_DURABLE_RECEIPT");
      }
      if (existing && existing.payloadHash !== payloadHash) {
        await this.releaseLock(lockPath, lockToken);
        return { action: "CONFLICT" };
      }
      if (existing?.state === "SUCCEEDED") {
        if (!existing.providerReceiptId) throw new Error("CORRUPT_DURABLE_RECEIPT");
        await this.releaseLock(lockPath, lockToken);
        return { action: "REPLAY", submissionId: existing.eventId, providerReceiptId: existing.providerReceiptId };
      }
      if (existing && existing.attempts >= this.maxSubmissionAttempts) {
        await this.releaseLock(lockPath, lockToken);
        return { action: "EXHAUSTED" };
      }

      const now = new Date(this.now()).toISOString();
      const record: ReceiptRecord = {
        schemaVersion: 1,
        entity: this.entity,
        eventId: eventId.toLowerCase(),
        payloadHash,
        state: "PENDING",
        attempts: (existing?.attempts ?? 0) + 1,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
      };
      await writeJsonAtomically(receiptPath, record);
      return {
        action: "SEND",
        idempotencyKey: `contact/${this.entity.toLowerCase()}/${eventId.toLowerCase()}`,
        lease: { eventId: eventId.toLowerCase(), payloadHash, lockToken, receiptPath, lockPath },
      };
    } catch (error) {
      await this.releaseLock(lockPath, lockToken).catch(() => undefined);
      throw error;
    }
  }

  private assertLease(lease: DeliveryLease): void {
    if (!EVENT_ID.test(lease.eventId) || !EVENT_ID.test(lease.lockToken) || !/^[a-f0-9]{64}$/.test(lease.payloadHash)) {
      throw new Error("INVALID_DELIVERY_LEASE");
    }
    const directory = join(this.storeDirectory, this.entity, "receipts");
    if (lease.receiptPath !== join(directory, `${lease.eventId.toLowerCase()}.json`)
      || lease.lockPath !== join(directory, `${lease.eventId.toLowerCase()}.lock`)) {
      throw new Error("INVALID_DELIVERY_LEASE");
    }
  }

  private async assertActiveLease(lease: DeliveryLease): Promise<void> {
    this.assertLease(lease);
    const lock = lockFrom(await readJson(lease.lockPath));
    if (lock.token !== lease.lockToken || lock.expiresAt <= this.now()) {
      throw new Error("LOCK_OWNERSHIP_LOST");
    }
  }

  async complete(lease: DeliveryLease, providerReceiptId: string): Promise<void> {
    await this.assertActiveLease(lease);
    if (!PROVIDER_RECEIPT_ID.test(providerReceiptId)) throw new Error("INVALID_PROVIDER_RECEIPT_ID");
    const existing = receiptFrom(await readJson(lease.receiptPath));
    if (!existing || existing.state !== "PENDING" || existing.eventId !== lease.eventId || existing.payloadHash !== lease.payloadHash) {
      throw new Error("DELIVERY_LEASE_MISMATCH");
    }
    const record: ReceiptRecord = {
      ...existing,
      state: "SUCCEEDED",
      updatedAt: new Date(this.now()).toISOString(),
      providerReceiptId,
    };
    await writeJsonAtomically(lease.receiptPath, record);
    await this.releaseLock(lease.lockPath, lease.lockToken);
  }

  async fail(lease: DeliveryLease): Promise<void> {
    await this.assertActiveLease(lease);
    const existing = receiptFrom(await readJson(lease.receiptPath));
    if (!existing || existing.state !== "PENDING" || existing.eventId !== lease.eventId || existing.payloadHash !== lease.payloadHash) {
      throw new Error("DELIVERY_LEASE_MISMATCH");
    }
    const record: ReceiptRecord = {
      ...existing,
      state: "FAILED",
      updatedAt: new Date(this.now()).toISOString(),
      failureCode: "PROVIDER_DELIVERY_FAILED",
    };
    await writeJsonAtomically(lease.receiptPath, record);
    await this.releaseLock(lease.lockPath, lease.lockToken);
  }
}

export async function sendWithBoundedRetry<T>(
  operation: () => Promise<T>,
  accepted: (value: T) => boolean,
  options: { maxAttempts?: number; baseDelayMs?: number; sleep?: (milliseconds: number) => Promise<void> } = {},
): Promise<{ ok: true; value: T; attempts: number } | { ok: false; attempts: number }> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 250;
  const sleep = options.sleep ?? ((milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds)));
  if (!Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 3 || !Number.isSafeInteger(baseDelayMs) || baseDelayMs < 0) {
    throw new Error("INVALID_RETRY_POLICY");
  }
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const value = await operation();
      if (accepted(value)) return { ok: true, value, attempts: attempt };
    } catch {
      // The provider-level idempotency key makes the same bounded request safe to retry.
    }
    if (attempt < maxAttempts) await sleep(baseDelayMs * 2 ** (attempt - 1));
  }
  return { ok: false, attempts: maxAttempts };
}
