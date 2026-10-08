import blogsData from "@/data/blogs/blogsData";
import {
  DIAGNOSTIC_ANCHOR,
  DIAGNOSTIC_HREF,
  diagnosticQuestions,
  strategyHero
} from "@/data/strategy";

// /blog-list, the Insights page: the editorial layer, 30 Sep 2026, to the final
// Insights brief ("a shop window for Pixelette Marketing's thinking").
//
// THE ARTICLES THEMSELVES STAY IN blogsData.ts. This file only says how the
// Insights page presents them: which of the five capabilities (or Market
// signals) each one files under, which of the four editorial formats it is,
// and a one-line summary short enough for a card. Nothing here is a new
// article, a new author or a new figure.
//
// Every summary below restates the article's own argument; none of them adds
// a claim the article does not make.

export const INSIGHT_FILTERS = [
  "Strategy & positioning",
  "Demand & performance",
  "Search & authority",
  "Pipeline & conversion",
  "Growth intelligence",
  "Market signals"
] as const;

export type InsightFilter = (typeof INSIGHT_FILTERS)[number];

/** The brief's four internal formats. Guide is the brief's fourth card format;
 *  Tool is reserved for Try the thinking and never files an article. */
export type InsightFormat = "Point of view" | "Playbook" | "Guide" | "Signal";

type Editorial = {
  capability: InsightFilter;
  format: InsightFormat;
  summary: string;
};

const editorial: Record<number, Editorial> = {
  1: {
    capability: "Market signals",
    format: "Guide",
    summary:
      "Where the UK financial-promotion line sits, and how to market boldly inside it."
  },
  2: {
    capability: "Demand & performance",
    format: "Playbook",
    summary:
      "Paid is gated for most Web3 products. Build the reach an ad policy cannot switch off."
  },
  3: {
    capability: "Growth intelligence",
    format: "Guide",
    summary:
      "Five numbers that decide where the next pound goes, and the ones that only reassure."
  },
  4: {
    capability: "Search & authority",
    format: "Point of view",
    summary:
      "If an assistant cannot quote your page accurately, the shortlist is made without you."
  },
  5: {
    capability: "Strategy & positioning",
    format: "Playbook",
    summary:
      "Five checks worth running before the next increase. None of them is about the budget."
  }
};

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

// "22 September 2026" → a sortable number. Parsed by hand rather than through
// Date(), whose reading of free-form strings differs between engines.
function dateKey(date: string): number {
  const [day, month, year] = date.trim().split(/\s+/);
  const m = MONTHS.indexOf(month?.toLowerCase() ?? "");
  if (m < 0) throw new Error(`Insights cannot read the date "${date}".`);
  return Number(year) * 10000 + (m + 1) * 100 + Number(day);
}

const WORDS_PER_MINUTE = 220;

export type Insight = {
  id: number;
  href: string;
  title: string;
  deck: string;
  summary: string;
  capability: InsightFilter;
  format: InsightFormat;
  date: string;
  readMinutes: number;
  /** The article's own section count, closing section excluded. The editorial
   *  marks draw their structure from it, so no two cards are decoration. */
  sections: number;
};

const posts = blogsData.flatMap(group => group.data);

export const insights: Insight[] = posts
  .map(post => {
    const meta = editorial[post.id];
    // A post without an editorial entry fails the build, the same guarantee
    // blogsData gives its categories: the page never shows an unfiled card.
    if (!meta) throw new Error(`Insight ${post.id} has no editorial entry.`);
    const text = [
      post.description,
      ...post.dataContent.map(s => `${s.titleOne} ${s.titleTwo} ${s.description}`)
    ].join(" ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return {
      id: post.id,
      href: `/blog/${post.id}`,
      title: post.heading,
      deck: post.description,
      summary: meta.summary,
      capability: meta.capability,
      format: meta.format,
      date: post.updateDate,
      readMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      sections: post.dataContent.filter(
        s => !s.titleOne.startsWith("Work with")
      ).length
    };
  })
  .sort((a, b) => dateKey(b.date) - dateKey(a.date) || b.id - a.id);

const byId = (id: number): Insight => {
  const found = insights.find(item => item.id === id);
  if (!found) throw new Error(`Insights refers to a missing article: ${id}.`);
  return found;
};

// --- 01 Hero ------------------------------------------------------------------

export const insightsHero = {
  eyebrow: "Insights",
  headline: "Thinking you can use",
  lead: "Points of view, practical playbooks and tools for making better marketing decisions.",
  secondary:
    "Updated regularly with focused thinking on growth, demand, search, conversion and measurement."
};

