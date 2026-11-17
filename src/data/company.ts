/**
 * Verified company facts for share cards, footers and structured copy.
 *
 * Source: Pixelette Marketing Service Offer and Website Plan, 12 November 2026.
 * Positioning copy for the OG card lives on `heroCopy.ogHeadline` in
 * `src/data/home/homeContent.ts` so it stays tied to the homepage H1.
 */

export const company = {
  name: "Pixelette Marketing",
  legalName: "Pixelette Marketing Ltd",
  registeredIn: "England and Wales",
  companyNumber: "17508478",
  /** Full incorporation date for customer-facing copy. */
  incorporatedDate: "8 October 2026",
  /** Year only, for structured / directory fields. */
  incorporated: 2026,
  registeredOffice: "77 Fulham Palace Road, London W6 8JA",
  /** Filed figure including directors. Specialists are not employees. */
  filedEmployees: 3,
  /** Trading presence only — never substitute for registered office. */
  usTradingAddress: "6305 Naples Blvd, Naples, FL 34109"
} as const;

/** One factual footer line for the default OG card. */
export function companyOgFooter(): string {
  return `Marketing agency`;
}
