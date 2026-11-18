import { growthSystemData } from "@/data/home";
import { DIAGNOSTIC_HREF } from "@/data/strategy";
import { servicesData } from "./servicesData";

// 12 Nov 2026 developer brief §4.1 — reparenting.
// Titles and bodies still come from growthSystemData. This file owns the
// mapping of which existing service page sits under which new group.
const ROUTES_BY_CAPABILITY: Record<string, string[]> = {
  "01": [],
  "02": ["influencer_marketing"],
  "03": ["social_media_marketing", "pr", "email_marketing"],
  "04": ["seo_and_content_marketing", "ads_ppc", "lead_generation"],
  "05": ["marketing_analytics_and_reporting"]
};

// Same destination as the What we do mega-menu under Brand and Strategy.
// The diagnostic page keeps its own "Strategy & Positioning" wording; this
// link must not revive the old capability group name on /services.
const FEATURED_LINK: Record<string, { label: string; route: string }> = {
  "01": { label: "The Diagnostic →", route: DIAGNOSTIC_HREF }
};

export interface CapabilityGroup {
  index: string;
  title: string;
  body: string;
  scope: string[];
  services: { title: string; route: string }[];
  featured?: { label: string; route: string };
}

export const capabilityGroups: CapabilityGroup[] = growthSystemData.items.map(
  item => ({
    index: item.index ?? "",
    title: item.title,
    body: item.body,
    scope: (item.capabilities ?? []).map(
      entry => entry.charAt(0).toUpperCase() + entry.slice(1)
    ),
    featured: FEATURED_LINK[item.index ?? ""],
    services: (ROUTES_BY_CAPABILITY[item.index ?? ""] ?? [])
      .map(route => {
        const match = servicesData.find(service => service.route === route);
        return match ? { title: match.title, route: match.route } : null;
      })
      .filter((service): service is { title: string; route: string } =>
        service !== null
      )
  })
);
