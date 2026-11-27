import { navCta } from "@/data/navigation";
import { servicesData } from "@/data/services/servicesData";

// Locked Lead Generation & Audience Acquisition copy (22 Nov 2026 handoff).
// The title stays the existing route title so "lead generation" remains the
// primary search term. The description is widened: the previous sentence
// promised a handoff to sales, which the approved page does not claim.
// FAQ answers stay inside what the site already says it does, plus the
// outcome types on this page. They do not promise a result.

const leadSource = servicesData.find(item => item.route === "lead_generation");

export const leadGenerationMeta = {
  title: leadSource?.metaTitle ?? "Lead Generation | Pixelette Marketing",
  description:
    "Lead generation and audience acquisition for qualified enquiries, applications, registrations and participation, with audience research, campaigns, landing pages and follow-up.",
  keywords:
    leadSource?.metaKeywords ??
    "lead generation services, lead generation agency, b2b lead generation, qualified pipeline"
};

export const leadGenerationContent = {
  hero: {
    eyebrow: "Lead generation & audience acquisition",
    headingLead: "Turn the right interest into",
    headingEmphasis: "meaningful action",
    lead: "We help organisations reach the right audiences and turn interest into qualified enquiries, applications, registrations and participation.",
    cta: { label: "Discuss your project", href: navCta.to },
    strap: "Interest becomes action when the next step matters",
    artAlt:
      "Illustrative triptych with a smooth exclamation mark, the word ACTION repeated on red, and a textured exclamation mark on pink"
  },
  outcomes: [
    {
      title: "Qualified enquiries",
      body: "For relevant commercial conversations"
    },
    {
      title: "Applications",
      body: "For programmes, opportunities and services"
    },
    {
      title: "Participation",
      body: "For events, initiatives and engagement"
    }
  ],
  offer: {
    label: "The offer",
    heading: "Designed around the response you need",
    intro:
      "Audience intelligence, compelling campaigns and considered conversion journeys, aligned to what you want people to do next.",
    items: [
      {
        title: "Audience and account research",
        body: "Identify and prioritise the right audiences, with clear routes to reach them."
      },
      {
        title: "Campaigns and landing pages",
        body: "Create persuasive experiences that make the next step clear and easy."
      },
      {
        title: "Lead capture and qualification",
        body: "Support enquiries, applications, registrations and other agreed actions."
      },
      {
        title: "Nurturing and follow-up",
        body: "Improve relevance, follow-up and the quality of responses over time."
      }
    ],
    measureLead: "Measure the response,",
    measureEmphasis: "not just the reach"
  },
  close: {
    heading: "Let's talk about your next opportunity",
    lead: "Tell us what you want to achieve and we'll explore the right approach.",
    cta: { label: "Discuss your project", href: navCta.to }
  },
  faqs: {
    heading: "Useful questions",
    items: [
      {
        question: "Can you support both commercial and public-interest campaigns?",
        answer:
          "Yes. Pixelette Marketing works with businesses and with public-sector organisations. A commercial brief can aim at qualified enquiries. A public-interest brief can aim at applications, registrations or participation."
      },
      {
        question: "How do you identify and reach the right audiences?",
        answer:
          "Audience and account research comes first: who should respond, and the clearest route to reach them. Campaigns, landing pages and follow-up are then built around that group."
      },
      {
        question: "What outcomes can your campaigns help generate?",
        answer:
          "Qualified enquiries, applications, registrations and participation. The brief decides which of those matters. The work attracts, captures, qualifies and nurtures a relevant response."
      }
    ]
  }
};
