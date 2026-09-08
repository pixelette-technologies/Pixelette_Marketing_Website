import type { Metadata } from "next";
import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { industriesData } from "@/data/industries/industriesData";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Industries We Serve | Pixelette Marketing",
  description:
    "Specialist digital marketing for the industries we know best — Web3, Fintech, SaaS, AI and technology. See how Pixelette Marketing drives growth in your sector.",
  keywords:
    "web3 marketing, fintech marketing, saas marketing, ai marketing, technology marketing agency",
  alternates: { canonical: `${baseUrl}/industries` },
  openGraph: {
    title: "Industries We Serve | Pixelette Marketing",
    description:
      "Specialist digital marketing for Web3, Fintech, SaaS, AI and technology brands.",
    url: `${baseUrl}/industries`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/industries/industriesHero.webp",
        width: 1200,
        height: 630,
        alt: "Industries Pixelette Marketing serves"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Pixelette Marketing",
    description:
      "Specialist digital marketing for Web3, Fintech, SaaS, AI and technology brands.",
    images: ["/industries/industriesHero.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// The twin of /services, added in the same 10 Jun 2026 commit, carrying the
// same inline styles and the same ~9.5px summaries. See that file for the
// full note; this page is structurally identical and shares its partial.
//
// NOT A CONTENT CHANGE. The heading, the standfirst, both JSON-LD blocks and
// every card title and summary are exactly what was here before, still read
// from industriesData. Only the markup and the styling change.

export default function IndustriesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${baseUrl}/industries` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries We Serve",
    itemListElement: industriesData.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.title,
      url: `${baseUrl}/industries/${industry.route}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Industries We Serve
            </Heading>
            <Text className='lead'>
              We partner with brands across the sectors we understand best.
              Explore how Pixelette Marketing delivers sector-specific growth
              below.
            </Text>
          </section>
        </Container>
      </div>

      <div className='hubList sec'>
        <Container className='main'>
          <section className='hubList__grid' data-reveal='stagger'>
            {industriesData.map(industry => (
              <ArrowCard
                key={industry.route}
                mainHeading={industry.title}
                subHeading=''
                summary={industry.summary}
                theme={false}
                textfloat={false}
                to={`/industries/${industry.route}`}
              />
            ))}
          </section>
        </Container>
      </div>
    </>
  );
}
