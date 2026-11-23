import { leadGenerationContent } from "@/data/services/leadGeneration";
import { SITE_URL } from "@/data/site";
import LeadClose from "./LeadClose";
import LeadFaq from "./LeadFaq";
import LeadHero from "./LeadHero";
import LeadOffer from "./LeadOffer";

// /services/lead_generation — locked Lead Generation design (22 Nov 2026).
// Site header and footer stay on the root layout.
// No other service route uses this composition.
// The hero artwork is the supplied triptych. It is not a client result.

const LeadGenerationPage = () => {
  const url = `${SITE_URL}/services/lead_generation`;

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
        name: "Lead Generation",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: leadGenerationContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='lgPage' data-reveal='off'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LeadHero />
      <LeadOffer />
      <LeadClose />
      <LeadFaq />
    </div>
  );
};

export default LeadGenerationPage;
