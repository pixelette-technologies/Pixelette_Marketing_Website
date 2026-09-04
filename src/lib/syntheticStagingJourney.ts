import { createHmac, timingSafeEqual } from "node:crypto";
import type { GovernedContactSubmission } from "./contactContract";
import {
  buildMarketingBdSourceEnvelope,
  marketingBdSignature,
  sendMarketingBdSubmission,
  stableJson,
  type MarketingBdTransportConfiguration,
  validateMarketingBdTransportConfiguration,
} from "./marketingBdTransport.ts";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const NOTICE_VERSION = "synthetic-staging-v1";
const DESCRIPTION = "SYNTHETIC STAGING ONLY - NO REAL PERSON OR ENQUIRY";
const BASELINE_NEXT_ACTION = "AWAIT_RESTRICTED_BD_OUTCOME";
const LEARNED_NEXT_ACTION = "COLLECT_ADDITIONAL_MATCHED_OUTCOMES_BEFORE_PATTERN_PROPOSAL";

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
}): Promise<{ accepted: boolean; submissionId: string; providerReceiptId?: string; refusalCode?: string }> {
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
    refusalCode: delivery.refusalCode,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stagingEndpoint(sourceEndpoint: string, route: string): string {
  const endpoint = new URL(sourceEndpoint);
  if (!endpoint.pathname.endsWith("/v1/source-submissions")) {
    throw new Error("SYNTHETIC_STAGING_ENDPOINT_INVALID");
  }
  endpoint.pathname = endpoint.pathname.replace(/\/source-submissions$/, `/${route}`);
  return endpoint.toString();
}

async function signedSyntheticPost(options: {
  endpoint: string;
  eventId: string;
  body: Record<string, unknown>;
  secret: string;
  nowMs: number;
  fetchImpl: typeof fetch;
}): Promise<Record<string, unknown>> {
  const timestamp = Math.floor(options.nowMs / 1000);
  const response = await options.fetchImpl(options.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Marketing-Timestamp": String(timestamp),
      "X-Marketing-Idempotency-Key": options.eventId,
      "X-Marketing-Signature": marketingBdSignature(
        options.secret,
        timestamp,
        options.eventId,
        options.body,
      ),
    },
    body: stableJson(options.body),
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok
      || response.headers.get("cache-control") !== "no-store"
      || response.headers.get("x-marketing-data-classification") !== "synthetic-only") {
    throw new Error("SYNTHETIC_STAGING_RECEIVER_REFUSED");
  }
  const payload = await response.json() as unknown;
  if (!isRecord(payload)) throw new Error("SYNTHETIC_STAGING_RESPONSE_INVALID");
  return payload;
}

export interface SyntheticStagingFullJourneyResult {
  accepted: boolean;
  submissionId: string;
  providerReceiptId?: string;
  sourceReceiptStatus: string;
  baselineNextAction: string;
  outcomeStatus: string;
  outcomeReturnStatus: string;
  learnedNextAction: string;
  nextActionChanged: boolean;
  learningState: string;
  appliesLiveChange: false;
  acceptedForLiveLearning: false;
  sourceRefusalCode?: string;
}

async function governedStep<T>(name: string, action: () => Promise<T>): Promise<T> {
  try {
    return await action();
  } catch {
    throw new Error(`SYNTHETIC_STAGING_${name}_STEP_FAILED`);
  }
}

