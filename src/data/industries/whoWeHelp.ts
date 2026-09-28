import type { ComponentType } from "react";
import {
  BagIcon,
  BarsIcon,
  ChipIcon,
  CoinsIcon,
  FactoryIcon,
  GraduationIcon,
  GroupIcon,
  HeartIcon,
  HouseIcon,
  SproutIcon,
  TowerIcon
} from "@/assets/sectors";
import { industriesData } from "./industriesData";

// WHO WE HELP — THE SITE'S ONE SECTOR TAXONOMY. 23 Sep 2026.
//
// Everything that describes the market Pixelette Marketing serves is read from
// this file: the home page's preview, the /industries hub and the Who We Help
// menu. Before this there were two taxonomies live at once — the home page's
// eight sector cards and an eleven-mark field on /industries that split
// technology three ways, listed Professional Services and B2B Services
// separately and filed "Startups & Scale-ups" as a market — and they had
// already disagreed with each other. One list, read everywhere, is the fix.
//
// THREE DIFFERENT CLAIMS, KEPT APART ON PURPOSE:
//
//   sectors          WHO WE HELP. The eight markets the company is built to
//                    work with. A statement of capability and target market,
//                    NOT of track record. Nothing here says "clients".
//   deeperExperience WHERE THE WIDER GROUP BRINGS MORE DEPTH. The five
//                    specialist pages. They sit inside two of the eight
//                    (Technology & Innovation, Financial Services) and are
//                    never presented as the boundary of the market.
//   stages           BUSINESS STAGE. Launch, scale, established. Maturity,
//                    not industry, which is why it is its own list and why
//                    "Startups" appears in none of the others.
//
// Evidence — the claim that work was actually done — lives on /results and
// nowhere in this file.

/** A heading broken across two lines, the second half in the brand tone.
 *
 *  The break is AUTHORED rather than left to text-wrap, because the heading is
 *  written as two sentences and the design breaks it at the full stop.
 *  `accent` is a colour treatment and nothing more, which is why it renders as
 *  a span and not an <em>. */
export interface SplitHeading {
  lead: string;
  tail: string;
  accent: string;
}

/** The chip tint behind a sector's mark. The values are --tone-*-tint and
 *  --tone-*-mark in _tokens.scss; read the note there before adding a hue. */
export type SectorTone =
  | "violet"
  | "rose"
  | "green"
  | "pink"
  | "amber"
  | "blue"
  | "indigo"
  | "teal";

/** One of the eight sectors. */
export interface SectorCard {
  title: string;
  body: string;
  icon: ComponentType;
  tone: SectorTone;
  /** Public path to the card's art, e.g. "/home/sectors/technology.webp".
   *
   *  OPTIONAL, AND ABSENT ON ALL EIGHT. No sector photography exists in this
   *  repository yet. A card with no `image` renders its tone wash in the same
   *  masked window, so the grid is complete today and gains its art by filling
   *  this field in. Nothing else has to change when the assets arrive. */
  image?: string;
}

/** One growth stage. The mark sits beside the text, not above it. */
export interface GrowthStage {
  title: string;
  body: string;
  icon: ComponentType;
}

/** One of the five deeper-experience areas, resolved from its sector page. */
export interface DeeperExperienceArea {
  label: string;
  line: string;
  href: string;
}

export const whoWeHelpHeading: SplitHeading = {
  lead: "Across sectors.",
  tail: "Built around",
  accent: "your market"
};

/** The eight. Reading order is the brief's; it carries no ranking. */
export const sectors: SectorCard[] = [
  {
    title: "Technology & Innovation",
    body: "Software, SaaS, AI, Web3 and emerging technology.",
    icon: ChipIcon,
    tone: "violet"
  },
  {
    title: "Financial Services",
    body: "Fintech, payments, banking, insurance and investment services.",
    icon: CoinsIcon,
    tone: "rose"
  },
  {
    title: "Healthcare & Wellness",
    body: "Health, care, wellness and health technology.",
    icon: HeartIcon,
    tone: "green"
  },
  {
    title: "Consumer & Retail",
    body: "Consumer brands, e-commerce, retail and lifestyle.",
    icon: BagIcon,
    tone: "pink"
  },
  {
    title: "Property & Real Estate",
    body: "Property, development, PropTech and related services.",
    icon: HouseIcon,
    tone: "amber"
  },
  {
    title: "Professional & B2B Services",
    body: "Consultancies, legal, recruitment and business services.",
    icon: GroupIcon,
    tone: "blue"
  },
  {
    title: "Education & Learning",
    body: "Education, training and EdTech.",
    icon: GraduationIcon,
    tone: "indigo"
  },
  {
    title: "Industrial & Commercial",
    body: "Manufacturing, engineering, logistics and other commercial operations.",
    icon: FactoryIcon,
    tone: "teal"
  }
];

