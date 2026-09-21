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

export const caseStudies: CaseStudyContent[] = [
  {
    client: "BlockGuard",
    heading: "Building visibility and community for a growing Web3 ecosystem",
    challenge:
      "BlockGuard needed to strengthen its digital presence, build community and create momentum around the wider Fusio ecosystem.",
    work: "Pixelette delivered an integrated programme spanning strategy, campaigns, content, social media, community growth and search visibility.",
    impactHeading: "The impact",
    impactStyle: "figures",
    impact: [
      { value: "160", label: "ranking keywords - up from 5" },
      { value: "16.9k", label: "organic impressions - up from 200" },
      { value: "2,435", label: "campaign participants" },
      { value: "29,974", label: "campaign engagements" },
      { value: "975", label: "new Telegram and Discord community members" }
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
