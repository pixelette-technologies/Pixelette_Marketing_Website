import type { BandId, DimensionId } from "@/lib/strategyDiagnostic";

// The Strategy & Positioning page copy, 22 September 2026.
//
// ONE FILE, on the rule aboutContent.ts and homeContent.ts follow: this is one
// copy document, so a reviewer checking the wording opens one file and no TSX
// stands between them and the words. The arithmetic is deliberately NOT here —
// it is in `src/lib/strategyDiagnostic.ts`, so that copy review and score
// review are two separate readings of two separate files.
//
// WHAT THIS PAGE MAY NOT SAY, and these are hard rules rather than preferences:
//
//   - Nothing invented. No clients, logos, testimonials, customer counts,
//     performance figures, market research, awards or credentials. The site is
//     already holding management's REAL BlockGuard numbers off the home page
//     for want of a measurement window; softer invented ones here would be
//     indefensible.
//   - The diagnostic is NOT described as scientifically validated, predictive,
//     proprietary, algorithmic or AI-powered, because it is none of those. The
//     permitted descriptions are the ones used below: structured diagnostic,
//     strategic framework, indicative assessment.
//   - The sample output invents no client. Every slot in it describes what
//     belongs there rather than filling it with a plausible-looking answer,
//     which is the only version of a sample that cannot be mistaken for a real
//     engagement.
//
// Eyebrows are stored in sentence case — .eyebrow carries the uppercasing, so
// this file does not shout at whoever proofreads it — and headings carry no
// trailing full stop except where the brief's own wording has one, which is
// the hero, the methodology heading and the two closing headings.

/** Every conversation on this page lands on the enquiry form. One constant, so
 *  they move together if that route ever moves. */
export const CONTACT_HREF = "/contactus";

/** The hub. The page links back to it: this capability is one of five. */
export const SERVICES_HREF = "/services";

/** The route, held here so the call sites that link in import it rather than
 *  retyping it — `capabilityGroups.ts` and the home page's Growth System. */
export const DIAGNOSTIC_HREF = "/strategy-positioning";

/** The label the inbound link takes wherever it appears. The brief is explicit
 *  that this must not be a generic "Learn more": the point of the link is to
 *  signal that there is a methodology and a diagnostic behind it.
 *
 *  The arrow is part of the string, which is the convention aboutContent.ts
 *  set with "Introduce yourself →" — the alternative is a pseudo-element that
 *  only some call sites get and that copy review cannot see. */
export const DIAGNOSTIC_LINK_LABEL =
  "Explore our Strategy & Positioning Diagnostic →";

/** The two in-page anchors. Both are used by the hero's buttons and one by the
 *  closing section, so they are constants rather than three typed strings. */
export const DIAGNOSTIC_ANCHOR = "diagnostic";
export const METHODOLOGY_ANCHOR = "methodology";

// --- 01 Hero ----------------------------------------------------------------
// The headline is two lines and the second takes the brand tone — the guide's
// hero device, and what HomeHero and AboutUsHero both do. Here the split is
// the argument rather than decoration: where to compete, then why you win.

export const strategyHero = {
  eyebrow: "Strategy & Positioning",
  headingLead: "Know where to compete.",
  headingAccent: "Know why you win.",
  lead: "A structured diagnostic to clarify your market, audience, differentiation, message and growth priorities — then turn that clarity into practical marketing direction.",
  primaryCta: { label: "Start the diagnostic", to: `#${DIAGNOSTIC_ANCHOR}` },
  /** Sits under the primary control. An estimate of the visitor's time, which
   *  is a claim about this page and is the one number in the hero. Twelve
   *  questions at a considered pace is the basis for it. */
  microcopy: "Around 5 minutes",
  secondaryCta: {
    label: "See how the process works",
    to: `#${METHODOLOGY_ANCHOR}`
  },
  /** Labels the six-node path beneath the hero copy. */
  pathLabel: "The six dimensions"
};

