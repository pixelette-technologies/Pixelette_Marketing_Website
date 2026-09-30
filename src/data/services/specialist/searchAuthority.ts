import type { SpecialistPageConfig } from "./types";

// THE SEARCH & AUTHORITY SPECIALIST PAGE (30 Sep 2026).
//
// ONE PAGE, NOT FIVE. SEO, content, technical SEO, search-led digital PR and
// AI visibility are one connected system under Search & Authority, so they
// share this page and there is deliberately no separate route or menu item
// for any of them. The route keeps its old slug; only the name changed, from
// "SEO & Content Marketing".
//
// Every visible word below is the brief's, verbatim. The meta title and
// description follow the brief's preferred direction.
//
// WHAT CAME OFF, and why none of it was carried over: the "upticks in traffic
// to dominating search rankings" hero, the SEO-agency-for-growth line, a
// catalogue of SEO micro-services, the platform and tool lists, the
// technology-led-markets section with its SaaS / AI / Fintech / Web3
// mini-sections, "We manage. You grow.", the ecosystem logo strip, a
// testimonial and a generic FAQ set. The brief retires every one of those
// patterns; Industries owns market context.
//
// THE PR BOUNDARY. Search-led digital PR lives here, where the objective is
// organic authority. PR & Earned Media (Demand & Performance) owns coverage,
// reputation and launches. Neither page should sell the other's proposition.

export const seoContentAndAiVisibility: SpecialistPageConfig = {
  route: "seo_and_content_marketing",
  capability: "Search & Authority",
  label: "SEO, Content & AI Visibility",
  meta: {
    title: "SEO, Content & AI Visibility | Pixelette Marketing",
    description:
      "SEO, content and AI-search visibility designed to strengthen organic discovery, topic authority and meaningful search performance."
  },
  hero: {
    eyebrow: "Search & Authority / SEO, Content & AI Visibility",
    heading: {
      lead: "Build visibility that",
      accent: "becomes authority"
    },
    lead: "SEO, content and AI-search visibility designed to help the right people find you, understand your expertise and choose you with greater confidence."
  },
  earnsItsPlace: {
    eyebrow: "When this earns its place",
    heading: "Search works best when there is something worth finding",
    intro:
      "Search is not simply a rankings exercise. It earns its place when stronger discovery, clearer expertise or greater authority can influence a commercial decision.",
    items: [
      {
        title: "Buyers are searching, but you are difficult to find",
        body: "Relevant demand already exists, but competitors or other sources are capturing too much of it."
      },
      {
        title: "You are visible, but not authoritative",
        body: "You attract traffic, but the content does not demonstrate enough expertise, relevance or differentiation to create preference."
      },
      {
        title: "Discovery is changing",
        body: "Customers increasingly encounter brands through traditional search, AI-generated answers and other research environments, but your authority is not consistently represented across them."
      }
    ]
  },
  services: {
    eyebrow: "What we actually do",
    heading: "One connected search and authority system",
    intro:
      "Four focused areas replace the current catalogue of individual SEO services.",
    items: [
      {
        title: "Search strategy & technical foundations",
        body: "Search architecture, technical health, crawlability, indexing, site structure, intent analysis and prioritisation — so the fundamentals support discovery rather than obstruct it."
      },
      {
        title: "Content & topic authority",
        body: "Build useful content around genuine customer questions, commercial intent and subjects where the business has something credible and useful to contribute."
      },
      {
        title: "On-page search experience",
        body: "Improve priority pages so search systems can understand them and people can quickly understand why the business is relevant to the question or need that brought them there."
      },
      {
        title: "Authority building & AI visibility",
        body: "Strengthen relevant authority through credible references, search-led digital PR, entity signals and visibility within AI-assisted discovery where that visibility can be measured responsibly."
      }
    ]
  },
  measure: {
    eyebrow: "What we measure",
    heading: "Measure useful visibility, not rankings in isolation",
    body: "Rankings can be useful signals. The more important question is whether stronger visibility is bringing the right audience closer to a commercial decision.",
    metrics: [
      "Qualified organic visibility",
      "Priority-topic rankings",
      "Non-brand discovery",
      "Organic qualified actions",
      "Authority / link quality",
      "AI answer visibility where measurable"
    ]
  },
  // No `practice`: there is not yet enough service-specific search evidence.
  // "Work in practice" renders between measure and connections once there is.
  connections: {
    eyebrow: "How this connects",
    heading: "Search is rarely the whole problem",
    intro:
      "If visibility improves but the commercial problem remains, the constraint may sit somewhere else in the Pixelette system.",
    centre: "SEO, Content & AI Visibility",
    defaultIndex: 0,
    items: [
      {
        capability: "Strategy & Positioning",
        title: "People find you, but the proposition is unclear",
        body: "Search cannot compensate for an undifferentiated offer. If the reason to choose you is weak, more visibility may simply expose the problem to more people."
      },
      {
        capability: "Pipeline & Conversion",
        title: "Traffic exists, but the journey does not convert",
        body: "The constraint may sit after discovery. Landing pages, offers or conversion journeys may need fixing before more search traffic creates commercial value."
      },
      {
        capability: "Growth Intelligence",
        title: "Visibility is increasing, but contribution is unclear",
        body: "Measurement should connect search performance with the wider customer and commercial journey where the available data permits."
      }
    ]
  },
  process: {
    eyebrow: "How we work",
    heading: "Diagnose before producing more content",
    steps: [
      {
        title: "Diagnose",
        body: "Understand search visibility, technical foundations, content, competitors and existing authority."
      },
      {
        title: "Prioritise",
        body: "Identify the search opportunities and problems most likely to matter commercially."
      },
      {
        title: "Activate",
        body: "Fix foundations and build targeted content and authority around agreed priorities."
      },
      {
        title: "Improve",
        body: "Use search, audience and commercial signals to compound what works."
      }
    ]
  },
  goodLooksLike: {
    eyebrow: "What good looks like",
    heading: "What good Search & Authority should achieve",
    intro: "A clear standard for the work without pretending it is a case study.",
    points: [
      "Search systems can understand what the business does and where it has genuine expertise.",
      "Useful content maps to real customer questions and commercial intent rather than publishing for volume.",
      "Authority grows around priority subjects rather than isolated keywords.",
      "Increased visibility produces relevant discovery and measurable downstream action where the data permits.",
      "The business becomes increasingly discoverable across both traditional search and AI-assisted research environments."
    ]
  },
  cta: {
    heading: "Have a visibility problem worth solving?",
    body: "Start with what customers are trying to find — and whether your business deserves to be the answer.",
    label: "Build my growth plan"
  },
  // No heading: the shared "Useful questions" eyebrow is set as the heading
  // itself, which is the brief's heading. Setting both would print it twice.
  faqs: {
    items: [
      {
        question: "How long does SEO take?",
        answer:
          "Timing depends on the starting position, competition, technical condition, authority and the opportunity being pursued. The work should establish measurable leading indicators rather than promise a fixed ranking date."
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No. No credible provider controls search-engine outcomes. The work should improve the factors that make discovery, relevance and authority more likely while measuring what actually changes."
      },
      {
        question: "Do you create the content as well?",
        answer:
          "Where included in scope, yes. Content should be guided by customer need, search intent and genuine subject expertise rather than publication volume."
      },
      {
        question: "How do you approach AI-search visibility?",
        answer:
          "We focus on the underlying signals that make information useful, understandable and authoritative, while monitoring citations and visibility within AI-assisted discovery where measurement is credible."
      }
    ]
  }
};

export const searchAuthorityPages: SpecialistPageConfig[] = [
  seoContentAndAiVisibility
];
