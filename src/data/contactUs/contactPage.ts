import { DIAGNOSTIC_HREF, strategyHero } from "@/data/strategy";
import { PRIVACY_HREF } from "@/data/legal";

// /contactus, rebuilt 30 Sep 2026 on the Pixelette Technologies contact page:
// hero, offices beside the form, other routes in, and a short FAQ. Their
// structure, this company's content.
//
// EVERYTHING HERE IS SAID ELSEWHERE ON THE SITE ALREADY, or is a promise about
// how an enquiry is handled. No response time, no free call, no priced plan:
// all three are open in 09 Outstanding and none has been confirmed.

export const CONTACT_EMAIL = "sales@pixelettemarketing.com";

export const contactHero = {
  eyebrow: "Contact",
  // The signed-off h1 from the 25 Sep correction pass, kept.
  heading: "Tell us what needs to grow",
  lead: "Some teams arrive knowing exactly where growth is stuck. Others only know that the numbers are not moving. Both are worth the same conversation: what is really limiting growth, where the strongest opportunity sits and what has to happen first. Tell us what you know and skip what you do not. One of us replies, not a sequence.",
  // The home page's closing line, which is the same promise.
  closing:
    "No generic proposal. No channel recommendation before we understand the problem. If we are not the right fit, we will say so."
};

export interface Office {
  name: string;
  /** Small label under the name. */
  note?: string;
  address: string[];
  phone: { label: string; href: string };
}

// London is the registered office management supplied on 22 Sep 2026, the
// same address the footer and the JSON-LD carry. The US office is the group's
// Naples address, as the Pixelette Technologies contact page states it; the
// +1 number was already on this page.
//
// This replaces locatedData.ts, kept since 21 Sep as the only copy of the
// address "likely wanted again in another form". This is that form.
export const offices: Office[] = [
  {
    name: "London, United Kingdom",
    note: "Registered office",
    address: ["77 Fulham Palace Road", "London W6 8JA", "United Kingdom"],
    phone: { label: "+44 20 4518 8226", href: "tel:+442045188226" }
  },
  {
    name: "United States",
    address: ["6305 Naples Blvd", "Naples, FL 34109", "USA"],
    phone: { label: "+1 773 270 9034", href: "tel:+17732709034" }
  }
];

export const contactForm = {
  heading: "Let’s get started"
};

export interface ContactRoute {
  heading: string;
  text: string;
  link: { label: string; href: string };
}

// Three ways in that are not the form. Each goes somewhere real: the live
// diagnostic, the privacy statement, the sales inbox.
export const contactRoutes = {
  heading: "Other routes in",
  items: [
    {
      heading: "Not sure where to start?",
      // The facts are the diagnostic's own, so the two cannot drift.
      text: `The Strategy & Positioning Diagnostic is ${strategyHero.facts[0]} across ${strategyHero.facts[1]}, with an instant result that names the earliest layer still unresolved. A useful first read before a conversation.`,
      link: { label: "Take the diagnostic", href: DIAGNOSTIC_HREF }
    },
    {
      heading: "Procurement and supplier checks",
      text: "Data handling, privacy and company details go direct to your reviewer. Tell us what your review needs and who it should go to, and we will send what we can evidence.",
      link: { label: "Read the privacy notice", href: PRIVACY_HREF }
    },
    {
      heading: "Press and speaking",
      text: "Happy to talk on the record about growth, positioning and how buyers now find and shortlist suppliers, including through AI search.",
      link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }
    }
  ] satisfies ContactRoute[]
};

export interface ContactFaqItem {
  question: string;
  answer: string;
}

// Rendered as <details> and as FAQPage JSON-LD from the same array.
// The in-house answer is the Embedded Growth Team's own description on the
// home page, and the closing line of that section, in fewer words.
export const contactFaqs = {
  eyebrow: "FAQs",
  heading: "Questions worth answering",
  items: [
    {
      question: "Do I need to know which service I need?",
      answer:
        "No. Tell us what you are trying to improve and what is happening now. We make no channel recommendation before we understand the problem; the first conversation is there to find where the strongest opportunity sits."
    },
    {
      question: "What is worth including in the enquiry?",
      answer:
        "The commercial objective, what is happening now, what you have already tried and what the numbers say, as far as you know them. Company, website and focus can be left blank. We would rather ask than have you guess."
    },
    {
      question: "Can you work alongside our in-house team?",
      answer:
        "Yes. An Embedded Growth Team adds dedicated specialists who work alongside your business, filling capability gaps and taking responsibility for agreed areas of marketing and growth. Specialist services can also be scoped individually where focused delivery is all that is required."
    },
    {
      question: "We have a supplier questionnaire. Where does it go?",
      answer: `Send it to ${CONTACT_EMAIL}, or mention it in the enquiry, and tell us who the response should go to. We will complete it with what we can evidence rather than publishing that detail on this site.`
    }
  ] satisfies ContactFaqItem[]
};
