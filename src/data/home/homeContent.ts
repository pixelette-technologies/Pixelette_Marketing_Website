import type { PointItemContent } from "@/components/feature";
import type { ItemsSectionContent } from "@/components/ui/home";

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

export const heroCopy = {
  eyebrow: "Growth marketing built around commercial outcomes",
  lead: "Pixelette Marketing helps ambitious businesses turn attention into demand, qualified pipeline, customers and measurable growth. We combine positioning, demand generation, search, content, paid media, lifecycle marketing, conversion and growth intelligence into one accountable growth system.",
  reach: "For ambitious businesses across sectors, from launch through scale.",
  primaryCta: { label: "Build my growth plan", to: "/contactus" },
  secondaryCta: { label: "See client results", to: RESULTS_HREF },
  closing:
    "Strategy first. Commercial outcomes. No vanity metrics without context."
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

export const proofCopy = {
  eyebrow: "Trusted by",
  heading: "Selected brands and ventures we have supported.",
  standfirst:
    "From launch positioning to demand generation and conversion, our work is designed around measurable commercial progress.",
  cta: { label: "See client results", to: RESULTS_HREF }
};

// --- 04 Why Pixelette Marketing ---------------------------------------------

export const whyPixeletteData: ItemsSectionContent = {
  eyebrow: "More than marketing activity",
  heading: "A growth partner built around the commercial problem.",
  lead: "Most growth problems are not caused by a single channel. Positioning, demand, content, conversion, data and sales handoff all influence the outcome. Pixelette Marketing brings those pieces together around the commercial objective instead of treating each activity as a separate task.",
  items: [
    {
      title: "Commercial strategy",
      body: "We start with the market, buyer, proposition, sales motion and growth constraint - not a predetermined channel."
    },
    {
      title: "Specialist execution",
      body: "Strategy is translated into campaigns, content, search, paid media, lifecycle and conversion work with clear ownership."
    },
    {
      title: "Technology-enabled delivery",
      body: "Data, automation and AI can accelerate analysis and execution where they improve the work, without replacing human judgement."
    },
    {
      title: "Accountable measurement",
      body: "Reporting is built around what changed, why it changed and what should happen next."
    }
  ]
};

// --- 05 The Pixelette Growth System -----------------------------------------
// The nine service cards consolidated into five parent capabilities. The
// individual service pages stay underneath them for search intent; only the
// homepage stops selling the menu and starts selling the system.

export const growthSystemData: ItemsSectionContent = {
  eyebrow: "One connected growth system",
  heading: "Five capabilities. One commercial objective.",
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

export const aiTechnologyData: ItemsSectionContent = {
  eyebrow: "AI-accelerated. Human-led.",
  heading:
    "Human strategy. AI-accelerated execution. Commercial accountability.",
  lead: "Technology should make marketing faster, smarter and more measurable - not become the pitch. Pixelette combines human-led strategy with AI, automation and data where they improve insight, execution and decision-making.",
  items: [
    {
      title: "Faster insight",
      body: "Support research, market intelligence, campaign analysis and pattern recognition without waiting for manual reporting cycles."
    },
    {
      title: "Smarter prioritisation",
      body: "Use data and structured analysis to identify where attention, budget and experimentation are most likely to matter."
    },
    {
      title: "Scaled execution",
      body: "Accelerate repeatable content, search, lead and reporting workflows while keeping quality controls and human review."
    },
    {
      title: "Clear accountability",
      body: "People remain responsible for strategy, approvals, quality and commercial decisions."
    }
  ],
  closing:
    "The technology stack changes according to the problem. The commercial objective does not."
};

// --- 07 Who we help ---------------------------------------------------------
// Sector experience and growth stage are SEPARATE, which is the point of the
// restructure: "Startup" was a stage sitting in a list of industries, and the
// six-card taxonomy read as a client boundary rather than as experience.
//
// The sector titles keep ArrowCard's two-part shape, brand tone on the first
// half and ink on the second. FinTech has no second half and passes an empty
// string rather than having its name split somewhere it does not divide.

export interface SectorCard {
  mainHeading: string;
  subHeading: string;
  summary: string;
  to: string;
}

export interface WhoWeHelpContent {
  eyebrow: string;
  heading: string;
  lead: string;
  sectors: SectorCard[];
  stages: PointItemContent[];
  cta: { label: string; to: string };
}

export const whoWeHelpData: WhoWeHelpContent = {
  eyebrow: "Who we help",
  heading: "Across sectors. Built around your market.",
  lead: "Pixelette Marketing works with ambitious businesses across sectors. Our experience includes AI, software, FinTech, Web3 and technology platforms, but our marketing offer is not limited to those categories. We build the strategy around your audience, proposition, buying journey, commercial model and growth stage.",
  sectors: [
    {
      mainHeading: "AI",
      subHeading: "& Software",
      summary:
        "For technical products that need clear positioning, buyer education, demand creation and a route from interest to adoption.",
      to: "industries/ai"
    },
    {
      mainHeading: "FinTech",
      subHeading: "",
      summary:
        "For financial technology businesses that need authority, performance and conversion while communicating complex value clearly.",
      to: "industries/fintech"
    },
    {
      mainHeading: "Web3",
      subHeading: "& Digital Assets",
      summary:
        "For products that need credibility, community, partner ecosystems and disciplined demand creation.",
      to: "industries/web_3"
    },
    {
      mainHeading: "Technology",
      subHeading: "& Platforms",
      summary:
        "For technology products and platforms that need to turn capability into clear market position, demand and commercial adoption.",
      to: "industries/tech"
    }
  ],
  stages: [
    {
      title: "Launch",
      body: "Find the position. Build the message. Create demand. Prove the first channels."
    },
    {
      title: "Scale",
      body: "Increase qualified pipeline. Improve conversion. Systemise repeatable growth."
    },
    {
      title: "Established & Enterprise",
      body: "Strengthen authority, attribution, channel coordination, conversion and alignment with more complex buying and sales journeys."
    }
  ],
  cta: { label: "Find your growth route", to: "/industries" }
};

// --- 08 Results -------------------------------------------------------------
// The frame only. The two testimonials stay in teamData.ts and stay VERBATIM;
// the brief bars rewriting them for sales effect.

export const resultsCopy = {
  eyebrow: "Results that matter",
  heading: "Proof before promises.",
  lead: "The strongest marketing case is what changed after the work started. Our results section should show the commercial problem, the work delivered and the outcome - with client evidence wherever it is available.",
  cta: { label: "See client results", to: RESULTS_HREF }
};

// --- 09 Ways to work with us ------------------------------------------------
// Each route carries its own enquiry path. The form reads ?enquiry= and
// preselects what the visitor is trying to improve.
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
  heading: "Buy the growth capability you actually need.",
  lead: "Not every company needs a full-service retainer. We structure the engagement around the commercial problem, the capability gap and the level of execution required.",
  items: [
    {
      title: "Growth Diagnostic",
      body: "Find out what is holding your growth back. We assess your marketing, visibility, acquisition and conversion performance to show you what is working, what is not and where the biggest opportunities sit.",
      outcome: "You leave with clear priorities and a practical growth plan.",
      cta: {
        label: "Request a growth diagnostic",
        to: "/contactus?enquiry=diagnostic"
      }
    },
    {
      title: "Managed Growth Programme",
      body: "We turn the growth plan into action. Our team manages and improves your marketing activity across the channels that matter most - connecting strategy, execution and performance around your commercial goals.",
      outcome: "You get ongoing delivery, optimisation and measurable progress.",
      cta: { label: "Discuss managed growth", to: "/contactus?enquiry=managed" }
    },
    {
      title: "Embedded Growth Team",
      body: "Add the marketing capability you need without building the whole team in-house. We provide dedicated specialists who work alongside your business, filling capability gaps and taking responsibility for agreed areas of marketing and growth.",
      outcome: "You get the people, expertise and delivery capacity you need - without the recruitment overhead.",
      cta: { label: "Build an embedded team", to: "/contactus?enquiry=embedded" }
    }
  ],
  closing:
    "Specialist services can also be scoped individually where focused delivery is all that is required."
};

// --- 10 How it works --------------------------------------------------------
// Replaces Book / Audit / Plan / Execute. "Free of charges" and "kick back and
// relax while we handle all the heavy lifting" go with it: the stronger
// proposition is collaborative, evidence-led and accountable, not effortless
// marketing with no input from the client.
//
// The steps are NUMBERED rather than marked with the four process icons. The
// brief numbers them 01-04 and they are a sequence, so a mark would drop the
// one piece of information the ordering carries. The icons keep their call
// site in talkBusinessData for /story.

export const growthProcessData: ItemsSectionContent = {
  eyebrow: "From first conversation to commercial impact",
  heading: "Clear process. Clear ownership. Clear next step.",
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
  heading: "Marketing backed by wider technology capability.",
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
  heading: "Let's build the growth plan behind your next stage.",
  lead: "Tell us where growth is stuck or where you want to get to. We will use the first conversation to understand the commercial objective, what you have already tried, what the numbers say and whether Pixelette is the right fit.",
  closing:
    "No generic proposal. No channel recommendation before we understand the problem."
};