// --- The six dimensions -----------------------------------------------------
// ONE SOURCE FOR ALL THREE PLACES THEY APPEAR: the hero's path, the
// methodology's six stages and the results' six scales. They were three lists
// in the first draft of this page and that is precisely how a set of six
// becomes a set of six-and-a-half.
//
// `name` is the dimension. `imperative` is the one-line instruction that opens
// each methodology stage. `description` is the stage body. The results use
// `name` alone.

export interface Dimension {
  id: DimensionId;
  index: string;
  name: string;
  imperative: string;
  description: string;
}

export const dimensions: Dimension[] = [
  {
    id: "market",
    index: "01",
    name: "Market",
    imperative: "Understand where you are competing.",
    description:
      "Category, market dynamics, commercial opportunity and changing customer expectations."
  },
  {
    id: "audience",
    index: "02",
    name: "Audience",
    imperative: "Define who matters most.",
    description:
      "Ideal customers, decision-makers, buying triggers, needs and objections."
  },
  {
    id: "competition",
    index: "03",
    name: "Competition",
    imperative: "Understand the alternatives.",
    description:
      "Direct competitors, indirect alternatives, positioning patterns and market whitespace."
  },
  {
    id: "positioning",
    index: "04",
    name: "Positioning",
    imperative: "Define why you should be chosen.",
    description:
      "Differentiation, value proposition, proof and reasons to believe."
  },
  {
    id: "messaging",
    index: "05",
    name: "Messaging",
    imperative: "Turn positioning into communication.",
    description:
      "Core narrative, messaging hierarchy and audience-specific communication."
  },
  {
    id: "growth",
    index: "06",
    name: "Growth",
    imperative: "Turn clarity into action.",
    description:
      "Marketing priorities, channels, objectives and a practical route forward."
  }
];

/** Lookup by id, so no component has to scan the array. */
export const dimensionsById: Record<DimensionId, Dimension> =
  dimensions.reduce(
    (map, dimension) => ({ ...map, [dimension.id]: dimension }),
    {} as Record<DimensionId, Dimension>
  );

// --- 02 Methodology ---------------------------------------------------------

export const methodology = {
  eyebrow: "The process",
  heading: "Clarity before activity.",
  lead: "Marketing becomes expensive when the fundamentals are unclear. Our diagnostic examines the decisions beneath campaigns, content and channels — establishing who you need to reach, what you should stand for and where growth is most likely to come from."
};

// --- 03 The diagnostic ------------------------------------------------------

export const diagnosticIntro = {
  eyebrow: "The diagnostic",
  heading: "How clear is your current positioning?",
  lead: "Answer 12 questions across six areas. You will receive an immediate positioning score, a breakdown of where you are strongest and the areas that deserve attention.",
  start: "Start diagnostic",
  /** Shown beside the start control. Both halves are literally true of the
   *  implementation and both are worth stating before somebody begins: no
   *  form, and the answers stay on their machine. If either ever stops being
   *  true, this sentence changes in the same commit. */
  assurance:
    "No email address, no sign-up. Your answers are scored in your browser and are not sent anywhere.",
  /** The resume line, shown instead of `assurance` when stored answers are
   *  found on load. */
  resume: "We found answers you had already started. Pick up where you left off, or start again.",
  resumeAction: "Continue",
  restartAction: "Start again"
};

export interface DiagnosticQuestion {
  dimension: DimensionId;
  prompt: string;
  /** Five statements, stored lowest score first. THE SCORE IS THE POSITION:
   *  option 0 is worth 0 and option 4 is worth 4. There is deliberately no
   *  separate score field, because two sources for one value is how the order
   *  and the scoring drift apart, and neither would be visible until it
   *  rendered. `MAX_PER_QUESTION` in the lib is the other half of that
   *  contract. */
  options: string[];
}

/** Twelve, in order, two per dimension and grouped by dimension. The scoring
 *  reads `dimension` off each one rather than assuming the grouping, so a
 *  reorder here cannot silently mis-file a score. */
