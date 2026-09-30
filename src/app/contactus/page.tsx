import {
  ContactFaq,
  ContactGetInTouch,
  ContactRoutes,
  ContactUsHero,
  HowItWork
} from "@/components/ui/contactUs";
import { contactFaqs } from "@/data/contactUs";
import type { Metadata } from "next";

// 30 Sep 2026: rebuilt on the Pixelette Technologies contact page. Hero,
// offices beside the form, what happens next, other routes in, FAQ.

const BASE_URL = "https://www.pixelettemarketing.com";
const PAGE_URL = `${BASE_URL}/contactus`;

const description =
  "Tell us what needs to grow. Tell us what you know and skip what you do not. One of us replies, not a sequence, and if we are not the right fit we will say so.";

export const metadata: Metadata = {
  title: "Contact | Pixelette Marketing",
  description,
  keywords: ["growth marketing", "digital marketing agency"],
  alternates: {
    canonical: PAGE_URL
  },
  openGraph: {
    title: "Contact | Pixelette Marketing",
    description,
    url: PAGE_URL,
    siteName: "Pixelette Marketing",
    type: "website"
  }
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: PAGE_URL,
  about: { "@id": `${BASE_URL}/#organization` }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.items.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer }
  }))
};

export default function ContactUs() {
  return (
    <>
      {[contactPageSchema, breadcrumbSchema, faqSchema].map(schema => (
        <script
          key={schema["@type"]}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ContactUsHero />
      <ContactGetInTouch />
      <HowItWork />
      <ContactRoutes />
      <ContactFaq />
    </>
  );
}
