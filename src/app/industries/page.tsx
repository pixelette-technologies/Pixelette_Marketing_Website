import { Container } from "@/components/common";
import SectorsOverview from "@/components/ui/industries/SectorsOverview";
import { sectorsOverview } from "@/data/industries/sectorsOverview";
import { pageMetadata, SITE_URL } from "@/data/site";

// 24 Nov 2026. The final Sectors handoff replaces the four-chapter Industries
// hub on this route. The URL stays /industries. The visible name is Sectors.
// Specialist /industries/[slug] pages are untouched. Work in practice now
// lives on /results; the homepage proof teaser points there.

const description =
  "Every market has its own challenges. We bring the strategy, creativity and digital expertise to help you move forward.";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Sectors",
    description,
    path: "/industries",
    keywords:
      "technology and digital products, financial services and fintech, healthcare and wellbeing, retail and consumer brands, property and development, education and learning, public sector, charities and non-profits, fintech marketing, saas marketing, technology marketing agency"
  });
}

export default function IndustriesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sectors", item: `${SITE_URL}/industries` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sectors Pixelette Marketing supports",
    itemListElement: sectorsOverview.map(sector => ({
      "@type": "ListItem",
      position: sector.order,
      name: sector.name
    }))
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Container className='main'>
        <SectorsOverview />
      </Container>
    </>
  );
}
