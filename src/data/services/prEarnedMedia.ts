import { navCta } from "@/data/navigation";
import { prAndEarnedMedia } from "@/data/services/specialist/demandPerformance";

// Locked PR & Earned Media copy (20 Nov 2026 handoff).
// Meta stays the specialist page's existing title and description.
// FAQ answers reuse the standing claims already on this route: earned media
// is not guaranteed, and impact is measured as conditions rather than pipeline.

export const prEarnedMediaMeta = prAndEarnedMedia.meta;

export const prEarnedMediaContent = {
  hero: {
    eyebrow: "PR & Earned Media",
    headingLines: ["Build credibility.", "Strengthen reputation."],
    headingClose: "Communicate with",
    headingEmphasis: "confidence",
    lead: "Strategic communications that build trust, manage risk and create a lasting positive profile with the audiences that matter most.",
    statement: ["One story.", "Different audiences.", "Clear messages"]
  },
  audiences: [
    { id: "media", label: "Media" },
    { id: "employees", label: "Employees" },
    { id: "stakeholders", label: "Stakeholders" },
    { id: "public", label: "Public & Communities" }
  ] as const,
  deliver: {
    heading: "What we deliver",
    items: [
      {
        title: "Brand & Narrative",
        body: "A clear, compelling story that builds understanding and trust."
      },
      {
        title: "Reputation & Issues",
        body: "Proactive, responsive communications that protect and strengthen your standing."
      },
      {
        title: "Stakeholder Communications",
        body: "Targeted engagement with investors, partners, regulators and key audiences."
      },
      {
        title: "Internal & Change",
        body: "Communications that inform, align and bring people with you through change."
      }
    ]
  },
  measure: {
    heading: "What we measure",
    line: "Reputation & sentiment · Message understanding · Relevant conversations · Engagement & response"
  },
  close: {
    heading: "Let’s make your message matter.",
    lead: "Speak to us about your communications objectives.",
    cta: { label: navCta.label, href: navCta.to }
  },
  faqs: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Can you support both proactive PR and reputation management?",
        answer:
          "Yes. Proactive PR is media relations and a story worth earning attention. Reputation management is that same discipline when scrutiny arrives: issues readiness and message discipline that protect standing. The work also covers stakeholder communications and internal communications through change. Earned media cannot be credibly guaranteed."
      },
      {
        question: "How do you measure the impact of your communications work?",
        answer:
          "We measure the conditions this work is built to change: reputation and sentiment against a baseline, whether the intended audiences understand the message, the share of relevant conversation, and the quality of engagement and response. We do not treat it as a pipeline, and we name what we cannot attribute."
      }
    ]
  }
};
