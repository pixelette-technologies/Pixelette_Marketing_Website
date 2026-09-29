import type { ComponentType } from "react";
import {
  BagIcon,
  ChipIcon,
  CoinsIcon,
  FactoryIcon,
  GraduationIcon,
  GroupIcon,
  HeartIcon,
  HouseIcon
} from "@/assets/sectors";

// INDUSTRIES — THE SITE'S ONE MARKET TAXONOMY. 29 Sep 2026.
//
// Replaces data/industries/whoWeHelp.ts. The locked information architecture
// of 29 Sep retires "Who we help" as page and navigation terminology; the page
// is Industries, and this file is everything it and the home page's teaser
// read.
//
// THE EIGHT ARE LOCKED. Do not narrow them to SaaS, Fintech, Web3, AI or
// "Manufacturing alone" — those sit inside the broad categories. Reading order
// is the specification's and carries no ranking.
//
// WHAT THE PAGE ANSWERS: how does Pixelette's approach adapt to a market? NOT:
// how many clients has Pixelette served in it? So every line below describes
// the market and the approach, and none claims a client, a track record or a
// figure. "Built to support", never "clients in".
//
// THE market / challenge / approach LINES ARE AUTHORED HERE, not supplied.
// The specification asks for all three per industry and writes none of them;
// they are drafted to its rules (concise, no statistics, no implied
// experience) and have not been seen by management.
//
// WHAT WENT WITH whoWeHelp.ts: the "Deeper experience" list of five specialist
// pages (barred from Industries by the same specification — the routes
// themselves stay), the business stages, and "Don't see your sector?". The
// Industries page has four chapters and none of those is one of them.

/** The tint behind an industry's mark. The values are --tone-*-tint and
 *  --tone-*-mark in _tokens.scss; read the note there before adding a hue. */
export type IndustryTone =
  | "violet"
  | "rose"
  | "green"
  | "pink"
  | "amber"
  | "blue"
  | "indigo"
  | "teal";

export interface Industry {
  /** Stable key for ids and anchors. */
  id: string;
  name: string;
  /** One line of scope: what sits inside the category. */
  scope: string;
  icon: ComponentType;
  tone: IndustryTone;
  /** What is commercially distinctive about the market. */
  market: string;
  /** The marketing challenge that follows from it. */
  challenge: string;
  /** How Pixelette would approach it, in the five capabilities' terms. */
  approach: string;
}

