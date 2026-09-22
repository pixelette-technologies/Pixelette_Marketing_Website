import { growthSystemData } from "@/data/home";
import { DIAGNOSTIC_HREF, DIAGNOSTIC_LINK_LABEL } from "@/data/strategy";
import { servicesData } from "./servicesData";

// THE HUB AND THE HOME PAGE NOW TELL ONE STORY. Until 22 Sep 2026 they told
// two: the home page sold five connected capabilities, and this page sold
// eight flat services in a grid of eight equal boxes. Same offer, two shapes,
// and the eight boxes were the weaker of the two — eight near-identical cards
// of near-identical prose read as a menu rather than as a capability.
//
// THE COPY IS NOT RESTATED HERE, IT IS IMPORTED. Every title and description
// below comes from growthSystemData, which is management's approved wording
// and is what the home page already renders. Restating it in a second file is
// how the two pages drifted apart in the first place, so the only thing this
// file owns is the MAPPING: which service page sits under which capability.
//
// The mapping follows the home page's own capability lists rather than our
// judgement of where a service belongs. PR is the one worth noting: it reads
// as authority work, but growthSystemData lists plain "PR" under Demand &
// Performance and "digital PR" under Search & Authority, so it is placed where
// the approved copy puts it and not where it feels right.
const ROUTES_BY_CAPABILITY: Record<string, string[]> = {
  // Strategy & Positioning still has no service page, and that is still not an
  // omission. There is no strategy product to buy off a menu — it is where an
  // engagement starts, which is what the home page's own ordering says by
  // putting it first.
  //
  // 22 SEP 2026: it does now have a destination, and it is a DIFFERENT KIND of
  // destination, which is why it is not listed here. The service pages below
  // are eight peers of each other sitting under a capability; the diagnostic is
  // the capability itself, made usable. Putting it in this row would file it as
  // a ninth service page and would also make capability 01 the only one whose
  // "service" is the capability's own name. See FEATURED_LINK.
  "01": [],
  "02": ["social_media_marketing", "ads_ppc", "influencer_marketing", "pr"],
  "03": ["seo_and_content_marketing"],
  "04": ["lead_generation", "email_marketing"],
  "05": ["marketing_analytics_and_reporting"]
};

/** One destination per capability that is not a service page, carrying its own
 *  label because it is prose rather than a page title.
 *
 *  A RECORD RATHER THAN A FIELD ON THE FIVE, so a capability with nothing here
 *  renders nothing at all rather than an empty element — the same shape
 *  ROUTES_BY_CAPABILITY takes, and the same reason. Four of the five are
 *  absent from it today and that is the expected state, not a gap to fill: a
 *  featured link per capability would turn a single emphasis into a fifth row
 *  of furniture. */
const FEATURED_LINK: Record<string, { label: string; route: string }> = {
  "01": { label: DIAGNOSTIC_LINK_LABEL, route: DIAGNOSTIC_HREF }
};

export interface CapabilityGroup {
  index: string;
  title: string;
  body: string;
  services: { title: string; route: string }[];
  /** Absent for four of the five. See FEATURED_LINK. */
  featured?: { label: string; route: string };
}

// Built from the approved five, in their order. A capability with no service
// pages keeps its place: the five are the offer, and dropping one because it
// has nothing to link to would misrepresent the shape of the work.
export const capabilityGroups: CapabilityGroup[] = growthSystemData.items.map(
  item => ({
    index: item.index ?? "",
    title: item.title,
    body: item.body,
    featured: FEATURED_LINK[item.index ?? ""],
    services: (ROUTES_BY_CAPABILITY[item.index ?? ""] ?? [])
      .map(route => {
        const match = servicesData.find(service => service.route === route);
        return match ? { title: match.title, route: match.route } : null;
      })
      // A typo in a route above would otherwise render a link to nowhere.
      // Dropping the miss is the safe failure: a capability shows one fewer
      // service rather than the page shipping a dead link.
      .filter((service): service is { title: string; route: string } =>
        service !== null
      )
  })
);
