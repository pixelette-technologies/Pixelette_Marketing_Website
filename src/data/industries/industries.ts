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
// WHAT THE PAGE ANSWERS: how does Pixelette's thinking change with a market?
// NOT: how many clients has Pixelette served in it? So every line below
// describes the market and the approach, and none claims a client, a track
// record, a specialism or a figure. "Markets we can support", never
// "industries we specialise in".
//
// 30 Sep 2026: EVERY LINE BELOW IS NOW SUPPLIED, by the final Industries
// implementation brief — descriptor, the five journey stages, market,
// challenge and approach, verbatim. The 29 Sep drafts they replace were
// authored here and never seen by management. Change none of it without an
// instruction.
//
// THE SECTOR ICONS AND TONES WENT THE SAME DAY. The brief makes the Market
// journey the visual device and removes the small decorative icon; the eight
// tone pairs only ever tinted that icon. The drawings stay in assets/sectors.
//
// WHAT WENT WITH whoWeHelp.ts: the "Deeper experience" list of five specialist
// pages (barred from Industries by the same specification — the routes
// themselves stay), the business stages, and "Don't see your sector?". The
// Industries page has four chapters and none of those is one of them.

/** Five stages, always five: the journey draws five nodes on one line. */
export type MarketJourney = readonly [string, string, string, string, string];

export interface Industry {
  /** Stable key for ids and anchors. */
  id: string;
  name: string;
  /** One line: what sits inside the category. */
  descriptor: string;
  /** How a buyer in this market moves towards a decision. Not a funnel. */
  journey: MarketJourney;
  /** What is commercially distinctive about the market. */
  market: string;
  /** The marketing challenge that follows from it. */
  challenge: string;
  /** How Pixelette would approach it. */
  approach: string;
}

export const industries: Industry[] = [
  {
    id: "technology",
    name: "Technology & Innovation",
    descriptor: "Software, SaaS, AI, Web3 and emerging technology",
    journey: [
      "Problem",
      "Understand",
      "Technical confidence",
      "Commercial buy-in",
      "Decision"
    ],
    market:
      "Products and categories can change quickly, and buyers may need to understand something new before they can compare alternatives.",
    challenge:
      "Make complex or unfamiliar products easy to understand without removing the substance technical and commercial buyers need to trust them.",
    approach:
      "Clarify positioning first, build authority around the problem the product solves, then connect search, content and demand around the buying journey."
  },
  {
    id: "financial",
    name: "Financial Services",
    descriptor: "Financial products, platforms and regulated services",
    journey: ["Need", "Trust", "Evidence", "Risk confidence", "Decision"],
    market:
      "Buyers often weigh financial value alongside credibility, security, regulation and long-term confidence in the provider.",
    challenge:
      "Build confidence without becoming generic, and explain complex offers clearly enough for both commercial and compliance-sensitive audiences.",
    approach:
      "Lead with credibility, evidence and clarity, then use authority, education and targeted demand to reduce perceived risk throughout the journey."
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    descriptor: "Health, wellness and care-related services",
    journey: ["Need", "Reassurance", "Evidence", "Confidence", "Action"],
    market:
      "Decisions can be personal, high-stakes and influenced by evidence, reputation, accessibility and confidence in the provider.",
    challenge:
      "Communicate benefits clearly without overclaiming, while helping different audiences feel informed and reassured.",
    approach:
      "Prioritise clarity, responsible evidence and strong confidence signals, then connect useful content and demand activity to the specific decision journey."
  },
  {
    id: "consumer",
    name: "Consumer & Retail",
    descriptor: "Consumer brands, ecommerce and retail",
    journey: ["Attention", "Relevance", "Preference", "Purchase", "Repeat"],
    market:
      "Choice is abundant, attention is limited and buying decisions can happen quickly across multiple touchpoints.",
    challenge:
      "Create enough relevance and distinctiveness to turn short attention into preference and action.",
    approach:
      "Sharpen the reason to choose, create demand around meaningful audience moments, and remove friction between discovery, purchase and repeat behaviour."
  },
  {
    id: "property",
    name: "Property & Real Estate",
    descriptor: "Property, development and related services",
    journey: ["Need", "Explore", "Confidence", "Proof", "Decision"],
    market:
      "Buying cycles can be long, high-value and shaped by location, confidence, timing and the quality of information available.",
    challenge:
      "Maintain confidence and momentum across a journey that may involve multiple stakeholders and extended consideration.",
    approach:
      "Build clear positioning and searchable authority, then support the decision journey with evidence, useful content and well-timed conversion points."
  },
  {
    id: "professional",
    name: "Professional & B2B Services",
    descriptor: "Consultancies, agencies and specialist B2B providers",
    journey: [
      "Problem",
      "Expertise",
      "Consensus",
      "Commercial case",
      "Decision"
    ],
    market:
      "Buyers are often purchasing expertise they cannot fully evaluate before engagement, with multiple stakeholders involved.",
    challenge:
      "Turn invisible expertise into something buyers can understand, believe and justify internally.",
    approach:
      "Make the expertise and difference explicit, build authority around high-value problems, and create content and demand that support stakeholder consensus."
  },
  {
    id: "education",
    name: "Education & Learning",
    descriptor: "Education, training and learning products",
    journey: ["Need", "Fit", "Confidence", "Commitment", "Outcome"],
    market:
      "Decisions may involve learners, parents, employers or institutions, each with different definitions of value and success.",
    challenge:
      "Explain fit, credibility and outcomes clearly while reducing uncertainty around commitment, quality and relevance.",
    approach:
      "Clarify the value for each decision-maker, build authority through useful educational content and create journeys that move interest towards confident enrolment."
  },
  {
    id: "industrial",
    name: "Industrial & Commercial",
    descriptor: "Industrial, manufacturing and commercial markets",
    journey: [
      "Requirement",
      "Capability",
      "Technical proof",
      "Commercial confidence",
      "Decision"
    ],
    market:
      "Purchases can be technical, high-value and relationship-driven, with long sales cycles and formal procurement requirements.",
    challenge:
      "Make capability easy to verify while supporting both technical evaluation and the commercial case for change.",
    approach:
      "Lead with proof, technical authority and clear commercial value, then support complex buying groups with targeted content, search and demand activity."
  }
];

/** The labels each market's panel uses, in reading order. */
export const industryLabels = {
  journey: "Market journey",
  market: "The market",
  challenge: "The challenge",
  approach: "Our approach"
} as const;

// --- /industries ------------------------------------------------------------
// Four chapters and no others: hero, the interactive explorer, Work in
// practice, the final call to action. The URL stays /industries.
//
// 30 Sep 2026: the final brief's words. No hero image, on instruction — the
// explorer directly beneath is the page's visual. No full stops on headings.

export const industriesPage = {
  hero: {
    eyebrow: "Industries",
    headline: { lead: "Different markets", accent: "Different dynamics" },
    principle: "Understand before we act",
    lead: "Every market behaves differently. Pixelette adapts the marketing approach around the audience, buying journey, competitive environment and commercial challenge."
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
