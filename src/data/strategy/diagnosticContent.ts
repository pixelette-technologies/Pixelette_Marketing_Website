import type { BandId, DimensionId, TierId } from "@/lib/strategyDiagnostic";

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
//
// Eyebrows are stored in sentence case — .eyebrow carries the uppercasing, so
// this file does not shout at whoever proofreads it.
//
// NO HEADING CARRIES A TRAILING FULL STOP. The brief this page was built to
// wrote several of them with one, and they were kept verbatim on the grounds
// that they were the client's words. That was wrong: the 21 Sep punctuation
// pass took trailing full stops off every heading on the site, so this page
// was the only one reintroducing them. They came off on instruction on
// 22 Sep 2026, which restores the site's own rule rather than breaking one.

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

/** The two in-page anchors, used by the hero's two controls. */
export const DIAGNOSTIC_ANCHOR = "diagnostic";
export const ASSESS_ANCHOR = "what-we-assess";

// --- 01 Hero ----------------------------------------------------------------
// Two lines of EQUAL AUTHORITY, 30 Sep 2026: the same size and weight, told
// apart by colour alone — plum ink, then burgundy. Neither is the brand
// crimson any more and neither is ever greyed; see _strategyHero.scss.

export const strategyHero = {
  eyebrow: "Strategy & Positioning",
  // BOTH full stops came off, not just the trailing one. The pair renders as
  // two lines, so the line break already does the work the first stop was
  // doing — and leaving one in and taking one out would have read as a typo
  // rather than as a style.
  headingLead: "Know where to compete",
  headingAccent: "Know why you win",
  lead: "A structured diagnostic to clarify your market, audience, differentiation, message and growth priorities — then turn that clarity into practical marketing direction.",
  /** The four facts under the lead, set with middots. The time is a range
   *  now, per the brief; it was "Around 5 minutes". */
  facts: ["12 questions", "6 dimensions", "Around 3–5 minutes", "Instant result"],
  primaryCta: { label: "Start the diagnostic", to: `#${DIAGNOSTIC_ANCHOR}` },
  secondaryCta: { label: "See what we assess", to: `#${ASSESS_ANCHOR}` }
};

// --- The six dimensions -----------------------------------------------------
// ONE SOURCE FOR EVERY PLACE THEY APPEAR: the bridge's list, the progress
// row, the clarity profile and the commercial reading. It was three lists in
// the first draft of this page, and that is precisely how a set of six
// becomes a set of six-and-a-half.
//
// `name` is the dimension, and it is the ONLY field rendered anywhere today.
//
// `imperative` AND `description` ARE NOT RENDERED. They were the body of the
// methodology's six stages, which came off on instruction on 22 Sep 2026 when
// the wave took that section's place (and the wave itself came off on
// 30 Sep). They are kept rather than deleted
// because they are the brief's own copy and the stages may come back — but a
// reviewer reading this file should know that these twelve sentences are not
// on the page. If the stages are not restored, delete them; unread copy in a
// copy document is how a file stops being trustworthy.

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

// --- 02 The bridge ----------------------------------------------------------
// "Clarity before activity" kept, the dark band it sat on gone (30 Sep 2026).
// A third of a screen: the phrase, one line, the six names. An explanation,
// not a second hero.

export const clarityBridge = {
  heading: "Clarity before activity",
  line: "Before deciding what to do, understand what is genuinely clear — and what isn’t."
};

// --- 03 The diagnostic ------------------------------------------------------

