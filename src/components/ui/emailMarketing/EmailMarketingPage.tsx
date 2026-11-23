import { SITE_URL } from "@/data/site";
import { emailMarketingContent } from "@/data/services/emailMarketing";
import EmailClose from "./EmailClose";
import EmailDeliver from "./EmailDeliver";
import EmailFaq from "./EmailFaq";
import EmailFeedback from "./EmailFeedback";
import EmailHero from "./EmailHero";

// /services/email_marketing — locked Email Marketing design (22 Nov 2026).
// Welcome hero, four-stage email preview, compact lower page.
// Site header and footer stay on the root layout.

const EmailMarketingPage = () => {
  const url = `${SITE_URL}/services/email_marketing`;

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
        name: "Email Marketing Agency | Pixelette Marketing",
        item: url
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: emailMarketingContent.faqs.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <div className='emPage'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmailHero />
      <EmailDeliver />
      <EmailFeedback />
      <EmailClose />
      <EmailFaq />
    </div>
  );
};

export default EmailMarketingPage;
