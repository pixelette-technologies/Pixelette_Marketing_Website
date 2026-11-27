import { paidMediaContent } from "@/data/services/paidMedia";
import { SITE_URL } from "@/data/site";
import PaidMediaClose from "./PaidMediaClose";
import PaidMediaDeliver from "./PaidMediaDeliver";
import PaidMediaFaq from "./PaidMediaFaq";
import PaidMediaHero from "./PaidMediaHero";
import PaidMediaMeasure from "./PaidMediaMeasure";

// /services/ads_ppc — locked Paid Media & PPC design (22 Nov 2026).
// Site header and footer stay on the root layout.
// No other service route uses this composition.
// The campaign art is an in-house hypothetical sample, not a client result.

const PaidMediaPage = () => {
  const url = `${SITE_URL}/services/ads_ppc`;

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
        name: "Paid Media & PPC",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: paidMediaContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='ppcPage' data-reveal='off'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PaidMediaHero />
      <PaidMediaDeliver />
      <PaidMediaMeasure />
      <PaidMediaClose />
      <PaidMediaFaq />
    </div>
  );
};

export default PaidMediaPage;
