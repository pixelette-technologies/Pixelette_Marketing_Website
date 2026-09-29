import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { IndustryExplorer, WorkInPractice } from "@/components/ui/industries";
import { industries, industriesPage } from "@/data/industries/industries";

const baseUrl = "https://www.pixelettemarketing.com";

// The keywords are unchanged: this is an indexed page and the search intent
// behind "web3 marketing" and the rest still lands here. Title and description
// follow the 29 Sep rename to Industries, and the description no longer names
// the five specialist areas — that "deeper experience" framing is barred from
// this page by the same instruction.
const description =
  "Every market behaves differently. Pixelette Marketing adapts the approach to the market, audience, buying journey and commercial challenge, across eight broad industries.";

export const metadata: Metadata = {
  title: "Industries | Pixelette Marketing",
  description,
  keywords:
    "web3 marketing, fintech marketing, saas marketing, ai marketing, technology marketing agency",
  alternates: { canonical: `${baseUrl}/industries` },
  openGraph: {
    title: "Industries | Pixelette Marketing",
    description,
    url: `${baseUrl}/industries`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/industries/industriesHero.webp",
        width: 1200,
        height: 630,
        alt: "Industries Pixelette Marketing supports"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Pixelette Marketing",
    description,
    images: ["/industries/industriesHero.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// --- 29 Sep 2026: the locked information architecture -------------------------
// Rebuilt to the master structure correction. FOUR CHAPTERS AND ONLY FOUR:
//
//   01 Hero                  different markets, different dynamics
//   02 Industry experience   eight names, one changing stage
//   03 Work in practice      BlockGuard leading, WebBookingPro supporting
//   04 Final CTA
//
// WHAT WENT, AND MUST NOT COME BACK WITHOUT AN INSTRUCTION: the eight sector
// cards, "Don't see your sector?", the Deeper experience band over the five
// specialist pages, and the business stages. Also barred: "Why it works", a
// process, tools, service grids, benefit cards.
//
// THE FIVE SPECIALIST ROUTES STAY LIVE (/industries/ai and the rest). They are
// in the sitemap and keep their SEO value; this page simply stops presenting
// them as a hierarchy of sector expertise. Their internal linking is to be
// reviewed separately.
//
// The page answers how the approach adapts to a market — not how many clients
// Pixelette has in it. Nothing below claims a track record.
//
// VISUALS ARE STRUCTURAL. The hero's final art direction and the experience's
// final treatment are to be supplied separately; this establishes the order,
// the copy and the behaviour on the existing tokens.

export default function IndustriesIndexPage() {
  const { hero, explorer, close } = industriesPage;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${baseUrl}/industries` }
    ]
  };

  // The eight markets, named. No URLs: none of the eight has a page, and the
  // list used to name the five specialist pages, which is the hierarchy this
  // page no longer draws.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries Pixelette Marketing supports",
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name
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

      {/* 01 Hero. */}
      <div className='wash-left'>
        <Container className='main'>
          <header className='industriesHub__hero'>
            <div className='industriesHub__heroMain'>
              <Text className='eyebrow'>{hero.eyebrow}</Text>
              <Heading className='h1p' level={1}>
                <span className='industriesHub__line'>{hero.headline.lead}</span>{" "}
                <span className='industriesHub__line industriesHub__accent'>
                  {hero.headline.accent}
                </span>
              </Heading>
              <Text className='lead'>{hero.lead}</Text>
            </div>
            <p className='industriesHub__principle'>{hero.principle}</p>
          </header>
        </Container>
      </div>

      {/* 02 The interactive industry experience. */}
      <div className='sec'>
        <Container className='main'>
          <section aria-labelledby='explorer-title'>
            <header className='industriesHub__head'>
              <Text className='eyebrow'>{explorer.eyebrow}</Text>
              <h2 className='h2' id='explorer-title'>
                {explorer.heading}
              </h2>
            </header>
            <IndustryExplorer />
          </section>
        </Container>
      </div>

      {/* 03 Work in practice. */}
      <WorkInPractice />

      {/* 04 The close. Nothing follows it but the footer. */}
      <div className='sec'>
        <Container className='main'>
          <section className='industriesHub__close'>
            <Heading className='h2' level={2}>
              <span className='industriesHub__line'>{close.heading.lead}</span>{" "}
              <span className='industriesHub__line industriesHub__accent'>
                {close.heading.accent}
              </span>
            </Heading>
            <Link href={close.cta.to} className='btn industriesHub__cta'>
              {close.cta.label}
              <span aria-hidden='true'>→</span>
            </Link>
          </section>
        </Container>
      </div>
    </>
  );
}
