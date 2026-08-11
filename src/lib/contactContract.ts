export interface ContactAttribution {
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
}

export interface GovernedContactSubmission {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  consent: true;
  noticeVersion: string;
  formStartedAt: string;
  sourcePage: string;
  attribution: ContactAttribution;
}

export type ContactValidationResult =
  | { ok: true; value: GovernedContactSubmission }
  | { ok: false; code: string };

const TOP_LEVEL_FIELDS = new Set([
  "eventId", "firstName", "lastName", "email", "description", "consent", "noticeVersion",
  "formStartedAt", "sourcePage", "_website", "attribution"
]);
const ATTRIBUTION_FIELDS = new Set([
  "campaignId", "utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm",
  "landingPage", "referrer"
]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function boundedString(value: unknown, minimum: number, maximum: number): string | null {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result.length >= minimum && result.length <= maximum ? result : null;
}

export function validateContactPayload(
  input: unknown,
  expectedNoticeVersion: string,
  nowMs = Date.now()
): ContactValidationResult {
  if (!expectedNoticeVersion || !isRecord(input)) return { ok: false, code: "FORM_GOVERNANCE_NOT_READY" };
  if (Object.keys(input).some((key) => !TOP_LEVEL_FIELDS.has(key))) {
    return { ok: false, code: "UNSUPPORTED_FIELD" };
  }
  if (input._website !== "" && input._website !== undefined) {
    return { ok: false, code: "SPAM_REJECTED" };
  }

  const eventId = boundedString(input.eventId, 36, 36);
  const firstName = boundedString(input.firstName, 2, 50);
  const lastName = boundedString(input.lastName, 2, 50);
  const email = boundedString(input.email, 3, 254)?.toLowerCase() ?? null;
  const description = boundedString(input.description, 10, 2000);
  const noticeVersion = boundedString(input.noticeVersion, 1, 100);
  const formStartedAt = boundedString(input.formStartedAt, 20, 40);
  const sourcePage = boundedString(input.sourcePage, 1, 200);
  if (!eventId || !UUID.test(eventId) || !firstName || !lastName || !email || !EMAIL.test(email) || !description) {
    return { ok: false, code: "INVALID_CONTACT_FIELDS" };
  }
  if (input.consent !== true || noticeVersion !== expectedNoticeVersion) {
    return { ok: false, code: "CONSENT_OR_NOTICE_VERSION_INVALID" };
  }
  if (!sourcePage?.startsWith("/") || sourcePage.startsWith("//")) {
    return { ok: false, code: "SOURCE_PAGE_INVALID" };
  }
  const startedMs = Date.parse(formStartedAt ?? "");
  const elapsed = nowMs - startedMs;
  if (!Number.isFinite(startedMs) || elapsed < 2000 || elapsed > 86_400_000) {
    return { ok: false, code: "FORM_TIMING_INVALID" };
  }

  const attributionInput = input.attribution ?? {};
  if (!isRecord(attributionInput)
      || Object.keys(attributionInput).some((key) => !ATTRIBUTION_FIELDS.has(key))) {
    return { ok: false, code: "ATTRIBUTION_INVALID" };
  }
  const attribution: ContactAttribution = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const value = attributionInput[key];
    if (value === undefined || value === "") continue;
    const normalized = boundedString(value, 1, 200);
    if (!normalized) return { ok: false, code: "ATTRIBUTION_INVALID" };
    attribution[key as keyof ContactAttribution] = normalized;
  }

  return {
    ok: true,
    value: {
      eventId: eventId.toLowerCase(),
      firstName,
      lastName,
      email,
      description,
      consent: true,
      noticeVersion,
      formStartedAt: formStartedAt!,
      sourcePage,
      attribution
    }
  };
}
