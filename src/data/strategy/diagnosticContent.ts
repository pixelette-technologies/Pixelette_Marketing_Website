// The Strategy & Positioning Diagnostic, 22 September 2026.
//
// ONE FILE, on the same rule aboutContent.ts and homeContent.ts follow: this
// is one copy document, so a reviewer checking the wording opens one file and
// no TSX stands between them and the words.
//
// WHY THIS PAGE EXISTS. Strategy & Positioning is the first of the five
// approved capabilities and the only one with nowhere to go: navigation.ts and
// capabilityGroups.ts both record the same judgement — a dropdown group or a
// link row with no destination is a dead label, so the pattern shipped without
// it. Both notes end the same way: it joins when there is somewhere for it to
// point. This is that destination, and the two files are updated with it.
//
// WHAT THIS PAGE MAY NOT SAY, and the constraint is the whole reason the
// instrument below is shaped the way it is:
//
//   - No client logos, testimonials, customer counts, results figures or
//     awards. The site is already holding management's REAL BlockGuard numbers
//     off the home page for want of a measurement window; inventing softer
//     ones here would be indefensible.
//   - No research data. The diagnostic therefore benchmarks the visitor
//     against NOBODY. It reads back their own six answers and names the
//     earliest lens they have said is unresolved — arithmetic on their own
//     clicks, which is the one number on this page that cannot be wrong.
//   - Nothing is described as AI-powered. Six arrays and a minimum: there is
//     no model here and the copy never implies one.
//
// EVERY CAPABILITY PHRASE IN THE READINGS IS MANAGEMENT'S. growthSystemData's
// capability 01 lists exactly six: ICP and buyer insight, market and competitor
// intelligence, proposition, messaging, go-to-market, campaign strategy. The
// six lenses are those six, in dependency order, and each reading names the one
// it belongs to. Nothing below invents a service.
//
// Eyebrows are stored in sentence case — .eyebrow carries the uppercasing, so
// this file does not shout at whoever proofreads it — and headings carry no
// trailing full stop, following the 21 Sep punctuation pass.

/** Every call to action on this page lands on the enquiry form. One constant,
 *  so they move together if that route ever moves. */
export const CONTACT_HREF = "/contactus";

/** The hub. The close links back to it rather than leaving the page as a
 *  cul-de-sac: this capability is one of five and the page should say so. */
export const SERVICES_HREF = "/services";

/** The route, held here so the call sites that link to this page import it
 *  rather than retyping it. capabilityGroups.ts is the one that matters. */
export const DIAGNOSTIC_HREF = "/strategy-positioning";

/** The label the link takes wherever it appears. The arrow is part of the
 *  string, which is the convention aboutContent.ts set on 22 Sep with
 *  "Introduce yourself →" — the alternative is a pseudo-element that only some
 *  call sites get and that copy review cannot see. */
export const DIAGNOSTIC_LINK_LABEL =
  "Explore our Strategy & Positioning Diagnostic →";

// --- 01 Hero ----------------------------------------------------------------
// The headline is split so the payoff takes the brand tone, which is the
// guide's hero device and what HomeHero and AboutUsHero both do.
//
// The note under the lead is a plain statement of fact about this page and it
// is worth keeping true: the instrument holds its answers in React state and
// nothing else. No fetch, no localStorage, no analytics event. If any of those
// are ever added, this sentence has to change in the same commit.

export const diagnosticHero = {
  eyebrow: "Strategy & Positioning",
  headingLead: "The Strategy & Positioning",
  headingAccent: "Diagnostic",
  lead: "Six lenses we take to every engagement — market, customer, competition, positioning, messaging and growth priorities. Work through them and see which layer is least resolved in your own business.",
  note: "Six questions. Your answers stay in this browser: nothing is submitted and nothing is stored.",
  cta: { label: "Start the diagnostic", to: "#diagnostic" }
};

// --- 02 The method ----------------------------------------------------------
// The page's ONE dark band, and the cap is three. It goes here rather than on
// the instrument for a reason worth stating: the instrument is a set of form
// controls, and every dark-ground contrast fault this codebase has produced
// came from moving something interactive onto the panel family. The band-dark
// rules cover headings, lead, body, small and eyebrow, and nothing else.
//
// It also earns its place as punctuation rather than as a separator — the
// _surfaces.scss rule. It is the argument for the order, and the order is what
// the page is claiming to have.

