import { createHmac, randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const EVENT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ENTITY = /^[A-Z][A-Z0-9_-]{1,31}$/;
const PAYLOAD_HASH = /^[a-f0-9]{64}$/;
const PROVIDER_RECEIPT_ID = /^[A-Za-z0-9_-]{1,256}$/;

type ReceiptState = "PENDING" | "FAILED" | "SUCCEEDED";

interface ReceiptRecord {
  entity: string;
  eventId: string;
  payloadHash: string;
  state: ReceiptState;
  attempts: number;
  createdAt: string;
  updatedAt: string;
  providerReceiptId?: string;
  failureCode?: "PROVIDER_DELIVERY_FAILED";
  lockToken?: string | null;
  lockExpiresAt?: number | null;
}

export interface DeliveryLease {
  eventId: string;
  payloadHash: string;
  lockToken: string;
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
  hmacSecret: string;
  /** Production: Supabase service client. Tests: omit and pass `store`. */
  supabase?: SupabaseClient;
  /** In-memory store for unit tests. */
  store?: DeliveryStore;
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
  leaseMs?: number;
  maxSubmissionAttempts?: number;
  now?: () => number;
}

export interface DeliveryStore {
  getRateTimestamps(entity: string, keyHash: string): Promise<number[]>;
  setRateTimestamps(
    entity: string,
    keyHash: string,
    timestamps: number[],
  ): Promise<void>;
  getReceipt(entity: string, eventId: string): Promise<ReceiptRecord | null>;
  putReceipt(record: ReceiptRecord): Promise<void>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

/** In-memory delivery store for unit tests. */
export function createMemoryDeliveryStore(): DeliveryStore {
  const rates = new Map<string, number[]>();
  const receipts = new Map<string, ReceiptRecord>();

  return {
    async getRateTimestamps(entity, keyHash) {
      return [...(rates.get(`${entity}:${keyHash}`) ?? [])];
    },
    async setRateTimestamps(entity, keyHash, timestamps) {
      rates.set(`${entity}:${keyHash}`, [...timestamps]);
    },
    async getReceipt(entity, eventId) {
      const existing = receipts.get(`${entity}:${eventId}`);
      return existing ? { ...existing } : null;
    },
    async putReceipt(record) {
      receipts.set(`${record.entity}:${record.eventId}`, { ...record });
    },
  };
}

function createSupabaseDeliveryStore(supabase: SupabaseClient): DeliveryStore {
  return {
    async getRateTimestamps(entity, keyHash) {
      const { data, error } = await supabase
        .from("contact_delivery_rate")
        .select("timestamps")
        .eq("entity", entity)
        .eq("key_hash", keyHash)
        .maybeSingle();
      if (error) throw error;
      const timestamps = data?.timestamps;
      if (!Array.isArray(timestamps)) return [];
      return timestamps.map(Number).filter((item) => Number.isSafeInteger(item));
    },
    async setRateTimestamps(entity, keyHash, timestamps) {
      const { error } = await supabase.from("contact_delivery_rate").upsert(
        {
          entity,
          key_hash: keyHash,
          timestamps,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "entity,key_hash" },
      );
      if (error) throw error;
    },
    async getReceipt(entity, eventId) {
      const { data, error } = await supabase
        .from("contact_delivery_receipts")
        .select(
          "entity, event_id, payload_hash, state, attempts, created_at, updated_at, provider_receipt_id, failure_code, lock_token, lock_expires_at",
        )
        .eq("entity", entity)
        .eq("event_id", eventId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        entity: String(data.entity),
        eventId: String(data.event_id),
        payloadHash: String(data.payload_hash),
        state: data.state as ReceiptState,
        attempts: Number(data.attempts),
        createdAt: String(data.created_at),
        updatedAt: String(data.updated_at),
        providerReceiptId: data.provider_receipt_id
          ? String(data.provider_receipt_id)
          : undefined,
        failureCode: data.failure_code
          ? (data.failure_code as "PROVIDER_DELIVERY_FAILED")
          : undefined,
        lockToken: data.lock_token ? String(data.lock_token) : null,
        lockExpiresAt: data.lock_expires_at
          ? Date.parse(String(data.lock_expires_at))
          : null,
      };
    },
    async putReceipt(record) {
      const { error } = await supabase.from("contact_delivery_receipts").upsert(
        {
          entity: record.entity,
          event_id: record.eventId,
          payload_hash: record.payloadHash,
          state: record.state,
          attempts: record.attempts,
          created_at: record.createdAt,
          updated_at: record.updatedAt,
          provider_receipt_id: record.providerReceiptId ?? null,
          failure_code: record.failureCode ?? null,
          lock_token: record.lockToken ?? null,
          lock_expires_at:
            record.lockExpiresAt != null
              ? new Date(record.lockExpiresAt).toISOString()
              : null,
        },
        { onConflict: "entity,event_id" },
      );
      if (error) throw error;
    },
  };
}

export class DurableContactDeliveryControl {
  private readonly entity: string;
  private readonly hmacSecret: string;
  private readonly store: DeliveryStore;
  private readonly rateLimitMax: number;
  private readonly rateLimitWindowMs: number;
  private readonly leaseMs: number;
  private readonly maxSubmissionAttempts: number;
  private readonly now: () => number;

  constructor(options: ContactDeliveryOptions) {
    if (!ENTITY.test(options.entity)) throw new Error("INVALID_ENTITY");
    if (options.hmacSecret.length < 32) throw new Error("HMAC_SECRET_TOO_SHORT");
    if (!options.store && !options.supabase) {
      throw new Error("DELIVERY_STORE_REQUIRED");
    }
    const rateLimitMax = options.rateLimitMax ?? 5;
    const rateLimitWindowMs = options.rateLimitWindowMs ?? 600_000;
    const leaseMs = options.leaseMs ?? 30_000;
    const maxSubmissionAttempts = options.maxSubmissionAttempts ?? 3;
    if (
      ![rateLimitMax, rateLimitWindowMs, leaseMs, maxSubmissionAttempts].every(
        Number.isSafeInteger,
      )
    ) {
      throw new Error("INVALID_CONTROL_LIMIT");
    }
    if (
      rateLimitMax < 1 ||
      rateLimitWindowMs < 1000 ||
      leaseMs < 1000 ||
      maxSubmissionAttempts < 1
    ) {
      throw new Error("INVALID_CONTROL_LIMIT");
    }
    this.entity = options.entity;
    this.hmacSecret = options.hmacSecret;
    this.store =
      options.store ?? createSupabaseDeliveryStore(options.supabase!);
    this.rateLimitMax = rateLimitMax;
    this.rateLimitWindowMs = rateLimitWindowMs;
    this.leaseMs = leaseMs;
    this.maxSubmissionAttempts = maxSubmissionAttempts;
    this.now = options.now ?? Date.now;
  }

  private hmac(value: string): string {
    return createHmac("sha256", this.hmacSecret).update(value, "utf8").digest("hex");
  }

  private async reserveRateLimit(
    sourceKey: string,
  ): Promise<{ allowed: true } | { allowed: false; retryAfterSeconds: number }> {
    if (!sourceKey || sourceKey.length > 512) throw new Error("INVALID_RATE_LIMIT_KEY");
    const keyHash = this.hmac(`rate:${sourceKey}`);
    const now = this.now();
    const existing = await this.store.getRateTimestamps(this.entity, keyHash);
    const timestamps = existing.filter((item) => item > now - this.rateLimitWindowMs);
    if (timestamps.length >= this.rateLimitMax) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((timestamps[0] + this.rateLimitWindowMs - now) / 1000),
      );
      return { allowed: false, retryAfterSeconds };
    }
    timestamps.push(now);
    await this.store.setRateTimestamps(this.entity, keyHash, timestamps);
    return { allowed: true };
  }

  async begin(
    eventId: string,
    payload: unknown,
    sourceKey: string,
  ): Promise<BeginDeliveryResult> {
    if (!EVENT_ID.test(eventId)) throw new Error("INVALID_EVENT_ID");
    const rate = await this.reserveRateLimit(sourceKey);
    if (!rate.allowed) {
      return { action: "RATE_LIMITED", retryAfterSeconds: rate.retryAfterSeconds };
    }

    const normalizedEventId = eventId.toLowerCase();
    const payloadHash = this.hmac(`payload:${stableJson(payload)}`);
    const existing = await this.store.getReceipt(this.entity, normalizedEventId);

    if (existing && existing.payloadHash !== payloadHash) {
      return { action: "CONFLICT" };
    }
    if (existing?.state === "SUCCEEDED") {
      if (!existing.providerReceiptId) throw new Error("CORRUPT_DURABLE_RECEIPT");
      return {
        action: "REPLAY",
        submissionId: existing.eventId,
        providerReceiptId: existing.providerReceiptId,
      };
    }
    if (existing && existing.attempts >= this.maxSubmissionAttempts) {
      return { action: "EXHAUSTED" };
    }

    const now = this.now();
    if (
      existing?.lockToken &&
      existing.lockExpiresAt != null &&
      existing.lockExpiresAt > now &&
      existing.state === "PENDING"
    ) {
      return { action: "IN_PROGRESS" };
    }

    const lockToken = randomUUID();
    const isoNow = new Date(now).toISOString();
    const record: ReceiptRecord = {
      entity: this.entity,
      eventId: normalizedEventId,
      payloadHash,
      state: "PENDING",
      attempts: (existing?.attempts ?? 0) + 1,
      createdAt: existing?.createdAt ?? isoNow,
      updatedAt: isoNow,
      lockToken,
      lockExpiresAt: now + this.leaseMs,
    };
    await this.store.putReceipt(record);

    return {
      action: "SEND",
      idempotencyKey: `contact/${this.entity.toLowerCase()}/${normalizedEventId}`,
      lease: {
        eventId: normalizedEventId,
        payloadHash,
        lockToken,
      },
    };
  }

  private async assertActiveLease(lease: DeliveryLease): Promise<ReceiptRecord> {
    if (
      !EVENT_ID.test(lease.eventId) ||
      !EVENT_ID.test(lease.lockToken) ||
      !PAYLOAD_HASH.test(lease.payloadHash)
    ) {
      throw new Error("INVALID_DELIVERY_LEASE");
    }
    const existing = await this.store.getReceipt(this.entity, lease.eventId);
    if (
      !existing ||
      existing.lockToken !== lease.lockToken ||
      existing.lockExpiresAt == null ||
      existing.lockExpiresAt <= this.now() ||
      existing.payloadHash !== lease.payloadHash
    ) {
      throw new Error("LOCK_OWNERSHIP_LOST");
    }
    return existing;
  }

  async complete(lease: DeliveryLease, providerReceiptId: string): Promise<void> {
    const existing = await this.assertActiveLease(lease);
    if (!PROVIDER_RECEIPT_ID.test(providerReceiptId)) {
      throw new Error("INVALID_PROVIDER_RECEIPT_ID");
    }
    if (existing.state !== "PENDING") throw new Error("DELIVERY_LEASE_MISMATCH");
    await this.store.putReceipt({
      ...existing,
      state: "SUCCEEDED",
      updatedAt: new Date(this.now()).toISOString(),
      providerReceiptId,
      failureCode: undefined,
      lockToken: null,
      lockExpiresAt: null,
    });
  }

  async fail(lease: DeliveryLease): Promise<void> {
    const existing = await this.assertActiveLease(lease);
    if (existing.state !== "PENDING") throw new Error("DELIVERY_LEASE_MISMATCH");
    await this.store.putReceipt({
      ...existing,
      state: "FAILED",
      updatedAt: new Date(this.now()).toISOString(),
      failureCode: "PROVIDER_DELIVERY_FAILED",
      providerReceiptId: undefined,
      lockToken: null,
      lockExpiresAt: null,
    });
  }
}

export async function sendWithBoundedRetry<T>(
  operation: () => Promise<T>,
  accepted: (value: T) => boolean,
  options: {
    maxAttempts?: number;
    baseDelayMs?: number;
    sleep?: (milliseconds: number) => Promise<void>;
  } = {},
): Promise<
  { ok: true; value: T; attempts: number } | { ok: false; attempts: number }
> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 250;
  const sleep =
    options.sleep ??
    ((milliseconds: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, milliseconds)));
  if (
    !Number.isSafeInteger(maxAttempts) ||
    maxAttempts < 1 ||
    maxAttempts > 3 ||
    !Number.isSafeInteger(baseDelayMs) ||
    baseDelayMs < 0
  ) {
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
