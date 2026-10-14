import {
  ContactFaq,
  ContactGetInTouch,
  ContactRoutes,
  ContactUsHero,
  HowItWork
} from "@/components/ui/contactUs";
import { contactFaqs } from "@/data/contactUs";
import { pageMetadata, SITE_URL } from "@/data/site";

// 30 Sep 2026: rebuilt on the Pixelette Technologies contact page. Hero,
// offices beside the form, what happens next, other routes in, FAQ.

const PAGE_URL = `${SITE_URL}/contactus`;

const description =
  "Tell us what needs to grow. Tell us what you know and skip what you do not. One of us replies, not a sequence, and if we are not the right fit we will say so.";

export const metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contactus",
  keywords: ["contact Pixelette Marketing", "growth marketing", "growth plan"]
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: PAGE_URL,
  about: { "@id": `${SITE_URL}/#organization` }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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