export async function executeSyntheticStagingFullJourney(options: {
  configuration: SyntheticStagingConfiguration;
  origin: string;
  eventId: string;
  nowMs: number;
  fetchImpl?: typeof fetch;
}): Promise<SyntheticStagingFullJourneyResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const source = await governedStep("SOURCE", () => executeSyntheticStagingJourney({ ...options, fetchImpl }));
  if (!source.accepted) {
    return {
      accepted: false,
      submissionId: source.submissionId,
      providerReceiptId: source.providerReceiptId,
      sourceReceiptStatus: "REFUSED",
      baselineNextAction: "",
      outcomeStatus: "",
      outcomeReturnStatus: "",
      learnedNextAction: "",
      nextActionChanged: false,
      learningState: "",
      appliesLiveChange: false,
      acceptedForLiveLearning: false,
      sourceRefusalCode: source.refusalCode,
    };
  }

  const eventId = source.submissionId;
  const query = { eventId };
  const request = {
    eventId,
    secret: options.configuration.transport.secret,
    nowMs: options.nowMs,
    fetchImpl,
  };
  const baseline = await governedStep("BASELINE", () => signedSyntheticPost({
    ...request,
    endpoint: stagingEndpoint(options.configuration.transport.endpoint, "synthetic-learning/query"),
    body: query,
  }));
  const outcome = await governedStep("OUTCOME", () => signedSyntheticPost({
    ...request,
    endpoint: stagingEndpoint(options.configuration.transport.endpoint, "synthetic-outcomes"),
    body: {
      eventId,
      governanceReference: "SYNTHETIC-BD-ACCEPTANCE",
      commercialFeedback: {
        stage: "SYNTHETIC_QUALIFIED",
        outcome: "SYNTHETIC_WON",
        valueBand: "SYNTHETIC_ZERO_VALUE",
      },
      attribution: {
        campaignId: options.configuration.transport.defaultCampaignId,
        source: "synthetic-staging",
      },
    },
  }));
  const returned = await governedStep("OUTCOME_RETURN", () => signedSyntheticPost({
    ...request,
    endpoint: stagingEndpoint(options.configuration.transport.endpoint, "synthetic-outcomes/query"),
    body: query,
  }));
  const learned = await governedStep("LEARNING", () => signedSyntheticPost({
    ...request,
    endpoint: stagingEndpoint(options.configuration.transport.endpoint, "synthetic-learning/query"),
    body: query,
  }));

  const learning = isRecord(learned.learning) ? learned.learning : undefined;
  const previousNextAction = String(learning?.previous_next_action ?? baseline.next_action ?? "");
  const learnedNextAction = String(learned.next_action ?? "");
  const acceptedForLiveLearning = learning?.accepted_for_live_learning;
  const appliesLiveChange = learned.applies_live_change;
  const valid = ["AWAITING_OUTCOME", "LEARNING_PROJECTED"].includes(String(baseline.learning_status))
    && previousNextAction === BASELINE_NEXT_ACTION
    && ["RECORDED", "DUPLICATE"].includes(String(outcome.outcome_status))
    && ["PROJECTED", "DUPLICATE"].includes(String((outcome.learning_projection as Record<string, unknown> | undefined)?.learning_status))
    && returned.outcome_status === "RETURNED"
    && learned.learning_status === "LEARNING_PROJECTED"
    && learnedNextAction === LEARNED_NEXT_ACTION
    && acceptedForLiveLearning === false
    && appliesLiveChange === false;

  return {
    accepted: valid,
    submissionId: eventId,
    providerReceiptId: source.providerReceiptId,
    sourceReceiptStatus: "STAGED FOR BD",
    baselineNextAction: previousNextAction,
    outcomeStatus: String(outcome.outcome_status ?? ""),
    outcomeReturnStatus: String(returned.outcome_status ?? ""),
    learnedNextAction,
    nextActionChanged: previousNextAction !== learnedNextAction,
    learningState: String(learning?.learning_state ?? ""),
    appliesLiveChange: false,
    acceptedForLiveLearning: false,
  };
}

export const SYNTHETIC_STAGING_MARKERS = Object.freeze({
  noticeVersion: NOTICE_VERSION,
  description: DESCRIPTION,
  email: "journey@example.invalid",
  baselineNextAction: BASELINE_NEXT_ACTION,
  learnedNextAction: LEARNED_NEXT_ACTION,
});
