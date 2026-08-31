import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { GovernedContactSubmission } from "./contactContract";

const CANONICAL_CAMPAIGN = /^PMC-marketing-20[0-9]{2}(0[1-9]|1[0-2])-[0-9]{2}$/;
const SOURCE_PATH = "/v1/source-submissions";

export interface MarketingBdTransportConfiguration {
  endpoint: string;
  endpointSha256: string;
  secret: string;
  defaultCampaignId: string;
  retentionReviewDays: number;
}

export function marketingBdEndpointSha256(endpoint: string): string {
  return createHash("sha256").update(endpoint, "utf8").digest("hex");
}

export interface MarketingBdSourceEnvelope {
  entity: "marketing";
  payload: Record<string, unknown>;
  eventId: string;
  correlationId: string;
  sourceRecordId: string;
  campaignId: string;
  sourceUrl: string;
  noticeVersion: string;
  consentEvidenceRef: string;
  retentionReviewAt: string;
  occurredAt: string;
}

interface MarketingBdReceipt {
  transport_status?: unknown;
  receiver_receipt?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function stableJson(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("NON_FINITE_TRANSPORT_NUMBER");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (isRecord(value)) {
    return `{${Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  throw new Error("UNSUPPORTED_TRANSPORT_VALUE");
}

export function validateMarketingBdTransportConfiguration(
  configuration: MarketingBdTransportConfiguration,
): MarketingBdTransportConfiguration {
  let endpoint: URL;
  try {
    endpoint = new URL(configuration.endpoint);
  } catch {
    throw new Error("MARKETING_BD_ENDPOINT_INVALID");
  }
  if (endpoint.protocol !== "https:" || endpoint.pathname !== SOURCE_PATH || endpoint.search || endpoint.hash) {
    throw new Error("MARKETING_BD_ENDPOINT_INVALID");
  }
  const expectedHash = configuration.endpointSha256.trim().toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(expectedHash)) {
    throw new Error("MARKETING_BD_ENDPOINT_BINDING_INVALID");
  }
  const canonicalEndpoint = endpoint.toString();
  const actualHash = marketingBdEndpointSha256(canonicalEndpoint);
  if (!timingSafeEqual(Buffer.from(actualHash, "hex"), Buffer.from(expectedHash, "hex"))) {
    throw new Error("MARKETING_BD_ENDPOINT_BINDING_MISMATCH");
  }
  if (configuration.secret.length < 32) throw new Error("MARKETING_BD_SECRET_TOO_SHORT");
  if (!CANONICAL_CAMPAIGN.test(configuration.defaultCampaignId)) {
    throw new Error("MARKETING_BD_CAMPAIGN_INVALID");
  }
  if (!Number.isSafeInteger(configuration.retentionReviewDays)
      || configuration.retentionReviewDays < 1
      || configuration.retentionReviewDays > 3660) {
    throw new Error("MARKETING_BD_RETENTION_REVIEW_INVALID");
  }
  return { ...configuration, endpoint: canonicalEndpoint, endpointSha256: expectedHash };
}

export function buildMarketingBdSourceEnvelope(
  submission: GovernedContactSubmission,
  configuration: MarketingBdTransportConfiguration,
  origin: string,
  nowMs: number,
): MarketingBdSourceEnvelope {
  const canonical = validateMarketingBdTransportConfiguration(configuration);
  const sourceUrl = new URL(submission.sourcePage, origin);
  if (sourceUrl.origin !== origin || sourceUrl.protocol !== "https:") {
    throw new Error("MARKETING_BD_SOURCE_URL_INVALID");
  }
  const identity = submission.eventId.replaceAll("-", "").toUpperCase();
  const eventId = `MLE-MARKETING-${identity}`;
  const occurredAt = new Date(nowMs).toISOString();
  const retentionReviewAt = new Date(
    nowMs + canonical.retentionReviewDays * 86_400_000,
  ).toISOString();
  const suppliedCampaign = submission.attribution.campaignId;
  const campaignId = suppliedCampaign && CANONICAL_CAMPAIGN.test(suppliedCampaign)
    ? suppliedCampaign
    : canonical.defaultCampaignId;
  return {
    entity: "marketing",
    payload: {
      firstName: submission.firstName,
      lastName: submission.lastName,
      email: submission.email,
      description: submission.description,
      consent: submission.consent,
      noticeVersion: submission.noticeVersion,
      sourcePage: submission.sourcePage,
      attribution: {
        source: "website",
        campaignName: suppliedCampaign && suppliedCampaign !== campaignId ? suppliedCampaign : undefined,
        utmSource: submission.attribution.utmSource,
        utmMedium: submission.attribution.utmMedium,
        utmCampaign: submission.attribution.utmCampaign,
        utmContent: submission.attribution.utmContent,
        utmTerm: submission.attribution.utmTerm,
        landingPage: submission.attribution.landingPage ?? submission.sourcePage,
      },
    },
    eventId,
    correlationId: `MKT-CONTACT-${identity}`,
    sourceRecordId: `FORM-MARKETING-${identity}`,
    campaignId,
    sourceUrl: sourceUrl.toString(),
    noticeVersion: submission.noticeVersion,
    consentEvidenceRef: `CONTACT-CONSENT-${identity}`,
    retentionReviewAt,
    occurredAt,
  };
}

export function marketingBdSignature(
  secret: string,
  timestamp: number,
  idempotencyKey: string,
  body: MarketingBdSourceEnvelope,
): string {
  return createHmac("sha256", secret)
    .update(`${timestamp}.${idempotencyKey}.${stableJson(body)}`, "utf8")
    .digest("hex");
}

export async function sendMarketingBdSubmission(
  envelope: MarketingBdSourceEnvelope,
  configuration: MarketingBdTransportConfiguration,
  options: {
    fetchImpl?: typeof fetch;
    now?: () => number;
    timeoutMs?: number;
  } = {},
): Promise<{ accepted: boolean; providerReceiptId?: string }> {
  const canonical = validateMarketingBdTransportConfiguration(configuration);
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? Date.now;
  const timeoutMs = options.timeoutMs ?? 5000;
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 30_000) {
    throw new Error("MARKETING_BD_TIMEOUT_INVALID");
  }
  const timestamp = Math.floor(now() / 1000);
  const response = await fetchImpl(canonical.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Marketing-Timestamp": String(timestamp),
      "X-Marketing-Idempotency-Key": envelope.eventId,
      "X-Marketing-Signature": marketingBdSignature(canonical.secret, timestamp, envelope.eventId, envelope),
    },
    body: stableJson(envelope),
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok || response.headers.get("cache-control") !== "no-store") {
    return { accepted: false };
  }
  let payload: MarketingBdReceipt;
  try {
    payload = await response.json() as MarketingBdReceipt;
  } catch {
    return { accepted: false };
  }
  if (!["DELIVERED", "DUPLICATE"].includes(String(payload.transport_status))
      || !isRecord(payload.receiver_receipt)
      || payload.receiver_receipt.status !== "STAGED FOR BD") {
    return { accepted: false };
  }
  return { accepted: true, providerReceiptId: `bd_${envelope.eventId}` };
}