// --- The home page's preview ------------------------------------------------
// Establishes breadth and hands off. The fuller explanation — the unlisted
// sector, the deeper experience and the stages — is on /industries only.
//
// "AND BEYOND" IS GONE AS A NINTH CARD, on instruction. It sat in the grid as
// though it were a ninth industry. Its job is done by the hub's "Don't see
// your sector?" block, one click away, and by the CTA here.

export const whoWeHelpPreview = {
  eyebrow: "Who we help",
  heading: whoWeHelpHeading,
  lead: "Pixelette Marketing is built to work with businesses across established and emerging sectors. We shape the strategy around your audience, proposition, buying journey, commercial model and growth ambition.",
  cta: { label: "Explore who we help", to: "/industries" }
};

// --- The /industries hub ------------------------------------------------------
// The URL stays /industries: it is indexed, it is in the sitemap and nothing
// is gained by moving it. The label everywhere is "Who we help".

export const whoWeHelpPage = {
  eyebrow: "Who we help",
  heading: whoWeHelpHeading,
  lead: "Pixelette Marketing is built to work with businesses across established and emerging sectors. We don't apply a sector template. We shape the strategy around your audience, proposition, buying journey, commercial model and growth ambition.",
  aside: "Different markets. One principle: understand before we act.",
  unlisted: {
    heading: "Don't see your sector?",
    body: "Our approach isn't limited to the markets above. We start by understanding your customer, commercial model, buying journey and growth challenge — then build the marketing approach around them.",
    cta: { label: "Talk to us about your market", to: "/contactus" }
  },
  deeper: {
    eyebrow: "Deeper experience",
    heading: "Deeper experience in technology-led markets",
    body: "Our wider experience gives us additional depth in markets where complex products, emerging technology, trust and technical buying journeys shape how marketing needs to work."
  },
  stagesBand: {
    eyebrow: "Stage, not sector",
    heading: "Built for different stages of growth",
    body: "Every business is at a different stage. We tailor our approach to your goals, resources and market, helping you build momentum at every step.",
    cta: { label: "Build my growth plan", to: "/contactus" }
  }
};

/** Launch, scale, established. The 8 Sep brief's wording, moved here from the
 *  home page on 23 Sep when the home section became a preview of this page. */
export const stages: GrowthStage[] = [
  {
    title: "Launch",
    body: "Find the position. Build the message. Create demand. Prove the first channels.",
    icon: SproutIcon
  },
  {
    title: "Scale",
    body: "Increase qualified pipeline. Improve conversion. Systemise repeatable growth.",
    icon: BarsIcon
  },
  {
    title: "Established & Enterprise",
    body: "Strengthen authority, attribution, channel coordination and alignment with more complex buying and sales journeys.",
    icon: TowerIcon
  }
];

// --- Deeper experience ------------------------------------------------------
// The five specialist pages, in the brief's order. The Who We Help menu and
// the /industries cards both read THIS list, so the two cannot drift the way
// the What We Do menu and /services once did.

export const DEEPER_EXPERIENCE_ROUTES = ["ai", "fintech", "saas", "tech", "web_3"];

/** Resolved against industriesData, and it FAILS THE BUILD on a miss: a
 *  typo here would otherwise drop a specialist page from the menu and the hub
 *  at once, silently. */
export const deeperExperience: DeeperExperienceArea[] =
  DEEPER_EXPERIENCE_ROUTES.map(route => {
    const page = industriesData.find(industry => industry.route === route);
    if (!page) {
      throw new Error(
        `Deeper experience references an unknown sector page: "${route}".`
      );
    }
    return {
      label: page.label,
      line: page.hubLine,
      href: `/industries/${page.route}`
    };
  });
