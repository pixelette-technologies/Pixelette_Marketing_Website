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
 * WHAT STAYS NULL, ON INSTRUCTION, AND WHY. `legalName`, `incorporated` and
 * `crn` are left unset rather than filled from Pixelette Technologies Ltd's
 * own company number (11716825), which the Marketing footer and privacy page
 * also print today with a comment that it has not been confirmed as
 * Marketing's own number rather than a shared/trading-name arrangement. The
 * build brief is explicit: do not invent a legal name, an incorporation year
 * or a company number for this site, and do not copy Pixelette Technologies'
 * own figures onto it. If a verified legal name, incorporation year or
 * company number is supplied for Pixelette Marketing specifically, fill
 * these in then — not before.
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
      legalName: null,
      incorporated: null,
      registeredIn: "England and Wales",
      crn: null,
    },
    clutch: null,
    publishable: [],
  };
}

export default pixContext;
