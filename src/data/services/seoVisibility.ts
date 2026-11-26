import { navCta } from "@/data/navigation";
import { seoContentAndAiVisibility } from "@/data/services/specialist/searchAuthority";

// Locked SEO, Content & AI Visibility copy (22 Nov 2026 handoff).
// Meta stays the existing specialist title and description.
// Hero comparison wording follows the exact text reference.
// Measurement definitions are explanations, not client results.

export const seoVisibilityMeta = {
  title: seoContentAndAiVisibility.meta.title,
  description: seoContentAndAiVisibility.meta.description
};

export const seoVisibilityContent = {
  hero: {
    eyebrow: "SEO, content & AI visibility",
    heading: "Make your expertise easier to find —",
    headingRest: "in search and",
    headingEmphasis: "AI answers",
    lead: "Technical SEO, useful content and trusted authority that improves discovery, builds trust and generates enquiries.",
    query: "How do I choose the right technology partner?",
    disclaimer:
      "Illustrative discovery experiences · No ranking or citation claims"
  },
  search: {
    id: "search",
    kicker: "Traditional search",
    index: "01",
    blocks: [
      {
        title: "Choosing a technology partner",
        body: "What to look for: relevant expertise, project experience and delivery approach."
      },
      {
        title: "Questions to ask before you decide",
        body: "A practical guide to comparing your options with confidence."
      }
    ],
    tag: "Helpful guides and expert content"
  },
  ai: {
    id: "ai",
    kicker: "AI-assisted discovery",
    index: "02",
    body: "Compare a partner's experience, technical capability and approach to delivery. Look for useful evidence rather than unsupported claims.",
    sourcesLabel: "Illustrative source types",
    sources: [
      "Expert guide",
      "Relevant project evidence",
      "Independent references"
    ]
  },
  deliver: {
    heading: "What we deliver",
    caption: "Illustrative architecture",
    items: [
      {
        id: "search",
        node: "core",
        title: "Search strategy & technical\u00A0SEO",
        body: "A solid foundation for discovery."
      },
      {
        id: "content",
        node: "hub",
        title: "Content & topic authority",
        body: "Useful, relevant content that builds credibility."
      },
      {
        id: "onpage",
        node: "priority",
        title: "On-page optimisation",
        body: "Clear, relevant pages that convert interest."
      },
      {
        id: "authority",
        node: "related",
        title: "Authority & AI visibility",
        body: "Stronger signals across search and AI answers."
      }
    ],
    nodes: [
      { id: "core", label: "Core topics" },
      { id: "related", label: "Related topics" },
      { id: "hub", label: "Content hub" },
      { id: "priority", label: "Priority pages" }
    ],
    centre: "Your expertise"
  },
  measure: {
    heading: "What we measure",
    frame: "Visibility measurement framework",
    note: "Illustrative framework",
    items: [
      {
        id: "organic",
        title: "Organic discovery",
        hint: "Relevance and reach across search.",
        detail:
          "Relevant search visibility and visits from suitable audiences."
      },
      {
        id: "enquiries",
        title: "Qualified enquiries",
        hint: "Quality and intent of interest.",
        detail: "Actions from prospects with a relevant business need."
      },
      {
        id: "authority",
        title: "Topic authority",
        hint: "Recognition for your expertise.",
        detail:
          "Coverage and credible references around important subjects."
      },
      {
        id: "ai",
        title: "AI-answer visibility",
        hint: "Presence in AI-assisted search, where measurable.",
        detail:
          "Presence within AI-assisted discovery where observation is reliable."
      }
    ]
  },
  system: {
    headingLead: "Visibility works best when",
    headingEmphasis: "the whole system is clear",
    support:
      "The right strategy, content and channels working together to attract, engage and convert the right audience.",
    steps: ["Clear proposition", "Useful content", "Commercial journey"]
  },
  close: {
    heading: "Have a visibility challenge?",
    lead: "Tell us what you're trying to achieve and we'll explore the right approach.",
    cta: { label: "Discuss your project", href: navCta.to }
  },
  faqs: {
    heading: "Useful questions",
    items: [
      {
        question: "How does SEO and AI visibility work together?",
        answer:
          "They use the same foundations. Technical SEO, useful content and credible authority improve organic discovery, and those same signals make expertise easier to represent in AI-assisted answers where that visibility can be observed. Neither replaces the other, and neither is a guaranteed placement."
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Timing depends on the starting position, competition, technical condition, authority and the opportunity being pursued. The work should establish measurable leading indicators rather than promise a fixed ranking date."
      },
      {
        question: "Is this suitable for B2B and specialist sectors?",
        answer:
          "Yes, where buyers research before they choose. It suits B2B and specialist organisations that need clearer discovery around genuine expertise, priority subjects and on-page optimisation. It does not promise a fixed ranking timeline or a place in every AI answer."
      }
    ]
  }
};
