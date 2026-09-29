import type { ItemsSectionContent } from "@/components/ui/home";
import { aboutExperience } from "@/data/aboutus";

// The homepage copy from the Website Replacement Architecture &
// Implementation-Ready Copy brief, 8 September 2026.
//
// ONE FILE ON PURPOSE. It is one management copy document, so a reviewer
// checking the wording against the brief opens one file rather than seven, and
// no TSX stands between them and the words.
//
// Eyebrows are stored in sentence case. .eyebrow carries text-transform:
// uppercase, so they render as the brief sets them without the file having to
// shout at whoever is proofreading it. The .h2 headings take their capital
// from the ::first-letter rule in _type.
//
// NOTHING HERE MAY BE EMBELLISHED. The brief's publication gates bar any
// metric without a documented baseline, timeframe and client approval, and bar
// any AI or automation claim that is not operational and demonstrable. The
// wording below is the brief's own and is what those gates were written
// against.

/** Every "See client results" link on the page. One constant, so they move
 *  together if the results route ever moves. */
export const RESULTS_HREF = "/results";

// --- 01 Hero ----------------------------------------------------------------

// --- 28 Sep 2026: the locked implementation specification, sections 01-04 --
// The hero and the three sections under it are transcribed from a locked
// management specification and its approved reference image. The spec is
// the source for every sentence it writes out; the image is the source for
// the small right-hand rail labels, which it shows and the spec does not
// spell out (included on instruction, verbatim from the image).
//
// NO FULL STOPS ON ANY HEADLINE OR SHORT VISUAL STATEMENT here. The spec
// says so section by section; do not "correct" them back.
//
// The five-word capability line that sat under the hero CTAs in an earlier
// concept is DELIBERATELY ABSENT. The spec removes it because Section 03
// already says it. Do not restore it.
//
// The 8 Sep lines the hero no longer renders are kept below, unrendered,
// under `retired`, as approved copy for later reuse.

export const heroCopy = {
  eyebrow: "Clarity. Momentum. Commercial impact.",
  headline: { lead: "Marketing that matters", tail: "to your bottom line" },
  support:
    "Strategy, demand, search, pipeline and intelligence working together around the commercial outcomes that matter.",
  primaryCta: { label: "Build my growth plan", to: "/contactus" },
  secondaryCta: { label: "Explore what we do", to: "/services" },
  // The Living Signal's two rail labels and its handwritten line. All three
  // are part of the picture, so the figure that carries them is aria-hidden.
  signalLabels: {
    top: ["Ideas", "Intelligence", "Action", "Growth"],
    bottom: ["A more", "commercial", "tomorrow"]
  },
  annotation: ["From", "insight", "to impact"],

  retired: {
    eyebrow: "Growth marketing built around commercial outcomes",
    lead: "Pixelette Marketing helps ambitious businesses turn attention into demand, qualified pipeline, customers and measurable growth. We combine positioning, demand generation, search, content, paid media, lifecycle marketing, conversion and growth intelligence into one accountable growth system.",
    reach:
      "For ambitious businesses across sectors, from launch through scale.",
    resultsCta: { label: "See client results", to: RESULTS_HREF },
    closing:
      "Strategy first. Commercial outcomes. No vanity metrics without context."
  }
};

/** Where both "Our approach" links in sections 02 and 04 go. There is no
 *  approach page; the diagnostic was chosen on 28 Sep as the nearest thing. */
export const APPROACH_HREF = "/strategy-positioning";

export interface EditorialSectionCopy {
  number: string;
  eyebrow: string;
  /** Headline lines in ink, one per line. */
  headline: readonly string[];
  /** An optional last line in the brand tone. */
  accent?: string;
  lead: string;
  cta: { label: string; to: string };
  /** The small right-hand rail label, one entry per line. */
  rail: readonly string[];
}

// --- 02 More activity isn't the answer ---------------------------------------

