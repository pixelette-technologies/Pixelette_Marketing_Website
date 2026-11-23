import { SITE_URL } from "@/data/site";
import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";
import PrClose from "./PrClose";
import PrDeliver from "./PrDeliver";
import PrFaq from "./PrFaq";
import PrHero from "./PrHero";
import PrMeasure from "./PrMeasure";

// /services/pr — locked PR & Earned Media design (20 Nov 2026).
// Hero, four text columns, one measure line, closing CTA, two FAQs.
// Site header and footer stay on the root layout.

const PrEarnedMediaPage = () => {
  const url = `${SITE_URL}/services/pr`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "PR & Earned Media",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: prEarnedMediaContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='prPage'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PrHero />
      <PrDeliver />
      <PrMeasure />
      <PrClose />
      <PrFaq />
    </div>
  );
};

export default PrEarnedMediaPage;