export const diagnosticMethod = {
  eyebrow: "How we diagnose",
  heading: "Six lenses, taken in order",
  lead: "Each lens depends on the one before it. Messaging cannot be written before the proposition is decided, and a proposition cannot be argued before the market, the buyer and the comparison are understood."
};

// --- 03 The lenses ----------------------------------------------------------

export interface DiagnosticLens {
  /** Stable key. Used as the radio group name, so it must not collide. */
  id: string;
  index: string;
  /** The lens, as the method band and the reading name it. */
  name: string;
  /** The same lens inside the readout, where the column is about 150px wide
   *  and "Growth priorities" is the one name that will not fit. Explicit
   *  rather than derived: a truncation rule would cut a different name the
   *  moment one is added. */
  short: string;
  /** The one-line description on the method band. */
  summary: string;
  /** What the instrument asks. */
  question: string;
  /** Four statements, STORED LEAST RESOLVED FIRST. The level IS the position:
   *  option 0 reads as 1 of 4, option 3 as 4 of 4. There is deliberately no
   *  separate score field — two sources for one value is how the order and the
   *  scoring drift apart, and neither would be visible until it rendered. */
  options: string[];
  /** Where the work starts when this is the earliest unresolved lens. Every
   *  one of these names a capability from growthSystemData's approved list. */
  reading: string;
}

export const diagnosticLenses: DiagnosticLens[] = [
  {
    id: "market",
    index: "01",
    name: "Market",
    short: "Market",
    summary:
      "Which segment you are actually competing in, and what is moving inside it.",
    question: "How clearly is the market you compete in defined?",
    options: [
      "We sell to whoever shows interest.",
      "We know the sector, but not the segment inside it.",
      "We have a defined segment and a rough sense of its size.",
      "The segment, its size and what is moving in it are written down."
    ],
    reading:
      "Market and competitor intelligence. We would define the segment you are actually competing in, size it, and establish what is moving inside it — before any channel decision is made, because every later answer is drawn from this one."
  },
  {
    id: "customer",
    index: "02",
    name: "Customer",
    short: "Customer",
    summary: "Who buys, what triggers the decision, and who else has to agree.",
    question: "How well is the buyer understood beyond a job title?",
    options: [
      "We have never written down who the buyer is.",
      "We have a job title and an industry.",
      "We know the triggers and the objections that keep recurring.",
      "We know who else is in the room, and what each of them needs in order to agree."
    ],
    reading:
      "ICP and buyer insight. We would establish who actually buys, what triggers the decision, which objections recur, and who else has to agree before anything is signed. A proposition written without that is written for an audience of one guess."
  },
  {
    id: "competition",
    index: "03",
    name: "Competition",
    short: "Competition",
    summary:
      "What a buyer sees when they build a shortlist, and where the comparison is lost.",
    question: "How do you know what you are being compared against?",
    options: [
      "We rarely look at competitors.",
      "We know the obvious names in the category.",
      "We track how they position and what they charge.",
      "We know the shortlist a buyer builds, and the point where we lose it."
    ],
    reading:
      "Competitor intelligence. We would reconstruct the shortlist a buyer actually builds, what they are comparing on, and the point in that comparison where the decision goes elsewhere. Positioning is a claim about that shortlist, so it cannot be argued without it."
  },
  {
    id: "positioning",
    index: "04",
    name: "Positioning",
    short: "Positioning",
    summary: "The reason to choose you that a competitor could not also claim.",
    question:
      "If a buyer asks why you rather than the alternative, what happens?",
    options: [
      "The answer depends on who they ask.",
      "There is a line, but it describes what we do rather than why it matters.",
      "There is an agreed answer and most of the team uses it.",
      "The answer is agreed, specific, and not one a competitor could also claim."
    ],
    reading:
      "The proposition. We would settle one agreed reason to choose you — specific enough that a competitor could not claim the same sentence, and written so that sales, marketing and the website are all using it. This is the decision everything downstream repeats."
  },
  {
    id: "messaging",
    index: "05",
    name: "Messaging",
    short: "Messaging",
    summary: "One argument, adapted by audience, with the evidence attached.",
    question:
      "How consistent is the story across the places a buyer meets you?",
    options: [
      "Every channel says something different.",
      "The website is current; everything else has drifted.",
      "The core message holds, though the proof behind it varies.",
      "One argument, adapted by audience, with evidence attached."
    ],
    reading:
      "Messaging. We would build one argument out of the proposition and adapt it by audience and channel, with the evidence attached to the claims that need it — so that consistency comes from the argument rather than from copying the same paragraph around."
  },
  {
    id: "priorities",
    index: "06",
    name: "Growth priorities",
    short: "Priorities",
    summary:
      "The single constraint the next quarter's work should be aimed at.",
    question: "How is the next quarter's marketing decided?",
    options: [
      "By whatever comes up.",
      "By channel budgets carried over from last year.",
      "By a plan, though it is not aimed at one constraint.",
      "By the single constraint we agree is limiting growth."
    ],
    reading:
      "Go-to-market and campaign strategy. We would name the one constraint limiting growth this quarter and aim the plan at it, rather than spreading budget evenly across channels that are not the problem. With the five lenses above resolved, that constraint is usually already visible."
  }
];

