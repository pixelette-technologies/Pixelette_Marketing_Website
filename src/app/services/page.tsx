import type { Metadata } from "next";
import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { servicesData } from "@/data/services/servicesData";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Pixelette Marketing",
  description:
    "Explore Pixelette Marketing's full-service digital marketing offering — SEO, social media, paid ads, PR, email, influencer and lead generation for Fintech, SaaS, Web3 and technology brands.",
  keywords:
    "digital marketing services, marketing agency services, SEO services, social media marketing, PPC, PR, email marketing, lead generation",
  alternates: { canonical: `${baseUrl}/services` },
  openGraph: {
    title: "Digital Marketing Services | Pixelette Marketing",
    description:
      "Full-service digital marketing for emerging Fintech, SaaS, Web3 and technology brands.",
    url: `${baseUrl}/services`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/services/heroImageServices.webp",
        width: 1200,
        height: 630,
        alt: "Pixelette Marketing Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Pixelette Marketing",
    description:
      "Full-service digital marketing for emerging Fintech, SaaS, Web3 and technology brands.",
    images: ["/services/heroImageServices.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// Added 10 Jun 2026 as an SEO hub and never taken through the design
// conversion. It carried twenty-odd inline style objects: the h1 hard-coded at
// 1.5625rem, card titles at 0.78125rem and summaries at 0.59375rem — roughly
// 9.5px — with no primitive classes at all.
//
// NOT A CONTENT CHANGE. Every word on this page is the word that was here
// before: the heading, the standfirst, both JSON-LD blocks and each card's
// title and summary are untouched, and they still come from servicesData. Only
// the markup and the styling change.
//
// The cards are ArrowCard, which is the card this site already uses for a
// titled, summarised link to a detail page — the home page's sector cards are
// the same component pointing at the same kind of destination. Its "View More"
// label is its own and needed no copy written for it.
//
// The hero takes .wash-left, the interior-page ground. There is no eyebrow:
// this page has no such copy, and writing one to complete the pattern is the
// trap the codebase has reverted twice. The pattern ships without it.

export default function ServicesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Digital Marketing Services",
    itemListElement: servicesData.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${baseUrl}/services/${service.route}`
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
              Digital Marketing Services
            </Heading>
            <Text className='lead'>
              Pixelette Marketing is a full-service digital marketing agency for
              emerging Fintech, SaaS, Web3 and technology brands. Explore our
              services below.
            </Text>
          </section>
        </Container>
      </div>

      <div className='hubList sec'>
        <Container className='main'>
          <section className='hubList__grid' data-reveal='stagger'>
            {servicesData.map(service => (
              <ArrowCard
                key={service.route}
                mainHeading={service.title}
                subHeading=''
                summary={service.summary}
                theme={false}
                textfloat={false}
                to={`/services/${service.route}`}
              />
            ))}
          </section>
        </Container>
      </div>
    </>
  );
}