export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    dimension: "market",
    prompt:
      "How clearly have you defined the specific market or category in which you want to compete?",
    options: [
      "We have not clearly defined it",
      "We describe it differently depending on the situation",
      "We broadly understand it",
      "It is clearly defined",
      "It is clearly defined and supported by market evidence"
    ]
  },
  {
    dimension: "market",
    prompt:
      "How well do you understand where the strongest commercial opportunities and market gaps exist?",
    options: [
      "We do not currently know",
      "Mainly intuition",
      "We have some understanding",
      "We have identified clear opportunities",
      "Opportunities are supported by research and evidence"
    ]
  },
  {
    dimension: "audience",
    prompt:
      "How clearly defined are your highest-value customer segments or ideal customer profiles?",
    options: [
      "Not defined",
      "Very broad",
      "Partly defined",
      "Clearly defined",
      "Clearly defined using evidence and commercial value"
    ]
  },
  {
    dimension: "audience",
    prompt:
      "How well do you understand what causes those customers to buy, delay or reject a purchase?",
    options: [
      "Very little",
      "Mostly assumptions",
      "Some understanding",
      "Strong understanding",
      "Strong understanding supported by customer or sales evidence"
    ]
  },
  {
    dimension: "competition",
    prompt:
      "How well do you understand the businesses and alternatives customers compare you against?",
    options: [
      "We have not formally assessed them",
      "We know the obvious competitors",
      "We have done some analysis",
      "We understand the competitive landscape well",
      "We continually assess competitors and alternative choices"
    ]
  },
  {
    dimension: "competition",
    prompt:
      "How clearly can you identify meaningful market space that competitors do not already own?",
    options: [
      "We cannot currently identify one",
      "Our difference is mostly generic",
      "We have some potential differentiation",
      "We have a clear area of differentiation",
      "We have a clear, evidenced and defensible position"
    ]
  },
  {
    dimension: "positioning",
    prompt:
      "Could your team clearly explain in one sentence why the right customer should choose you?",
    options: [
      "No",
      "Different people would give very different answers",
      "We have a general answer",
      "We have a clear answer",
      "We have a clear, distinctive answer supported by proof"
    ]
  },
  {
    dimension: "positioning",
    prompt:
      "How consistently is that positioning understood across leadership, sales and marketing?",
    options: [
      "There is no common position",
      "Significant inconsistency",
      "Reasonably aligned",
      "Strongly aligned",
      "Fully aligned and consistently applied"
    ]
  },
  {
    dimension: "messaging",
    prompt:
      "How consistently do your website, sales materials, campaigns and content communicate the same core value?",
    options: [
      "They are disconnected",
      "Considerably inconsistent",
      "Some consistency",
      "Mostly consistent",
      "Highly consistent around a defined messaging architecture"
    ]
  },
  {
    dimension: "messaging",
    prompt:
      "How effectively does your messaging change according to audience, problem and stage of the buying journey?",
    options: [
      "It does not",
      "Very little adaptation",
      "Some adaptation",
      "Clearly adapted",
      "Deliberately structured around audience and buying stage"
    ]
  },
  {
    dimension: "growth",
    prompt:
      "How clearly are your marketing channels connected to where your ideal customers actually discover, evaluate and buy?",
    options: [
      "Channels are largely chosen without evidence",
      "Mostly based on habit",
      "Partly informed",
      "Clearly aligned",
      "Strongly aligned and continually measured"
    ]
  },
  {
    dimension: "growth",
    prompt: "How clear are your marketing priorities for the next 90 days?",
    options: [
      "No clear priorities",
      "Many activities but limited prioritisation",
      "Some defined priorities",
      "Clear priorities, measures and ownership",
      "Clear priorities connected directly to commercial objectives"
    ]
  }
];

// --- 04 Result bands --------------------------------------------------------
// The thresholds live in the lib. These are the words.
//
// NOTHING HERE CRITICISES THE VISITOR. No "poor", no "weak", no "failure". A
// low score describes an opportunity that exists, not a business that is
// failing, and the lowest band is the one most likely to be read by somebody
// who has just been honest about their own company.

export const bands: Record<BandId, { label: string; body: string }> = {
  foundation: {
    label: "Foundation",
    body: "There are significant opportunities to create greater strategic clarity before increasing marketing activity."
  },
  developing: {
    label: "Developing",
    body: "Several fundamentals are in place, but inconsistency may be limiting how effectively the market understands your value."
  },
  established: {
    label: "Established",
    body: "Your strategic foundations are relatively clear. The opportunity is to strengthen weaker areas and make the position more consistent."
  },
  strong: {
    label: "Strong",
    body: "You have a strong level of strategic clarity. The priority is maintaining differentiation and translating that clarity consistently into growth."
  }
};

