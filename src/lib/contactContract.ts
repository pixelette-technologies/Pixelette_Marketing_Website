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

/** What the enquirer is trying to move, from the 8 Sep 2026 brief. The order
 *  is the brief's: the four commercial outcomes, then Launch, then Other. */
export const IMPROVE_OPTIONS = [
  "Demand",
  "Pipeline",
  "Conversion",
  "Revenue",
  "Launch",
  "Other"
] as const;

export type ImproveOption = (typeof IMPROVE_OPTIONS)[number];

export interface GovernedContactSubmission {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  /** Optional. The brief collects these so sales can prepare, but a missing
   *  company or website must never cost an enquiry. */
  company?: string;
  companyWebsite?: string;
  improve?: ImproveOption;
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
  "eventId", "firstName", "lastName", "email", "company", "companyWebsite", "improve",
  "description", "consent", "noticeVersion", "formStartedAt", "sourcePage", "_website",
  "attribution"
]);
const IMPROVE_VALUES: ReadonlySet<string> = new Set(IMPROVE_OPTIONS);
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

  // The three fields the 8 Sep brief adds are OPTIONAL, and the form posts
  // every key it holds, so an untouched input arrives as "". boundedString has
  // no optional mode — it returns null for "" at any minimum — so empty is
  // skipped before validating, exactly as the attribution loop below does.
  // Treating "" as invalid here would fail every enquiry that left Company
  // blank.
  let company: string | undefined;
  if (input.company !== undefined && input.company !== "") {
    const normalized = boundedString(input.company, 1, 200);
    if (!normalized) return { ok: false, code: "INVALID_CONTACT_FIELDS" };
    company = normalized;
  }

  let companyWebsite: string | undefined;
  if (input.companyWebsite !== undefined && input.companyWebsite !== "") {
    const normalized = boundedString(input.companyWebsite, 1, 200);
    if (!normalized) return { ok: false, code: "INVALID_CONTACT_FIELDS" };
    companyWebsite = normalized;
  }

  // Membership, not shape. An unrecognised value is rejected rather than
  // passed through, so the notification email can only ever carry one of the
  // six the brief names.
  let improve: ImproveOption | undefined;
  if (input.improve !== undefined && input.improve !== "") {
    const normalized = boundedString(input.improve, 1, 32);
    if (!normalized || !IMPROVE_VALUES.has(normalized)) {
      return { ok: false, code: "INVALID_CONTACT_FIELDS" };
    }
    improve = normalized as ImproveOption;
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
      company,
      companyWebsite,
      improve,
      description,
      consent: true,
      noticeVersion,
      formStartedAt: formStartedAt!,
      sourcePage,
      attribution
    }
  };
}
