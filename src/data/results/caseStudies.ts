import { blockGuardQuote, webBookingProQuote } from "@/data/teamData";
import type { CaseStudyContent } from "@/components/ui/results";

// The two case studies, supplied by management on 11 Sep 2026 in answer to the
// 9 Sep request for evidence-led client stories. The brief names these as the
// next content priority for /results, and until now that page carried the
// frame and two detached quotations and nothing else.
//
// EVERY WORD BELOW IS MANAGEMENT'S. Nothing is paraphrased, nothing is
// sharpened, and no figure is restated in a rounder form. The brief's metric
// gate bars publishing a number the business has not put its name to, and the
// counterpart of that rule is that a number it HAS put its name to is
// published exactly as given.
//
// ONE THING IS STILL MISSING AND IT IS DELIBERATE THAT IT IS NOT INVENTED.
// None of the BlockGuard figures carry a measurement period. The brief's gate
// asks for measure, period, client and permission; we now hold three of the
// four. Inside a case study the before-and-after is self-describing, so they
// publish here. They must NOT be lifted onto the home page as standalone proof
// numbers until someone states the window they cover. That question is open
// with management.
//
// The quotations are imported rather than retyped. They are the same two
// sentences TeamSection renders on the home page, and a second copy here is
// how a testimonial quietly drifts from the one the client approved.

// --- 28 Sep 2026: the figures, once, in a shape that can be drawn ------------
// The creative transformation brief moves BlockGuard onto the home page and
// the Industries page as "Proof, not promises" and asks for the figures to be
// shown as progression, not as a row of cards. It also says: verify them
// against the approved Results content and do not alter them.
//
// So they are stated ONCE, here, as numbers with their approved display
// strings, and the /results list below is BUILT from them rather than typed a
// second time. The labels it renders are unchanged to the character. A figure
// corrected here is corrected on every page at once, and a figure cannot be
// restated on the home page in a rounder form than /results carries.
//
// THE HOME-PAGE RULE ABOVE STILL HOLDS, and this is how it is being met rather
// than set aside (decided 28 Sep): the figures travel only inside the case
// study — client named, before-and-after pairs shown as pairs, the campaign
// totals labelled as campaign totals, and a link to the full study beside
// them. They are never lifted out as standalone headline numbers. The
// measurement period is still unknown and is still not invented.

export interface EvidenceProgression {
  from: number;
  to: number;
  fromLabel: string;
  toLabel: string;
  /** The measure, e.g. "ranking keywords". */
  label: string;
}

export interface EvidenceTotal {
  value: number;
  display: string;
  label: string;
}

/** A study's measured outcomes, in the shape ProofFeature draws. A study
 *  WITHOUT this is qualitative and renders through EvidenceStory instead —
 *  which is the whole of the rule that weak evidence is never made to look
 *  like strong evidence: the data decides the component, not the call site. */
export interface CaseStudyEvidence {
  progressions: EvidenceProgression[];
  totals: EvidenceTotal[];
}

const blockGuardEvidence: CaseStudyEvidence = {
  progressions: [
    { from: 5, to: 160, fromLabel: "5", toLabel: "160", label: "ranking keywords" },
    {
      from: 200,
      to: 16900,
      fromLabel: "200",
      toLabel: "16.9k",
      label: "organic impressions"
    }
  ] as EvidenceProgression[],
  totals: [
    { value: 2435, display: "2,435", label: "campaign participants" },
    { value: 29974, display: "29,974", label: "campaign engagements" },
    { value: 975, display: "975", label: "new Telegram and Discord community members" }
  ] as EvidenceTotal[]
};

export const caseStudies: CaseStudyContent[] = [
  {
    client: "BlockGuard",
    heading: "Building visibility and community for a growing Web3 ecosystem",
    challenge:
      "BlockGuard needed to strengthen its digital presence, build community and create momentum around the wider Fusio ecosystem.",
    work: "Pixelette delivered an integrated programme spanning strategy, campaigns, content, social media, community growth and search visibility.",
    impactHeading: "The impact",
    impactStyle: "figures",
    evidence: blockGuardEvidence,
    // Built from blockGuardEvidence above. Renders exactly as the five lines
    // it replaced: "160 / ranking keywords - up from 5" and so on.
    impact: [
      ...blockGuardEvidence.progressions.map(p => ({
        value: p.toLabel,
        label: `${p.label} - up from ${p.fromLabel}`
      })),
      ...blockGuardEvidence.totals.map(t => ({ value: t.display, label: t.label }))
    ],
    closing:
      "From search visibility to community activation, we connected strategy and execution to create measurable growth across multiple digital channels.",
    quote: blockGuardQuote
  },
  {
    client: "WebBookingPro",
    heading: "Building greater visibility in a competitive hospitality market",
    challenge:
      "WebBookingPro needed to increase awareness and strengthen its position with accommodation providers in a crowded hospitality technology market.",
    work: "Pixelette supported the business with targeted digital marketing, market positioning, outreach and partnership development helping it build greater visibility and stronger connections across the hospitality sector.",
    impactHeading: "The impact",
    // Qualitative, because that is what management supplied. Four sentences
    // dressed as figures would be four invented numbers.
    impactStyle: "statements",
    impact: [
      { label: "A stronger digital presence." },
      { label: "Greater visibility with accommodation providers." },
      { label: "New commercial relationships across the hospitality market." },
      {
        label:
          "A clearer position for WebBookingPro as an accommodation technology solution."
      }
    ],
    quote: webBookingProQuote
  }
];

export default caseStudies;

// --- Evidence architecture, 28 Sep 2026 (brief, section 20) -----------------
// "As more case studies are created, design the component architecture so
// additional cases can be added easily. Do not display empty slots."
//
// Add a study to the list above and it appears everywhere it should, with
// nothing else to edit: a study carrying `evidence` joins measuredStudies and
// is drawn by ProofFeature; one without joins qualitativeStudies and is drawn,
// smaller, by EvidenceStory. The first measured study is the lead proof under
// the home hero. The pages map over these lists, so an empty list renders
// nothing — there is no slot to leave empty.

export const measuredStudies = caseStudies.filter(
  (s): s is CaseStudyContent & { evidence: CaseStudyEvidence } => Boolean(s.evidence)
);
export const qualitativeStudies = caseStudies.filter(s => !s.evidence);

/** The anchor a study's section carries on /results, from its client name. */
export const caseAnchor = (client: string) =>
  client.toLowerCase().replace(/[^a-z0-9]+/g, "-");