// --- 05 Results -------------------------------------------------------------

export const resultsCopy = {
  eyebrow: "Your result",
  heading: "Your Strategy & Positioning Score",
  /** Rendered as "68 / 100"; the denominator is here so it is not a literal
   *  buried in the component. */
  outOf: "100",
  breakdownLabel: "By dimension",
  strongestLabel: "Strongest area",
  priorityLabel: "Priority area",
  /** Used when all six dimensions scored the same and naming a strongest and a
   *  priority would name the same one twice. */
  uniformNote:
    "All six areas scored the same, so there is no single strongest or priority area — the opportunity is to raise the whole picture together.",
  focusHeading: "Where to focus next",
  focusLead:
    "The three areas with the most room to move, taken from your own answers.",
  scaleNote:
    "An indicative assessment, calculated from the twelve answers you gave. It is not a benchmark against other companies.",
  restart: "Restart diagnostic",
  restartConfirmQuestion: "Restart the diagnostic?",
  restartConfirmBody: "This clears the twelve answers you have given.",
  restartConfirm: "Yes, clear my answers",
  restartCancel: "Keep my results",
  print: "Print or save results"
};

// --- 06 Recommendations -----------------------------------------------------
// One per dimension. Three are shown — the visitor's three lowest — and they
// are fixed text chosen by their score, not generated. Each describes work
// Pixelette would actually do, in the vocabulary the methodology above uses.

export const recommendations: Record<
  DimensionId,
  { title: string; body: string }
> = {
  market: {
    title: "Clarify the market opportunity",
    body: "Define the category you are competing in, identify the commercial forces shaping it and establish where meaningful opportunities exist."
  },
  audience: {
    title: "Sharpen the customer definition",
    body: "Move beyond broad demographics and define your priority customer, buying triggers, objections and decision criteria."
  },
  competition: {
    title: "Map the competitive whitespace",
    body: "Understand how competitors position themselves, what customers see as alternatives and where a differentiated position can credibly be owned."
  },
  positioning: {
    title: "Strengthen the reason to choose you",
    body: "Turn capabilities into a clear value proposition built around meaningful differentiation and credible proof."
  },
  messaging: {
    title: "Create a messaging architecture",
    body: "Translate your position into a clear core narrative and establish how that message should adapt by audience and buying stage."
  },
  growth: {
    title: "Convert strategy into priorities",
    body: "Connect audiences and objectives to the channels most likely to influence growth and establish a focused 90-day marketing plan."
  }
};

// --- 07 The CTA after results ----------------------------------------------
// It appears ONLY after the visitor has their complete result. That ordering is
// the brief's and it is also the only honest version: the page promises value
// before it asks for anything, so the ask has to come after the value.

export const resultsCta = {
  heading: "A score is only the starting point.",
  body: "The full Pixelette Strategy & Positioning process goes beyond the diagnostic. We combine market evidence, customer understanding, competitive analysis and commercial priorities to establish a position that can guide marketing, sales and growth.",
  cta: { label: "Talk through my results →", to: CONTACT_HREF }
};

// --- 08 What the full process produces -------------------------------------

export const outputs = {
  eyebrow: "The engagement",
  heading: "From diagnosis to direction.",
  lead: "A full Strategy & Positioning engagement produces six things, each one an input to the next.",
  items: [
    {
      index: "01",
      label: "Market opportunity",
      body: "Category definition, market dynamics and opportunity areas."
    },
    {
      index: "02",
      label: "Ideal customer profile",
      body: "Priority audiences, decision-makers, needs, triggers and objections."
    },
    {
      index: "03",
      label: "Competitive landscape",
      body: "Competitor positioning and whitespace analysis."
    },
    {
      index: "04",
      label: "Positioning",
      body: "Differentiation, value proposition and reasons to believe."
    },
    {
      index: "05",
      label: "Messaging architecture",
      body: "Core narrative, messaging hierarchy and audience-specific messages."
    },
    {
      index: "06",
      label: "Growth priorities",
      body: "Channel priorities, measures and practical 90-day direction."
    }
  ],
  closing:
    "The objective is not another strategy document. It is a clearer basis for every marketing decision that follows."
};

