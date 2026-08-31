import { createHmac, timingSafeEqual } from "node:crypto";
import type { GovernedContactSubmission } from "./contactContract";
import {
  buildMarketingBdSourceEnvelope,
  sendMarketingBdSubmission,
  type MarketingBdTransportConfiguration,
  validateMarketingBdTransportConfiguration,
} from "./marketingBdTransport.ts";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const NOTICE_VERSION = "synthetic-staging-v1";
const DESCRIPTION = "SYNTHETIC STAGING ONLY - NO REAL PERSON OR ENQUIRY";

export interface SyntheticStagingConfiguration {
  triggerSecret: string;
  dailyUniqueWriteLimit: 1;
  transport: MarketingBdTransportConfiguration;
}

type StagingEnvironment = Readonly<Record<string, string | undefined>>;

function required(environment: StagingEnvironment, name: string): string {
  const value = environment[name]?.trim();
  if (!value) throw new Error(`SYNTHETIC_STAGING_CONFIGURATION_MISSING:${name}`);
  return value;
}

export function readSyntheticStagingConfiguration(
  environment: StagingEnvironment = process.env,
): SyntheticStagingConfiguration {
  if (environment.VERCEL_ENV !== "preview" || environment.MARKETING_SYNTHETIC_STAGE_ENABLED !== "1") {
    throw new Error("SYNTHETIC_STAGING_DISABLED");
  }
  const triggerSecret = required(environment, "MARKETING_SYNTHETIC_STAGE_TRIGGER_SECRET");
  if (triggerSecret.length < 32 || triggerSecret.length > 256) {
    throw new Error("SYNTHETIC_STAGING_TRIGGER_SECRET_INVALID");
  }
  const retentionReviewDays = Number(required(environment, "MARKETING_RETENTION_REVIEW_DAYS"));
  const dailyUniqueWriteLimit = Number(required(environment, "MARKETING_SYNTHETIC_STAGE_DAILY_WRITE_LIMIT"));
  if (dailyUniqueWriteLimit !== 1) {
    throw new Error("SYNTHETIC_STAGING_DAILY_WRITE_LIMIT_INVALID");
  }
  const transport = validateMarketingBdTransportConfiguration({
    endpoint: required(environment, "MARKETING_BD_STAGE_URL"),
    endpointSha256: required(environment, "MARKETING_BD_STAGE_URL_SHA256"),
    secret: required(environment, "MARKETING_TRANSPORT_SECRET"),
    defaultCampaignId: required(environment, "MARKETING_DEFAULT_CAMPAIGN_ID"),
    retentionReviewDays,
  });
  return {
    triggerSecret,
    dailyUniqueWriteLimit,
    transport,
  };
}

export function syntheticStagingEventId(triggerSecret: string, nowMs: number): string {
  if (!Number.isSafeInteger(nowMs) || nowMs < 0) {
    throw new Error("SYNTHETIC_STAGING_TIME_INVALID");
  }
  const utcDay = new Date(nowMs).toISOString().slice(0, 10);
  const digest = createHmac("sha256", triggerSecret)
    .update(`marketing-synthetic-staging:${utcDay}`, "utf8")
    .digest("hex");
  return `${digest.slice(0, 8)}-${digest.slice(8, 12)}-4${digest.slice(13, 16)}-a${digest.slice(17, 20)}-${digest.slice(20, 32)}`;
}

export function authoriseSyntheticStagingTrigger(supplied: string | null, expected: string): void {
  const actualBuffer = Buffer.from(supplied ?? "", "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new Error("SYNTHETIC_STAGING_TRIGGER_REFUSED");
  }
}

export function buildSyntheticStagingSubmission(
  eventId: string,
  campaignId: string,
  nowMs: number,
): GovernedContactSubmission {
  if (!UUID.test(eventId)) throw new Error("SYNTHETIC_STAGING_EVENT_ID_INVALID");
  if (!Number.isSafeInteger(nowMs) || nowMs < 3_000) {
    throw new Error("SYNTHETIC_STAGING_TIME_INVALID");
  }
  return {
    eventId,
    firstName: "Synthetic",
    lastName: "Journey",
    email: "journey@example.invalid",
    description: DESCRIPTION,
    consent: true,
    noticeVersion: NOTICE_VERSION,
    formStartedAt: new Date(nowMs - 3_000).toISOString(),
    sourcePage: "/contact-us",
    attribution: {
      campaignId,
      utmSource: "synthetic",
      utmMedium: "synthetic",
      utmCampaign: campaignId,
      utmContent: undefined,
      utmTerm: undefined,
      landingPage: "/contact-us",
    },
  };
}

export async function executeSyntheticStagingJourney(options: {
  configuration: SyntheticStagingConfiguration;
  origin: string;
  eventId: string;
  nowMs: number;
  fetchImpl?: typeof fetch;
}): Promise<{ accepted: boolean; submissionId: string; providerReceiptId?: string }> {
  const origin = new URL(options.origin);
  if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash
      || origin.username || origin.password) {
    throw new Error("SYNTHETIC_STAGING_ORIGIN_INVALID");
  }
  const submission = buildSyntheticStagingSubmission(
    options.eventId,
    options.configuration.transport.defaultCampaignId,
    options.nowMs,
  );
  const envelope = buildMarketingBdSourceEnvelope(
    submission,
    options.configuration.transport,
    origin.origin,
    options.nowMs,
  );
  const delivery = await sendMarketingBdSubmission(envelope, options.configuration.transport, {
    fetchImpl: options.fetchImpl,
    now: () => options.nowMs,
  });
  return {
    accepted: delivery.accepted,
    submissionId: envelope.eventId,
    providerReceiptId: delivery.providerReceiptId,
  };
}

export const SYNTHETIC_STAGING_MARKERS = Object.freeze({
  noticeVersion: NOTICE_VERSION,
  description: DESCRIPTION,
  email: "journey@example.invalid",
});