export const industries: Industry[] = [
  {
    id: "technology",
    name: "Technology & Innovation",
    scope: "Software, SaaS, AI, Web3 and emerging technology",
    icon: ChipIcon,
    tone: "violet",
    market:
      "Products change quickly, categories are crowded and buyers often need a product explained before they can compare it.",
    challenge:
      "Making a complex or new product easy to understand, and credible to technical and commercial buyers alike.",
    approach:
      "Sharpen the positioning first, then build search authority, content and demand around the problem the product solves."
  },
  {
    id: "financial",
    name: "Financial Services",
    scope: "Fintech, payments, banking, insurance and investment services",
    icon: CoinsIcon,
    tone: "rose",
    market:
      "Trust is part of the product, regulation shapes what can be said and buyers take their time.",
    challenge:
      "Standing out in a cautious, closely regulated market without overpromising.",
    approach:
      "Clear, careful messaging, authority content and nurture journeys that build confidence across a longer decision."
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    scope: "Health, care, wellness and health technology",
    icon: HeartIcon,
    tone: "green",
    market:
      "Decisions are personal, evidence matters and more than one person often shapes the choice.",
    challenge:
      "Reaching the right audience with messaging that is sensitive, accurate and credible.",
    approach:
      "Careful positioning, genuinely useful content and search visibility that earn trust before asking for action."
  },
  {
    id: "consumer",
    name: "Consumer & Retail",
    scope: "Consumer brands, e-commerce, retail and lifestyle",
    icon: BagIcon,
    tone: "pink",
    market:
      "Attention moves quickly, choice is wide and the path from discovery to purchase can be short.",
    challenge:
      "Being noticed and remembered when every brand is competing for the same moment.",
    approach:
      "Distinctive positioning, social and paid demand, and conversion journeys built to turn interest into sales."
  },
  {
    id: "property",
    name: "Property & Real Estate",
    scope: "Property, development, PropTech and related services",
    icon: HouseIcon,
    tone: "amber",
    market:
      "High-value decisions, long consideration and markets that are often local.",
    challenge:
      "Staying visible and trusted for as long as a buyer takes to decide.",
    approach:
      "Local search, targeted campaigns and lead nurture that keep the right buyers engaged until they are ready."
  },
  {
    id: "professional",
    name: "Professional & B2B Services",
    scope: "Consultancies, legal, recruitment and business services",
    icon: GroupIcon,
    tone: "blue",
    market:
      "Buyers are choosing expertise and a relationship, usually with several stakeholders involved.",
    challenge:
      "Showing expertise without sounding like every other firm, and turning reputation into qualified pipeline.",
    approach:
      "Thought leadership, search authority and pipeline programmes that connect credibility to sales conversations."
  },
  {
    id: "education",
    name: "Education & Learning",
    scope: "Education, training and EdTech",
    icon: GraduationIcon,
    tone: "indigo",
    market:
      "Enrolment follows the calendar, and learners, parents and employers can all influence the decision.",
    challenge:
      "Reaching learners at the right moment and helping them choose with confidence.",
    approach:
      "Search and content built around the questions learners ask, with campaigns and nurture timed to intake."
  },
  {
    id: "industrial",
    name: "Industrial & Commercial",
    scope: "Manufacturing, engineering, logistics and commercial operations",
    icon: FactoryIcon,
    tone: "teal",
    market:
      "Technical products, specialist buyers and sales built on specification and trust.",
    challenge:
      "Translating technical capability into commercial value for engineers, procurement and decision-makers.",
    approach:
      "Clear value propositions, specialist content and lead generation that support a considered, multi-stage sale."
  }
];

/** The three labels each industry's stage uses, in reading order. */
export const industryLabels = {
  market: "The market",
  challenge: "The challenge",
  approach: "Our approach"
} as const;

// --- /industries ------------------------------------------------------------
// Four chapters and no others: hero, the interactive experience, Work in
// practice, the final call to action. The URL stays /industries.
//
// The hero's final art direction is to follow separately; this is the
// structure and the specification's words. No full stops on the headings.

export const industriesPage = {
  hero: {
    eyebrow: "Industries",
    headline: { lead: "Different markets", accent: "Different dynamics" },
    principle: "One principle: understand before we act",
    lead: "Every market behaves differently. Pixelette adapts the marketing approach around the market, audience, buying journey and commercial challenge."
  },
  explorer: {
    eyebrow: "Eight markets",
    heading: "Choose a market to see how the thinking changes"
  },
  work: {
    eyebrow: "Work in practice",
    heading: "What changed after the work started"
  },
  close: {
    heading: { lead: "Your market. Your challenge.", accent: "Let's work out what needs to move" },
    // One button. The specification offers "Talk to our team" as a secondary
    // "if appropriate"; it would go to the same /contactus as the primary, so
    // two controls would ask one question twice.
    cta: { label: "Build my growth plan", to: "/contactus" }
  }
};

/** The anchor Work in practice sits under, so the home page's proof teaser can
 *  land on it directly. */
export const WORK_IN_PRACTICE_ID = "work-in-practice";

// --- The home page's teaser -------------------------------------------------
// Acknowledges breadth and routes to /industries. No cards beneath it, on
// instruction: the eight live on the Industries page only.

export const industriesTeaser = {
  eyebrow: "Industries",
  heading: "Different markets need different thinking",
  lead: "From technology and financial services to healthcare, consumer markets and professional services, we adapt the strategy to the market rather than forcing the market into a template.",
  cta: { label: "Explore industries", to: "/industries" }
};
