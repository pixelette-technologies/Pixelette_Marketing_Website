import { navCta } from "@/data/navigation";
import { paidMediaAndPpc } from "@/data/services/specialist/demandPerformance";

// Locked Paid Media & PPC copy (22 Nov 2026 handoff).
// Meta stays the existing specialist title and description.
// Wording follows the copy lock. The four muted measure notes are the
// annotations printed on the approved revised mockup, not results.
// FAQ answers are shortened from the previous specialist page. They describe
// the service and do not promise a result.

export const paidMediaMeta = {
  title: paidMediaAndPpc.meta.title,
  description: paidMediaAndPpc.meta.description
};

export const paidMediaContent = {
  hero: {
    eyebrow: "Paid media & PPC",
    headingLead: "Make paid media accountable to commercial outcomes,",
    headingEmphasis: "not clicks",
    lead: "Paid search, paid social and creative testing to reach the right audiences and invest in what works.",
    cta: { label: "Discuss your project", href: navCta.to },
    campaignLabel: "Collaboration campaign",
    campaignNote: "One campaign · Two creative treatments · Designed for testing",
    lineOne: "Great teams",
    lineTwo: "Greater possibilities",
    support: "A shared space for ideas, collaboration and progress.",
    sampleCta: "Explore the possibilities"
  },
  deliver: {
    heading: "What we deliver",
    caption: "Audience strategy, campaign creative and disciplined testing",
    items: [
      {
        index: "01",
        title: "Media strategy and targeting",
        body: "Select the right audiences, channels and budgets."
      },
      {
        index: "02",
        title: "Paid search",
        body: "Reach people actively looking for a solution."
      },
      {
        index: "03",
        title: "Paid social and retargeting",
        body: "Build demand and reconnect with relevant audiences."
      },
      {
        index: "04",
        title: "Creative testing and optimisation",
        body: "Learn from the response and refine what works."
      }
    ]
  },
  measure: {
    heading: "What we measure",
    intro: "Focus on the quality and cost of meaningful actions, not vanity metrics.",
    items: [
      { label: "Cost per qualified action", note: "Efficiency" },
      { label: "Conversion rate", note: "Response" },
      { label: "Campaign efficiency", note: "Spend" },
      { label: "Creative learning", note: "Improvement" }
    ]
  },
  close: {
    heading: "Have a campaign objective in mind?",
    lead: "Tell us what you're aiming to achieve and we'll shape the right paid media approach.",
    cta: { label: "Discuss your project", href: navCta.to }
  },
  faqs: {
    heading: "Useful questions",
    items: [
      {
        question: "Which paid channels are right for my objectives?",
        answer:
          "Paid search, paid social and retargeting follow the audience and the commercial objective. Channel choice is not taken from a fixed platform list."
      },
      {
        question: "How do you approach creative testing?",
        answer:
          "Where creative testing is in scope, it shows which messages and formats create a meaningful response, so the campaign can refine what works."
      },
      {
        question: "How will campaign performance be measured?",
        answer:
          "Performance is read from the quality and cost of meaningful actions: cost per qualified action, conversion rate, campaign efficiency and creative learning. Measurement is agreed before spend, and it is not a promise of a particular result."
      }
    ]
  }
};