export const diagnosticIntro = {
  /** The stage's heading. Visually hidden: the progress row and the question
   *  are what a sighted visitor reads, but the outline needs a heading here. */
  heading: "The Strategy & Positioning diagnostic",
  /** The two ends of the Clarity Rail. */
  railLess: "Less clear",
  railMore: "More clear",
  /** For assistive technology only: how the rail is operated by keyboard. */
  railHelp:
    "Use the arrow keys to choose an answer, then press Enter to continue.",
  next: "Next",
  back: "Back",
  backToResults: "Back to my results",
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

/** The pacing moment after question six. Shown for about 1.3 seconds and
 *  then the diagnostic carries on by itself: no button. */
export const halfway = {
  eyebrow: "Halfway there",
  heading: "Your positioning picture is beginning to take shape",
  body: "We have enough information to see the beginnings of a pattern. Complete the remaining dimensions to see where the greatest opportunities may sit."
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

//
// 30 Sep 2026: each band gained a headline and a narrative, verbatim from the
// final brief, so the overall reading changes with the score. The floors
// (0 / 40 / 60 / 80) are BAND_FLOORS in the lib and did not move.

export const bands: Record<
  BandId,
  { label: string; headline: string; narrative: string }
> = {
  foundation: {
    label: "Significant clarity gaps",
    headline: "Your positioning needs greater clarity before more activity",
    narrative:
      "Your positioning currently contains several unresolved decisions. That can make marketing activity work harder than it should because execution may be being optimised before the underlying choices are sufficiently clear."
  },
  developing: {
    label: "Developing clarity",
    headline:
      "You have a foundation — now sharpen the decisions that matter most",
    narrative:
      "You have useful foundations, but several areas still need sharpening. The opportunity is to identify which unresolved decisions have the greatest commercial effect before increasing activity."
  },
  established: {
    label: "Comparatively clear",
    headline:
      "Your positioning is comparatively clear — now protect and compound it",
    narrative:
      "Your positioning is comparatively clear. The opportunity now is to strengthen the weaker dimensions, protect what is working and compound that clarity through execution."
  },
  strong: {
    label: "Strong clarity",
    headline:
      "Your positioning is strong — now turn that clarity into sustained advantage",
    narrative:
      "Your positioning picture is strong across most dimensions. The emphasis shifts from fundamental clarification towards consistency, evidence and compounding the advantages already present."
  }
};

// --- 04b What each dimension's score could mean ------------------------------
// Three tiers per dimension, chosen by that dimension's own score (TIER_FLOORS
// in the lib: low below 45, medium 45-74, high 75+). Competition is the
// brief's verbatim; the other five follow its pattern and its rules — "may",
// never a verdict, and no figure that was not computed from the answers.

export const dimensionReadings: Record<
  DimensionId,
  Record<TierId, { headline: string; body: string }>
> = {
  market: {
    low: {
      headline: "Where you compete may not be defined sharply enough",
      body: "When the category and the opportunity are loosely defined, effort tends to spread across too many directions and it becomes harder to tell which activity is actually moving the business."
    },
    medium: {
      headline: "Your market is understood, but the opportunity may not be prioritised",
      body: "You have a working view of where you compete. The gap is likely to be evidence: knowing which part of the market holds the strongest commercial opportunity, so effort follows it rather than habit."
    },
    high: {
      headline: "Your market focus appears comparatively clear",
      body: "You appear to know where you compete and why. The priority becomes keeping that view current as the market moves, so the focus does not quietly go out of date."
    }
  },
  audience: {
    low: {
      headline: "Your priority customer may not be defined clearly enough",
      body: "If the highest-value customers are not clearly defined, messaging tends to be written for everyone, and spend reaches people who were never likely to buy."
    },
    medium: {
      headline: "You know your customers, but perhaps not yet what moves them",
      body: "Your segments are partly defined. The opportunity is a sharper understanding of what triggers, delays and blocks a purchase — which is what makes messaging and offers convert."
    },
    high: {
      headline: "Your customer definition appears clearer",
      body: "Your priority customers look comparatively well defined. The priority becomes testing that understanding against real sales and customer evidence as buying behaviour changes."
    }
  },
  competition: {
    low: {
      headline: "Differentiation may not be obvious enough",
      body: "If customers cannot quickly see why you are different, visibility alone may not create preference and price can become more influential."
    },
    medium: {
      headline: "Your difference may need stronger articulation",
      body: "Some differentiation is present, but it may not yet be distinctive or defensible enough throughout the buying journey."
    },
    high: {
      headline: "Competitive differentiation appears clearer",
      body: "Your competitive position looks comparatively defined. The priority becomes protecting it and testing whether customers recognise the same difference."
    }
  },
  positioning: {
    low: {
      headline: "The reason to choose you may not be clear enough",
      body: "If your own team cannot give one consistent answer to why the right customer should choose you, the market is unlikely to arrive at one either, and marketing has to work harder to persuade."
    },
    medium: {
      headline: "Your position exists, but may not be held consistently",
      body: "There is a general answer to why customers should choose you. The risk is that leadership, sales and marketing each tell it differently, which dilutes it at the moments that matter."
    },
    high: {
      headline: "Your positioning appears comparatively defined",
      body: "Your reason to be chosen looks clear and broadly shared. The priority becomes supporting it with proof and keeping it consistent as the business and the market change."
    }
  },
  messaging: {
    low: {
      headline: "Your message may change from one channel to the next",
      body: "When the website, sales materials and campaigns each say something different, every touchpoint starts from zero and the value you offer is harder to remember."
    },
    medium: {
      headline: "Your messaging is consistent in places, but not yet structured",
      body: "There is some consistency, but the message may not yet adapt to each audience, problem and buying stage — which is often where interest fails to become an enquiry."
    },
    high: {
      headline: "Your messaging appears comparatively consistent",
      body: "Your communication looks broadly consistent and adapted. The priority becomes keeping every new channel and campaign on the same architecture as activity grows."
    }
  },
  growth: {
    low: {
      headline: "Marketing activity may not be connected to clear priorities",
      body: "When channels are chosen by habit and priorities are not set, budget is spread thinly and it becomes difficult to see which activity is contributing to growth."
    },
    medium: {
      headline: "Your priorities exist, but the link to revenue may be loose",
      body: "Some priorities are defined. The opportunity is to connect channels and measures more directly to where customers buy and to the commercial objectives the business is working to."
    },
    high: {
      headline: "Your growth priorities appear comparatively clear",
      body: "Your priorities, channels and objectives look well connected. The priority becomes measuring and refining them so the plan keeps pace with what the results show."
    }
  }
};

// --- 05 Results -------------------------------------------------------------

export const resultsCopy = {
  eyebrow: "Your Strategy & Positioning score",
  /** Rendered as "68 / 100"; the denominator is here so it is not a literal
   *  buried in the component. */
  outOf: "100",
  profileHeading: "Your clarity profile",
  profileLow: "Unclear",
  profileHigh: "Clear",
  scaleNote:
    "An indicative assessment, calculated from the twelve answers you gave. It is not a benchmark against other companies.",
  /** Used when all six dimensions scored the same: the three "lowest" are
   *  then simply the first three, and the page says so. */
  uniformNote:
    "All six dimensions scored the same, so the three below are taken in order — the opportunity is to raise the whole picture together.",
  commercialHeading: "What this could mean commercially",
  commercialLead:
    "Your three lowest-scoring dimensions, and what each could mean for how hard your marketing has to work.",
  movesHeading: "Your three highest-leverage moves",
  movesLead:
    "The same three dimensions, turned into the work most likely to move them — taken from your own answers.",
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
  heading: "A score is only the starting point",
  body: "Your diagnostic tells us where to look. The next conversation helps determine why those issues exist, how much they matter commercially and what is genuinely worth fixing first.",
  cta: { label: "Talk through my results", to: CONTACT_HREF },
  retake: "Retake diagnostic"
};

// --- Sections 08 to 11 were here, and came off on instruction, 22 Sep 2026 --
//
// Four sections were removed from this page in one instruction: what a full
// engagement produces, the illustrative sample framework, the closing call to
// action and the four-question FAQ. Their copy went with them rather than
// being left in this file unread.
//
// WHAT THAT COSTS, recorded here because the copy file is where a reviewer
// will look for it: the closing section held the page's only call to action
// for a visitor who does NOT take the diagnostic, and the only link back to
// /services. The diagnostic's own "Talk through my results" is still there,
// but it appears only after all twelve questions are answered. A visitor who
// reads the page and does not start the instrument now reaches the end of it
// with nowhere to go. See [[09 Outstanding]].
//
// All four are recoverable from 291592f.
