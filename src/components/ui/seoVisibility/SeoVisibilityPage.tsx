import { seoVisibilityContent } from "@/data/services/seoVisibility";
import { SITE_URL } from "@/data/site";
import SeoClose from "./SeoClose";
import SeoFaq from "./SeoFaq";
import SeoHero from "./SeoHero";
import SeoSystem from "./SeoSystem";
import SeoWork from "./SeoWork";

// /services/seo_and_content_marketing — locked SEO, Content & AI Visibility
// design (22 Nov 2026). Site header and footer stay on the root layout.
// No other service route uses this composition.

const SeoVisibilityPage = () => {
  const url = `${SITE_URL}/services/seo_and_content_marketing`;

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
        name: "SEO, Content & AI Visibility",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoVisibilityContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='seoPage' data-reveal='off'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoHero />
      <SeoWork />
      <SeoSystem />
      <SeoClose />
      <SeoFaq />
    </div>
  );
};

export default SeoVisibilityPage;
