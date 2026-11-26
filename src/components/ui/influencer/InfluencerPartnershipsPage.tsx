import { SITE_URL } from "@/data/site";
import InfluencerClose from "./InfluencerClose";
import InfluencerDeliver from "./InfluencerDeliver";
import InfluencerHero from "./InfluencerHero";

// /services/influencer_marketing — approved Influencer & Partnerships design
// (20 Nov 2026). Hero + What we deliver + closing only. Site header/footer
// come from the root layout. No Approach / FAQ / narrative extras.

const InfluencerPartnershipsPage = () => {
  const url = `${SITE_URL}/services/influencer_marketing`;

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
        name: "Influencer & Partnerships",
        item: url
      }
    ]
  };

  return (
    <div className='ipPage'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InfluencerHero />
      <InfluencerDeliver />
      <div className='ipCloseWrap'>
        <InfluencerClose />
      </div>
    </div>
  );
};

export default InfluencerPartnershipsPage;