export const activityCopy: EditorialSectionCopy & {
  notes: readonly string[];
  clearerPath: string;
} = {
  number: "02",
  eyebrow: "A different perspective",
  headline: ["More activity", "isn’t the answer"],
  accent: "Better decisions are",
  lead: "We help you focus on what will actually move the business — then build the marketing around it.",
  cta: { label: "Our approach", to: APPROACH_HREF },
  rail: ["Less", "noise", "Better", "decisions", "Real", "impact"],
  // The spec's list, in its order, and no others. Stored in sentence case;
  // the notes set them in capitals as the reference does.
  notes: [
    "More ads",
    "More emails",
    "More posts",
    "More meetings",
    "More content",
    "More traffic",
    "More channels",
    "More leads",
    "More spend",
    "More tools",
    "More reports"
  ],
  clearerPath: "A clearer path"
};

// --- 03 Five capabilities ----------------------------------------------------

export type CapabilityIcon = "compass" | "bars" | "search" | "funnel" | "rise";

export const capabilitiesCopy: EditorialSectionCopy & {
  capabilities: readonly { name: string; icon: CapabilityIcon }[];
  payoff: string;
} = {
  number: "03",
  eyebrow: "What we do",
  headline: ["Five capabilities"],
  // In the brand tone, as 02 and 04 carry their last line (29 Sep).
  accent: "One commercial objective",
  lead: "An integrated approach to marketing and growth, focused on what moves the business forward.",
  cta: { label: "Explore all services", to: "/services" },
  rail: ["People", "Ideas", "Capabilities", "Stronger", "outcomes"],
  // The site's five capability names, in the hub's order.
  capabilities: [
    { name: "Strategy & Positioning", icon: "compass" },
    { name: "Demand & Performance", icon: "bars" },
    { name: "Search & Authority", icon: "search" },
    { name: "Pipeline & Conversion", icon: "funnel" },
    { name: "Growth Intelligence", icon: "rise" }
  ],
  payoff: "Real growth builds here"
};

// --- 04 Attention is easy to buy ---------------------------------------------

export const relevanceCopy: EditorialSectionCopy & {
  annotation: readonly string[];
} = {
  number: "04",
  eyebrow: "A clearer way forward",
  headline: ["Attention is easy to buy"],
  accent: "Relevance isn’t",
  lead: "We help you reach the right people, with the right message, at the right time — and turn that into real commercial impact.",
  cta: { label: "Our approach", to: APPROACH_HREF },
  rail: ["Relevance", "creates", "opportunity"],
  annotation: ["Quacking good", "at standing out"]
};

// --- 02 Proof ---------------------------------------------------------------
// The brief's safer wording. "Trusted by brands" is to be used ONLY where every
// displayed logo is a genuine client relationship; the set includes portfolio
// ventures, so this is the claim that is literally true.

// --- 11 Sep 2026: a fourth brief reversal, recorded not overwritten ---------
// The eyebrow was "Proof early", the brief's own word. It is "Trusted by" now.
//
// The brief gates the phrase: "Trusted by brands" is to be used ONLY where
// every displayed logo is a genuine client relationship, and on 9 Sep that
// could not be established, so the section took the weaker label and the
// heading below it was written to be literally true of a mixed set. Management
// confirmed permissions on 11 Sep, which is the gate opening.
//
// The HEADING AND STANDFIRST ARE UNCHANGED, deliberately. "Selected brands and
// ventures we have supported" is still the accurate description of this set,
// and it is the brief's sentence. The stronger label sits above a description
// that stays honest about what is in the row, rather than replacing it.
//
// "Trusted by" is also not new copy: it is TrustedBrands' own default and has
// been live on all eight service pages throughout. This aligns the home page
// with them rather than inventing a third claim.

// --- 23 Sep 2026: the claim now matches the relationship ---------------------
// The heading had become "Organisation we have worked with" under a blank
// eyebrow. The grammar was the visible fault; the claim was the real one. The
// row includes portfolio ventures and group work (see above, and the About
// page's note on the same six logos), so "we have worked with" asserted that
// Pixelette Marketing delivered to all six, which nothing on file supports.
//
// It takes the About page's ecosystem claim instead, so the one row of logos
// says one thing wherever it appears — here, on /aboutus and on the eight
// service pages. The About heading ends in a full stop because every heading
// on that page does; this one follows the home page's rule and does not.
//
// IF MANAGEMENT CONFIRMS ALL SIX ARE DIRECT PIXELETTE MARKETING CLIENTS, the
// heading may become "Organisations we've worked with", and only then.

