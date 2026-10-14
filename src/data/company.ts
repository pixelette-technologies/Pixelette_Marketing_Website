/**
 * Verified company facts for share cards, footers and structured copy.
 *
 * `incorporated` stays null until Marketing has its own verified year —
 * do not copy Pixelette Technologies' 2018 onto this entity.
 * See `src/agent/context.ts`.
 *
 * Positioning copy for the OG card lives on `heroCopy.ogHeadline` in
 * `src/data/home/homeContent.ts` so it stays tied to the homepage H1.
 */

export const company = {
  name: "Pixelette Marketing",
  registeredIn: "England and Wales",
  /** Null until a verified incorporation year exists for this entity. */
  incorporated: null as number | null
} as const;

/** One factual footer line for the default OG card — no year until verified. */
export function companyOgFooter(): string {
  if (company.incorporated != null) {
    return `Marketing agency`;
  }
  return `Marketing agency`;
}
