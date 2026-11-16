import { servicesData } from "@/data/services/servicesData";

export interface NavItem {
  href: string;
  title: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// 12 Nov 2026 developer brief §4.3 — What we do mega-menu.
// Labels are the brief's. Destinations are the existing URLs from §4.1.
export const whatWeDoGroups: NavGroup[] = [
  {
    label: "Brand and Strategy",
    items: [{ href: "/strategy-positioning", title: "The Diagnostic" }]
  },
  {
    label: "Creative and Campaigns",
    items: [
      {
        href: "/services/influencer_marketing",
        title: "Influencer & Partnerships"
      }
    ]
  },
  {
    label: "Communications and Engagement",
    items: [
      {
        href: "/services/social_media_marketing",
        title: "Social & Community"
      },
      { href: "/services/pr", title: "PR & Earned Media" },
      { href: "/services/email_marketing", title: "Email Marketing" }
    ]
  },
  {
    label: "Digital Visibility and Growth",
    items: [
      {
        href: "/services/seo_and_content_marketing",
        title: "SEO, Content & AI Visibility"
      },
      { href: "/services/ads_ppc", title: "Paid Media & PPC" },
      { href: "/services/lead_generation", title: "Lead Generation" }
    ]
  },
  {
    label: "Measurement and Insight",
    items: [
      {
        href: "/services/marketing_analytics_and_reporting",
        title: "Marketing Analytics & Measurement"
      }
    ]
  }
];

const linkedServices = whatWeDoGroups
  .flatMap(group => group.items)
  .filter(item => item.href.startsWith("/services/")).length;

if (linkedServices !== servicesData.length) {
  throw new Error(
    `The What We Do dropdown links ${linkedServices} service pages but ` +
      `${servicesData.length} exist. Every service page must sit under a ` +
      `capability — check whatWeDoGroups in data/navigation.ts.`
  );
}

// 12 Nov 2026 developer brief §4.3 — Public sector mega-menu.
export const publicSectorGroups: NavGroup[] = [
  {
    label: "",
    items: [
      { href: "/public-sector", title: "Public and civic overview" },
      {
        href: "/public-sector/campaign-evaluation",
        title: "Campaign evaluation"
      },
      {
        href: "/public-sector/campaigns-and-public-awareness",
        title: "Campaigns and public awareness"
      },
      {
        href: "/public-sector/digital-communications",
        title: "Digital communications"
      },
      {
        href: "/public-sector/community-engagement",
        title: "Community engagement"
      },
      {
        href: "/public-sector/internal-and-change-communications",
        title: "Internal and change communications"
      },
      {
        href: "/public-sector/education-marketing",
        title: "Education marketing"
      },
      { href: "/public-sector/how-to-buy", title: "How to buy from us" },
      {
        href: "/public-sector/demonstrations",
        title: "Demonstration work"
      }
    ]
  }
];

/** The five capability group names for the footer Services column. */
export const footerCapabilityGroups = [
  "Brand and Strategy",
  "Creative and Campaigns",
  "Communications and Engagement",
  "Digital Visibility and Growth",
  "Measurement and Insight"
] as const;

export const navCta = { label: "Build my growth plan", to: "/contactus" };