export const proofCopy = {
  eyebrow: aboutExperience.eyebrow,
  heading: "Experience across the Pixelette ecosystem",
  standfirst: aboutExperience.standfirst,
  cta: { label: "See client results", to: RESULTS_HREF }
};

// --- 04 Why Pixelette Marketing — CONSOLIDATED 23 SEP 2026 ------------------
// Removed from the home page on instruction to cut repetition, and deleted
// here rather than left as dead data. Every part of it already had a section
// of its own:
//
//   "More than marketing activity"        03: "Marketing activity is not the
//                                          objective. Commercial progress is."
//   its lead (the pieces work as one)     05's lead, almost word for word
//   Commercial strategy                   05, capability 01; 10, Diagnose
//   Specialist execution                  05, capabilities 02–04
//   Technology-enabled delivery           06, the whole section
//   Accountable measurement               03, Revenue; 05, capability 05
//
// Three sections answering "why is this different?" became two. The wording
// is in git history (8 Sep brief, section 04) if it is ever wanted back.

// --- 05 The Pixelette Growth System -----------------------------------------
// The nine service cards consolidated into five parent capabilities. The
// individual service pages stay underneath them for search intent; only the
// homepage stops selling the menu and starts selling the system.

export const growthSystemData: ItemsSectionContent = {
  eyebrow: "One connected growth system",
  heading: "Five capabilities. One commercial objective",
  lead: "Growth works best when positioning, demand, search, conversion and measurement operate as one system. Pixelette can lead the full programme or deploy the specialist capability the business actually needs.",
  items: [
    {
      index: "01",
      title: "Strategy & Positioning",
      body: "Clarify who you are for, why the market should care and how growth will be won.",
      capabilities: [
        "ICP and buyer insight",
        "market and competitor intelligence",
        "proposition",
        "messaging",
        "go-to-market",
        "campaign strategy"
      ]
    },
    {
      index: "02",
      title: "Demand & Performance",
      body: "Create and capture demand across paid, owned, social and partner channels.",
      capabilities: [
        "Paid search and social",
        "social media",
        // 25 Sep 2026. Back by name: the old site sold it as one of nine
        // services, and BlockGuard — the lead case on /results — is mostly a
        // community result (975 Telegram and Discord members). The proof was
        // pointing at a service the offer no longer named.
        "community management",
        "campaign execution",
        "demand generation",
        "influencer and partner activity",
        "PR"
      ]
    },
    {
      index: "03",
      title: "Search & Authority",
      body: "Make your expertise discoverable, credible and easier to choose.",
      capabilities: [
        "SEO",
        "content strategy",
        "thought leadership",
        "digital PR",
        "authority building",
        "optimisation for traditional and AI-assisted discovery"
      ]
    },
    {
      index: "04",
      title: "Pipeline & Conversion",
      body: "Turn attention into qualified opportunity and improve the path from first touch to sales conversation.",
      capabilities: [
        "Lead generation",
        "lifecycle and email",
        "landing pages",
        "conversion optimisation",
        "nurture",
        "sales handoff"
      ]
    },
    {
      index: "05",
      title: "Growth Intelligence",
      body: "Connect channel performance to better commercial decisions.",
      capabilities: [
        "Analytics",
        "attribution",
        "dashboards",
        "experimentation",
        "reporting",
        "optimisation",
        "workflow automation"
      ]
    }
  ],
  cta: { label: "Explore what we do", to: "/services" }
};

// --- 06 AI and technology-enabled delivery ----------------------------------
// Replaces the tool-logo wall. Every claim below is about how the work is run
// rather than about a named product, which is what keeps it inside the brief's
// gate on unproven capability.
//
// 21 SEP 2026 — THE FOUR DESCRIPTIONS AND THE CLOSING LINE ARE GONE, on the
// user's instruction, and the four names are now the section's whole body:
// they run the full width of the page as a strip that moves with the scroll.
// See AiTechnologySection and [[02 Decisions]].
//
// So this is NOT an ItemsSectionContent any more, and it must not be made one
// again: PointItem requires `body`, and four empty strings passed to satisfy
// the type would be exactly the quiet lie this file keeps writing comments
// about. The shape says what the section renders.

