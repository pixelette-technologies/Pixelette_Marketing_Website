import { SITE_URL } from "@/data/site";
import SocialClose from "./SocialClose";
import SocialCommunityBand from "./SocialCommunityBand";
import SocialDeliver from "./SocialDeliver";
import SocialHero from "./SocialHero";
import SocialMeasure from "./SocialMeasure";

// /services/social_media_marketing — locked Social & Community design
// (20 Nov 2026). Hero + What we deliver + From content to community +
// What we measure + closing. Site header/footer from root layout.

const SocialCommunityPage = () => {
  const url = `${SITE_URL}/services/social_media_marketing`;

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
        name: "Social & Community",
        item: url
      }
    ]
  };

  return (
    <div className='scPage'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SocialHero />
      <SocialDeliver />
      <SocialCommunityBand />
      <SocialMeasure />
      <div className='scCloseWrap'>
        <SocialClose />
      </div>
    </div>
  );
};

export default SocialCommunityPage;
