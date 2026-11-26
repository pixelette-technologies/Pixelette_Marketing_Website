import { navCta } from "@/data/navigation";
import { servicesData } from "@/data/services/servicesData";

// Locked Email Marketing copy (22 Nov 2026 handoff).
// Meta and the WebBookingPro quotation come from the existing route data.
// The page does not claim that quotation describes an email campaign.

const emailSource = servicesData.find(item => item.route === "email_marketing");
const webBookingPro = emailSource?.review.data.find(
  item => item.name === "Ivan Petrovic"
);

export const emailMarketingMeta = {
  title: emailSource?.metaTitle ?? "Email Marketing Agency | Pixelette Marketing",
  description:
    emailSource?.metaDescription ??
    "Email marketing built around strategy, segmentation and automation, from onboarding sequences to lifecycle campaigns, measured against commercial outcomes.",
  keywords:
    emailSource?.metaKeywords ??
    "email marketing agency, email marketing services, email automation, email solutions"
};

export const emailStages = [
  {
    id: "welcome",
    label: "Welcome",
    subject: "Welcome — your first insights are here",
    headline: "A warmer welcome",
    body: "Thanks for joining our community. Expect practical insights, sharper thinking and useful ideas to help your marketing work harder.",
    cta: "Explore the insights",
    href: "/blog-list"
  },
  {
    id: "nurture",
    label: "Nurture",
    subject: "Your monthly marketing brief",
    headline: "Your monthly marketing brief",
    body: "Fresh ideas on audience engagement, content and smarter automation, curated to help you make informed decisions.",
    cta: "Explore the insights",
    href: "/blog-list"
  },
  {
    id: "convert",
    label: "Convert",
    subject: "Ready for the next step?",
    headline: "Make your next move count",
    body: "Explore how strategy, creative and lifecycle automation could support a more effective email programme.",
    cta: "Discuss your project",
    href: navCta.to
  },
  {
    id: "reengage",
    label: "Re-engage",
    subject: "Let's reconnect",
    headline: "Let's reconnect",
    body: "It's been a while. Here are some ideas and updates you may find useful as your priorities evolve.",
    cta: "See what's new",
    href: "/blog-list"
  }
] as const;

export type EmailStageId = (typeof emailStages)[number]["id"];

export const emailMarketingContent = {
  hero: {
    eyebrow: "Email marketing",
    headingLead: "Turn every email into an opportunity to connect, engage",
    headingEmphasis: "and convert",
    lead: "Email campaigns, intelligent automation and lifecycle marketing that build relationships and drive measurable business outcomes.",
    note: "Illustrative email sequence"
  },
  deliver: {
    heading: "What we deliver",
    items: [
      {
        number: "01",
        title: "Strategy and segmentation",
        body: "Audience research, segmentation and relevant messaging"
      },
      {
        number: "02",
        title: "Email creative and campaigns",
        body: "Compelling copy, design and campaign delivery"
      },
      {
        number: "03",
        title: "Lifecycle automation",
        body: "Welcome, nurture and re-engagement journeys"
      },
      {
        number: "04",
        title: "Optimisation and deliverability",
        body: "Testing, inbox performance and continuous improvement"
      }
    ]
  },
  measure: {
    label: "What we measure",
    items: ["Deliverability", "Click engagement", "Conversions", "Retention"]
  },
  feedback: {
    heading: "Client feedback",
    quote:
      webBookingPro?.detail ??
      "The team's expertise positioned WebBookingPro as a trusted solution for accommodation providers worldwide.",
    name: "Ivan Petrovic",
    role: "CEO, WebBookingPro"
  },
  close: {
    heading: "Make every email count",
    lead: "Let's build an email programme that works harder for your business.",
    cta: { label: "Discuss your project", href: navCta.to }
  },
  faqs: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Do you create and manage automated email journeys?",
        answer:
          "Yes. As an email marketing agency we create and manage automated journeys for welcome, nurture and re-engagement. Our email marketing services cover segmentation, newsletter and campaign creative, and email automation matched to the relationship."
      },
      {
        question: "How do you improve email deliverability and engagement?",
        answer:
          "We improve deliverability through list hygiene, correct formatting and reputable sending platforms, then test creative and timing. Email campaign optimisation looks at click engagement, conversions and retention. We do not publish figures we cannot source."
      }
    ]
  }
};