export interface AiTechnologyContent {
  eyebrow: string;
  heading: string;
  lead: string;
  /** The four names, in reading order. They ARE the section body now. */
  marks: string[];
}

export const aiTechnologyData: AiTechnologyContent = {
  eyebrow: "AI-accelerated. Human-led.",
  heading:
    "Human strategy. AI-accelerated execution. Commercial accountability",
  lead: "Technology should make marketing faster, smarter and more measurable, not become the pitch. Pixelette combines human-led strategy with AI, automation and data where they improve insight, execution and decision-making.",
  marks: [
    "Faster insight",
    "Smarter prioritisation",
    "Scaled execution",
    "Clear accountability"
  ]
};

// --- 07 Who we help ---------------------------------------------------------
// MOVED 23 SEP 2026 to data/industries/whoWeHelp.ts, which is now the site's
// one sector taxonomy: the home page's preview, the /industries hub and the
// Who We Help menu all read it. The history of this section's three rebuilds
// (four technology cards, then an eleven-mark field, then nine cards) is in
// that file's neighbours and in [[02 Decisions]].

// --- 08 Results -------------------------------------------------------------
// The frame only. The two testimonials stay in teamData.ts and stay VERBATIM;
// the brief bars rewriting them for sales effect.

export const resultsCopy = {
  eyebrow: "Results that matter",
  heading: "Proof before promises",
  // 23 Sep 2026: the second sentence was the brief's instruction to the site
  // ("our results section should show…") published as though it were copy.
  // It now describes what the case studies do, which is what it was asking for.
  lead: "The strongest marketing case is what changed after the work started. Each case study sets out the commercial problem, the work delivered and the outcome, with client evidence wherever it is available.",
  cta: { label: "See client results", to: RESULTS_HREF }
};

// --- 09 Ways to work with us ------------------------------------------------
// ONE CONTROL, NOT THREE. Each card carried its own CTA into a seeded form —
// /contactus?enquiry=diagnostic, =managed, =embedded — and the three were
// replaced on 21 Sep by a single section CTA beneath the closing line.
//
// WHAT THAT COSTS, SO IT IS NOT REDISCOVERED AS A BUG. ENQUIRY_SEEDS in
// ContactUsForm still holds all three keys and the URLs still work if one is
// shared or bookmarked, but NOTHING ON THE SITE LINKS THEM ANY MORE. The
// notification email therefore stops telling sales which engagement the
// visitor came in on. That signal is not recoverable from a single control:
// it could only be kept by picking one of the three, which would answer a
// question on the visitor behalf, or by inventing a fourth seed that
// describes none of them.
//
// The label is MINE and is the one piece of copy here that management has not
// seen. It is deliberately neutral because the control now stands for all
// three engagements and the closing line beneath it offers a fourth route.
//
// --- 11 Sep 2026 ------------------------------------------------------------
// The three descriptions below are MANAGEMENT'S OWN WORDS, supplied in reply
// to the 9 Sep question "can sales fulfil these three exactly as advertised?".
// The answer was yes, together with the copy. So these are transcription, not
// authorship, and the same rule the brief's copy takes applies here: do not
// rewrite them for rhythm or length.
//
// What was here before was mine — written in Phase 1 to describe three
// engagement models the brief named but did not define. It read as a spec
// ("For teams that need clarity before committing to execution") rather than
// as an offer. Management's version opens on the buyer's problem and closes on
// what they walk away with, which is why the closing sentence is lifted into
// PointItem's `outcome` slot instead of being run into the paragraph.

