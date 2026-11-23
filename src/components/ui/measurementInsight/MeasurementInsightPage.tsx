import { measurementInsightContent } from "@/data/services/measurementInsight";
import { SITE_URL } from "@/data/site";
import MeasurementCapabilities from "./MeasurementCapabilities";
import MeasurementClose from "./MeasurementClose";
import MeasurementExplore from "./MeasurementExplore";
import MeasurementFaq from "./MeasurementFaq";
import MeasurementHero from "./MeasurementHero";

// /services/marketing_analytics_and_reporting — approved Measurement & Insight
// design (22 Nov 2026). Header and footer stay on the root layout.
// No other route uses this composition.
// The chart is a local demonstration, not a client result or a live feed.

const MeasurementInsightPage = () => {
  const url = `${SITE_URL}/services/marketing_analytics_and_reporting`;

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
        name: "Measurement & Insight",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: measurementInsightContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='miPage' data-reveal='off'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MeasurementHero />
      <MeasurementExplore />
      <MeasurementCapabilities />
      <MeasurementClose />
      <MeasurementFaq />
    </div>
  );
};

export default MeasurementInsightPage;
