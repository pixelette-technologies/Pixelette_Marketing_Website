import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";

export interface NavItem {
  route: string;
  title: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// The navigation the 8 September 2026 brief specifies.
//
// URLS DO NOT MOVE. The brief renames the top-level labels — Services becomes
// "What We Do", Industries becomes "Who We Help", Blogs becomes "Insights" —
// but it specifies labels, never paths. Renaming /services and /industries
// would mean redirects, canonicals, sitemap and breadcrumb schema changes
// across thirteen indexed pages to buy nothing a visitor can see. So the
// labels change and the routes stay.
//
// THE FIVE CAPABILITIES ARE GROUP LABELS, NOT PAGES. The brief is explicit
// that the individual service pages remain underneath them for search intent,
// so the dropdown groups the eight existing pages under the capability they
// belong to rather than inventing five new landing pages.

/** Looks up routes in a source list and FAILS THE BUILD on a miss.
 *
 *  A typo here would otherwise silently drop a link from the navigation, which
 *  is the kind of fault nobody notices until traffic does. */
function pick(routes: string[], source: readonly NavItem[]): NavItem[] {
  return routes.map(route => {
    const found = source.find(entry => entry.route === route);
    if (!found) {
      throw new Error(
        `Navigation references an unknown route: "${route}". ` +
          `Known routes: ${source.map(entry => entry.route).join(", ")}`
      );
    }
    return { route: found.route, title: found.title };
  });
}

// Two of the brief's groups are NOT rendered, and the omissions are the same
// judgement in both places: "Strategy & Positioning" has no service page, and
// Launch / Scale / Established & Enterprise have no stage pages. A dropdown
// group with no destinations under it is a dead label, and the house content
// rule is to ship the pattern without the missing element rather than invent
// one to fill it.
//
// Neither capability is lost — both are sold on the homepage, in the Growth
// System and in Who We Help. They join the navigation when there is somewhere
// for them to point.
export const whatWeDoGroups: NavGroup[] = [
  {
    label: "Demand & Performance",
    items: pick(
      ["social_media_marketing", "ads_ppc", "influencer_marketing", "pr"],
      servicesData
    )
  },
  {
    label: "Search & Authority",
    items: pick(["seo_and_content_marketing"], servicesData)
  },
  {
    label: "Pipeline & Conversion",
    items: pick(["lead_generation", "email_marketing"], servicesData)
  },
  {
    label: "Growth Intelligence",
    items: pick(["marketing_analytics_and_reporting"], servicesData)
  }
];

export const whoWeHelpGroups: NavGroup[] = [
  {
    label: "Selected sector experience",
    items: pick(["ai", "fintech", "web_3", "saas", "tech"], industriesData)
  }
];

/** The brief's primary navigation button. Same label as the hero, which the
 *  brief is explicit about: mixing CTA labels between positions is worse than
 *  either label alone. */
export const navCta = { label: "Build my growth plan", to: "/contactus" };