// --- 04 The instrument ------------------------------------------------------

export const diagnosticSection = {
  eyebrow: "The diagnostic",
  heading: "Find the layer the answer lives in",
  lead: "A channel problem is often a positioning problem that arrived late. Pick the statement closest to your business in each of the six lenses; the reading at the end is a structured view of your own answers, not a benchmark and not a comparison against anybody else.",
  /** Shown above the six measures. */
  readoutLabel: "Your reading",
  /** The honest caption, and it is doing real work — four filled ticks next to
   *  a lens name will be read as a score unless the page says what it is. */
  readoutNote:
    "Self-assessed clarity across the six lenses. It reads back what you have just described; it is not a score against other companies.",
  /** Rendered as "01 / 06" beside each question. */
  stepSeparator: "/",
  next: "Next",
  back: "Back",
  finish: "See the reading",
  /** Used on the readout rows once every lens has been answered and they
   *  become a way back into the questions. */
  revisitHint: "Select a lens to revisit it"
};

export const diagnosticResult = {
  // NOT "Your reading", which is what this said until the page was looked at:
  // the result panel and the readout beside it sit on the same baseline, so
  // the phrase rendered TWICE, side by side, 700px apart. Nothing in the
  // markup, the types or any gate could see it. The readout keeps the name —
  // it is the thing being read — and the panel says what it is doing with it.
  eyebrow: "What this says",
  /** The lens name is appended and takes the brand tone. "Start here:" works
   *  for all six names, which "X is where the work starts" does not — "Growth
   *  priorities is" reads as a grammatical error. */
  headingPrefix: "Start here:",
  /** Prefixes the list of any other lenses sitting at the same level. */
  tiePrefix: "Also at this level:",
  /** Why the earliest lens wins a tie, stated rather than assumed. */
  orderNote:
    "The earliest unresolved lens is named first, because every lens after it depends on its answer.",
  cta: { label: "Talk to us about this", to: CONTACT_HREF },
  restart: "Start again",
  /** All six at the top level. Not flattery: it moves the question to the rest
   *  of the growth system, which is the honest next step and an existing page. */
  resolved: {
    heading: "Nothing here is the constraint",
    body: "On your own reading, all six lenses are resolved. That usually moves the question from strategy to execution — whether demand, search, conversion and measurement are delivering against a positioning that is already clear.",
    cta: { label: "See the five capabilities", to: SERVICES_HREF }
  }
};

// --- 05 Close ---------------------------------------------------------------
// Follows AboutClose's anatomy rather than the shared QuestionAndAnswer, which
// is still un-converted: it renders heading_secondry--light and text_secondry
// and hard-codes "Book a consultant - it's on us!". Putting legacy classes on a
// new page to avoid a third close would be the wrong trade. The divergence
// between About's close and the four template closes is already recorded in
// the vault as a decision to take when those templates are next looked at.
//
// The CTA label is the brief's primary, the same one the navigation button and
// the home hero carry. The brief is explicit that mixing CTA labels between
// positions is worse than either label alone.

export const diagnosticClose = {
  eyebrow: "Next step",
  heading: "Bring us the answer you already have",
  lead: "Whether you have worked through the six lenses or already know which one is the problem, the first conversation starts in the same place: what is limiting growth, and which layer the answer sits in.",
  cta: { label: "Build my growth plan", to: CONTACT_HREF },
  aside: {
    body: "Strategy & Positioning is the first of five connected capabilities.",
    link: { label: "See the full growth system →", to: SERVICES_HREF }
  }
};
