import "server-only";
import type { PixContext } from "@/lib/pix";

/**
 * Pixelette Marketing's `PixContext`. Server-only: this module runs on the
 * server and is passed into the client `<Agent>` as a plain prop, the same
 * pattern `AgentBoundary`'s sibling websites use.
 *
 * WHAT IS SAFE TO STATE HERE, because the footer and the privacy statement
 * already print it on every page of this site:
 *   - the trading name, "Pixelette Marketing"
 *   - registration in England and Wales
 *   - the enquiries address, sales@pixelettemarketing.com
 *
 * Entity facts verified in the Service Offer and Website Plan (12 Nov 2026):
 * legal name, company number 17508478, incorporated 8 October 2026.
 *
 * `clutch` IS `null`. Pixelette Marketing has no published Clutch rating.
 * Copying Pixelette Technologies' 4.8-from-24-reviews figure onto this site
 * would be exactly the cross-company invention the brief forbids.
 *
 * `publishable` IS EMPTY. Pixelette Marketing has no claims register yet
 * (`src/content/claims.ts` does not exist on this site), so there is
 * nothing a register has verified as publishable. `pack.ts`'s claimGuards
 * and publishableFacts both already handle an empty list without special
 * casing, so this is not a "temporarily broken" state — it is the correct
 * state until a claims register exists.
 */
export function pixContext(): PixContext {
  return {
    contactEmail: "sales@pixelettemarketing.com",
    company: {
      name: "Pixelette Marketing",
      legalName: "Pixelette Marketing Ltd",
      incorporated: 2026,
      registeredIn: "England and Wales",
      crn: "17508478",
    },
    clutch: null,
    publishable: [],
  };
}

export default pixContext;
