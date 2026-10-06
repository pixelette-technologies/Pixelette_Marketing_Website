import { capabilityGroups } from "@/data/services/capabilityGroups";
import { servicesData } from "@/data/services/servicesData";

export interface NavItem {
  /** An absolute path. Items under one group no longer share a parent route —
   *  see the Strategy & Positioning group below — so each carries its own. */
  href: string;
  title: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// The navigation. First specified by the 8 September 2026 brief; LOCKED on
// 29 Sep 2026 as What we do / Industries / About / Insights / Contact plus
// "Build my growth plan", and reordered on 30 Sep 2026 by the About page brief
// to What we do / Industries / Insights / About / Contact. The links
// themselves are in Navbar.tsx. Do not add a top-level item without an
// instruction.
//
// URLS DO NOT MOVE. The labels have changed more than once — Services became
// "What we do", Industries became "Who We Help" and on 29 Sep became
// Industries again, Blogs became "Insights" — but no instruction has ever
// specified a path. Renaming /services and /industries
// would mean redirects, canonicals, sitemap and breadcrumb schema changes
// across thirteen indexed pages to buy nothing a visitor can see. So the
// labels change and the routes stay.
//
// THE FIVE CAPABILITIES ARE GROUP LABELS, NOT PAGES. The brief is explicit
// that the individual service pages remain underneath them for search intent,
// so the dropdown groups the existing pages under the capability they belong
// to rather than inventing five new landing pages.
//
// 22 SEP 2026: THE DROPDOWN IS NOW DERIVED FROM /services, NOT RESTATED.
// It used to hold its own copy of the mapping — four labels and eight routes,
// typed out a second time — and the two drifted the moment the hub gained a
// fifth block. The hub showed five capabilities and the dropdown showed four,
// because "Strategy & Positioning" had had nothing to point at when this file
// was written and the dropdown was never revisited when the diagnostic shipped.
//
// capabilityGroups is the same source the /services page renders, so the
// dropdown is now that page's contents by construction: same five labels, same
// order, same links beneath each. A capability can no longer appear in one and
// not the other.

export const whatWeDoGroups: NavGroup[] = capabilityGroups.map(group => ({
  label: group.title,
  items: [
    // The capability's own destination, where it has one, ahead of the service
    // pages filed under it. Today that is Strategy & Positioning and only
    // Strategy & Positioning: it is the one capability sold as itself rather
    // than through a service page beneath it.
    //
    // IT TAKES THE PAGE'S TITLE, NOT THE HUB'S LINK LABEL. On /services the
    // link reads "Explore our Strategy & Positioning Diagnostic →", which is a
    // sentence sitting in a block of prose. Its siblings here are page titles
    // in a list of page titles, and a sentence among them would read as a
    // promotion rather than a destination.
    ...(group.featured
      ? [{ href: group.featured.route, title: "The Diagnostic" }]
      : []),
    ...group.services.map(service => ({
      href: `/services/${service.route}`,
      title: service.title
    }))
  ]
}))
  // A capability with no destinations at all is a dead label — the house rule
  // is to ship the pattern without the missing element rather than invent one
  // to fill it. None of the five is empty today; this is what keeps the
  // dropdown honest if a sixth capability is approved before it has anywhere
  // to point.
  .filter(group => group.items.length > 0);

// EVERY SERVICE PAGE MUST BE REACHABLE FROM THE DROPDOWN. The old `pick` call
// for this menu listed the eight routes by hand and threw on a typo; deriving
// the menu instead means a route that falls out of the mapping falls out of the
// navigation silently, which is the exact fault that check existed to prevent.
// So the guarantee is restated as a count, which catches more than the typo
// did: a new service page added to servicesData and never filed under a
// capability fails the build too, rather than shipping unreachable.
const linkedServices = whatWeDoGroups
  .flatMap(group => group.items)
  .filter(item => item.href.startsWith("/services/")).length;

if (linkedServices !== servicesData.length) {
  throw new Error(
    `The What We Do dropdown links ${linkedServices} service pages but ` +
      `${servicesData.length} exist. Every service page must sit under a ` +
      `capability — check ROUTES_BY_CAPABILITY in data/services/capabilityGroups.ts.`
  );
}

// --- 29 Sep 2026: Industries is a plain link ------------------------------------
// The Who We Help menu is gone with the label. Its only group was "Deeper
// experience", the five specialist pages, and the locked information
// architecture removes Deeper experience from the navigation and from
// /industries alike. Industries links to its page and opens no panel. The
// five routes stay live; their linking is to be reviewed separately.

/** The brief's primary navigation button. Same label as the hero, which the
 *  brief is explicit about: mixing CTA labels between positions is worse than
 *  either label alone. */
export const navCta = { label: "Build my growth plan", to: "/contactus" };