// --- 02 Featured thinking -----------------------------------------------------
// The brief names the piece. It is also the most recent.

export const featured = {
  label: "Featured thinking",
  article: byId(4),
  cta: "Read the article",
  // The visual's words. Vendor-neutral on purpose: no platform is named or
  // drawn. The buyer's question is the article's own example ("a fintech
  // compliance tool"), not a quotation from any real assistant.
  visual: {
    question: "Which compliance tools suit a UK fintech at seed stage?",
    answerLabel: "Answer",
    answerNote: "Summarised from 3 sources",
    shortlist: ["Named", "Named", "Not named"],
    sourcesLabel: "Your website and your competitors'"
  }
};

// --- 03 On our radar ----------------------------------------------------------
// Three short signals. Each one is a point an existing article already makes,
// and "Read the signal" goes to that article. No signal has a page of its own,
// and none is written here as if it did.

export const radar = {
  label: "On our radar",
  cta: "Read the signal",
  items: [
    {
      title: "Search is becoming recommendation",
      summary:
        "An assistant reads the page first and decides whether your name reaches the buyer.",
      category: "Search & authority" as InsightFilter,
      href: byId(4).href
    },
    {
      title: "Why attribution certainty is often overstated",
      summary:
        "Until channel data meets the CRM, the report credits the last touch, not what persuaded.",
      category: "Growth intelligence" as InsightFilter,
      href: byId(5).href
    },
    {
      title: "More activity is not always the answer",
      summary:
        "Volume stopped signalling commitment when text became free. Fewer, deeper pieces win.",
      category: "Demand & performance" as InsightFilter,
      href: byId(5).href
    }
  ]
};

// --- 04 Try the thinking ------------------------------------------------------
// ONE TOOL IS LIVE. The positioning diagnostic runs on /strategy-positioning,
// and its preview here reads the diagnostic's own first question and facts, so
// the two cannot drift apart. The spend readiness check does NOT exist: it is
// shown as "Coming next", its preview is marked as a preview, and its button
// goes to the article the check will be built from rather than to anything
// that pretends to run.

const firstQuestion = diagnosticQuestions[0];

export const tools = {
  label: "Try the thinking",
  items: [
    {
      status: "live" as const,
      statusLabel: "Live",
      title: "Positioning diagnostic",
      explanation:
        "Understand where clarity is helping growth and where it is holding it back.",
      youGet: `A clarity profile across ${strategyHero.facts[1]} and a commercial reading. ${strategyHero.facts[0]}, ${strategyHero.facts[2].toLowerCase()}.`,
      cta: { label: "Start the diagnostic", href: `${DIAGNOSTIC_HREF}#${DIAGNOSTIC_ANCHOR}` },
      preview: {
        kicker: "Sample question · 1 of 12",
        question: firstQuestion.prompt,
        options: firstQuestion.options,
        /** The option lit on hover. A sample, not an answer. */
        sample: 3
      }
    },
    {
      status: "next" as const,
      statusLabel: "Coming next",
      title: "Marketing spend readiness check",
      explanation:
        "Decide whether to increase spend or fix the fundamentals first.",
      youGet:
        "A read on the five checks, and which one to fix before the budget goes up.",
      cta: { label: "Read the five checks", href: byId(5).href },
      preview: {
        kicker: "Preview · not live yet",
        question: "Can your reporting name the source of closed-won revenue?",
        options: ["Yes, joined to the CRM", "Partly", "Not yet"],
        sample: 2
      }
    }
  ]
};

// --- 05 Latest thinking -------------------------------------------------------

export const latest = {
  label: "Latest thinking",
  allLabel: "All",
  empty:
    "Nothing filed here yet. New pieces reach the weekly briefing first.",
  emptyCta: { label: "See how we work across the five capabilities", href: "/services" }
};

// --- 06 The weekly briefing ---------------------------------------------------
// THERE IS NO NEWSLETTER. No list, no provider and no sign-up endpoint exist,
// so this is a lightweight call to action to the contact form, and the note
// under the button says so rather than letting the button imply a sign-up.

export const briefing = {
  label: "The Pixelette briefing",
  headline: "Three things worth knowing. No filler",
  copy: "A concise weekly view on the market shifts, ideas and decisions worth paying attention to.",
  cta: { label: "Get the briefing", href: "/contactus" },
  note: "Email sign-up is not open yet. The button goes to our contact form; mention the briefing and we will add you."
};