export const waysToWorkData: ItemsSectionContent = {
  eyebrow: "Ways to work with us",
  heading: "Buy the growth capability you actually need",
  lead: "Not every company needs a full-service retainer. We structure the engagement around the commercial problem, the capability gap and the level of execution required.",
  items: [
    {
      title: "Growth Diagnostic",
      body: "Find out what is holding your growth back. We assess your marketing, visibility, acquisition and conversion performance to show you what is working, what is not and where the biggest opportunities sit.",
      outcome: "You leave with clear priorities and a practical growth plan."
    },
    {
      title: "Managed Growth Programme",
      body: "We turn the growth plan into action. Our team manages and improves your marketing activity across the channels that matter most connecting strategy, execution and performance around your commercial goals.",
      outcome: "You get ongoing delivery, optimisation and measurable progress."
    },
    {
      title: "Embedded Growth Team",
      body: "Add the marketing capability you need without building the whole team in-house. We provide dedicated specialists who work alongside your business, filling capability gaps and taking responsibility for agreed areas of marketing and growth.",
      outcome:
        "You get the people, expertise and delivery capacity you need without the recruitment overhead."
    }
  ],
  closing:
    "Specialist services can also be scoped individually where focused delivery is all that is required.",
  cta: { label: "Discuss the right engagement", to: "/contactus" }
};

// --- 10 How it works --------------------------------------------------------
// Replaces Book / Audit / Plan / Execute. "Free of charges" and "kick back and
// relax while we handle all the heavy lifting" go with it: the stronger
// proposition is collaborative, evidence-led and accountable, not effortless
// marketing with no input from the client.
//
// The steps are NUMBERED rather than marked with the four process icons. The
// brief numbers them 01-04 and they are a sequence, so a mark would drop the
// one piece of information the ordering carries. The icons are still used by
// the service pages' own process block (servicesData.howWeWork).

export const growthProcessData: ItemsSectionContent = {
  eyebrow: "From first conversation to commercial impact",
  heading: "Clear process. Clear ownership. Clear next step",
  items: [
    {
      index: "01",
      title: "Diagnose",
      body: "We start with the commercial objective, the market, the proposition, what is already working and where growth appears to be blocked."
    },
    {
      index: "02",
      title: "Audit",
      body: "We analyse the relevant funnel, channels, competitors, search visibility, messaging, conversion and measurement to establish the evidence base."
    },
    {
      index: "03",
      title: "Growth Plan",
      body: "You receive a prioritised strategy covering what should change, what should be tested, what Pixelette will own and how performance will be measured."
    },
    {
      index: "04",
      title: "Execute & Optimise",
      body: "Our specialists execute the agreed programme, report against the relevant KPIs and continually improve activity using live performance evidence."
    }
  ],
  cta: { label: "Start with your growth challenge", to: "/contactus" }
};

// --- 11 The wider Pixelette advantage ---------------------------------------
// Kept short on purpose so the Marketing site does not become a second
// Holdings site. Exact legal naming and the live scope of each group company
// are a publication gate.

export const widerAdvantageData: ItemsSectionContent = {
  eyebrow: "Part of Pixelette",
  heading: "Marketing backed by wider technology capability",
  lead: "Pixelette Marketing is the specialist growth business within the wider Pixelette Group. Where a growth problem crosses into software, AI, automation, venture structure or enterprise readiness, we can connect the relevant group capability without forcing the client to assemble a new supplier network.",
  items: [
    {
      title: "Pixelette Technologies",
      body: "Software, AI, automation and product engineering."
    },
    {
      title: "Pixelette Holdings",
      body: "Group-level venture partnership and strategic alignment."
    },
    {
      title: "Pixelette Certified",
      body: "Compliance, assurance and enterprise readiness."
    }
  ],
  closing:
    "Pixelette Marketing remains accountable for the marketing engagement. Wider group capability is brought in only where it is relevant to the outcome."
};

// --- 12 Final conversion ----------------------------------------------------
// The primary CTA is the hero's, unchanged. The brief is explicit that mixing
// CTA labels between the two positions is worse than either label alone.

export const finalConversionCopy = {
  /** The brief pairs "Build my growth plan" with this in the closing block.
   *  The primary is the form itself, which sits beside this copy, so only the
   *  secondary needs a link of its own. */
  secondaryCta: { label: "Talk to Pixelette Marketing", to: "/contactus" },
  heading: "Let's build the growth plan behind your next stage",
  lead: "Tell us where growth is stuck or where you want to get to. We will use the first conversation to understand the commercial objective, what you have already tried, what the numbers say and whether Pixelette is the right fit.",
  closing:
    "No generic proposal. No channel recommendation before we understand the problem."
};
