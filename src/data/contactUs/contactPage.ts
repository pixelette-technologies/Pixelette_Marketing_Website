import { DIAGNOSTIC_HREF, strategyHero } from "@/data/strategy";

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
  heading: "Tell us what you want to achieve",
  lead: "Businesses, public bodies and community organisations can start in the same place. Tell us the objective, who you need to reach and what is getting in the way. Tell us what you know and skip what you do not. One of us replies, not a sequence.",
  closing:
    "No generic proposal. No recommendation before we understand the objective. If we are not the right fit, we will say so."
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

// Ways in that are not the form. Each goes somewhere real: the live
// diagnostic, the sales inbox.
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
      heading: "Press and speaking",
      text: "Happy to talk on the record about growth, positioning and how buyers now find and shortlist suppliers, including through AI search.",
      link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }
    }
  ] satisfies ContactRoute[]
};

/** Company number — identical to `company.companyNumber`. */
export const CONTACT_COMPANY_NUMBER = "17508478";

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
        "The objective, who you need to reach, what is happening now and what you have already tried, as far as you know them. Company, website and focus can be left blank. We would rather ask than have you guess."
    },
    {
      question: "Can you work alongside our in-house team?",
      answer:
        "Yes. We can add specialists who work alongside your team, fill capability gaps and take responsibility for agreed areas of marketing and communications. Specialist services can also be scoped individually where focused delivery is all that is required."
    },
    {
      question: "We have a supplier questionnaire. Where does it go?",
      answer:
        "Accessibility and Social value are published. For a questionnaire, pre-qualification document or framework response, send it to sales@pixelettemarketing.com. We complete what we can evidence and say plainly where we cannot yet evidence something."
    }
  ] satisfies ContactFaqItem[]
};