// --- 09 Sample strategic output --------------------------------------------
// EVERY SLOT DESCRIBES WHAT BELONGS IN IT. Nothing is filled in with a
// plausible-looking answer, and that is the whole design of this section: a
// sample with convincing content in it is indistinguishable from a real
// client's work, and this site has already had to delete fifteen unsourced
// figures for exactly that reason. A framework with its slots named is more
// useful to a prospect anyway — it shows the shape of the thinking.

export const sampleOutput = {
  eyebrow: "Illustrative framework",
  heading: "What the output looks like",
  lead: "A shortened view of the framework an engagement fills in. The slots below describe what goes in each one; they are not a client's answers.",
  /** Printed on the document itself, so the disclaimer travels with the
   *  artefact rather than sitting only in the section header. */
  stamp: "Illustrative framework — not a client engagement",
  position: {
    label: "Position",
    /** The bracketed tokens are the point: this is a sentence structure, and
     *  filling the brackets in is the engagement. */
    template:
      "For [priority customer], [brand] is the [category] that [primary value], because [proof]."
  },
  blocks: [
    {
      label: "Audience",
      rows: [
        { term: "Primary ICP", slot: "the segment with the highest commercial value" },
        { term: "Buying trigger", slot: "the event that starts the search" },
        { term: "Principal objection", slot: "the reason the decision stalls" }
      ]
    },
    {
      label: "Differentiation",
      rows: [
        { term: "Table stakes", slot: "what every credible provider must have" },
        { term: "Differentiators", slot: "what only you can claim, and why it matters" },
        { term: "Proof", slot: "the evidence that makes the claim safe to believe" }
      ]
    },
    {
      label: "Message",
      rows: [
        { term: "Primary narrative", slot: "one argument the whole company can repeat" },
        { term: "Supporting messages", slot: "one per audience and buying stage" }
      ]
    },
    {
      label: "90-day priorities",
      rows: [
        { term: "01", slot: "the constraint to remove first" },
        { term: "02", slot: "the proof to build" },
        { term: "03", slot: "the channel to prove it in" }
      ]
    }
  ]
};

// --- 10 Closing CTA ---------------------------------------------------------
// The primary control changes wording once the diagnostic has been completed —
// "Review my results" rather than "Start the diagnostic" — and in neither case
// does it restart anything. Both scroll to the same anchor; what has changed
// is what is waiting there.

export const strategyClose = {
  eyebrow: "Next step",
  heading: "Better marketing starts with a clearer position.",
  lead: "Understand where you stand today and what should change next.",
  primary: { label: "Start the diagnostic", completedLabel: "Review my results" },
  secondary: { label: "Talk to Pixelette", to: CONTACT_HREF },
  aside: {
    body: "Strategy & Positioning is the first of five connected capabilities.",
    link: { label: "See the full growth system →", to: SERVICES_HREF }
  }
};

// --- 11 FAQ -----------------------------------------------------------------
// Four, and the brief says not to pad it. They are rendered through the shared
// Faqs / Accordion pair the service and sector pages already use, so this page
// gains no new FAQ treatment.

export const faqs = [
  {
    question: "Is the diagnostic free?",
    answer:
      "Yes. The online diagnostic provides an initial assessment of your current strategy and positioning."
  },
  {
    question: "How long does it take?",
    answer: "Approximately five minutes."
  },
  {
    question: "Is the score a full marketing strategy?",
    answer:
      "No. It is an indicative diagnostic designed to identify strengths and areas that merit deeper investigation. A full strategy requires evidence, research and commercial context."
  },
  {
    question: "What happens after the diagnostic?",
    answer:
      "You can use the result independently or speak with Pixelette about exploring the priority areas in more depth."
  }
];

export const faqCopy = {
  eyebrow: "Questions",
  heading: "Before you begin"
};
