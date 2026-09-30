import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { IndustryExplorer, WorkInPractice } from "@/components/ui/industries";
import { industries, industriesPage } from "@/data/industries/industries";

const baseUrl = "https://www.pixelettemarketing.com";

// The keywords are unchanged: this is an indexed page and the search intent
// behind "web3 marketing" and the rest still lands here. The title follows the
// 29 Sep rename to Industries. The description is the final brief's (30 Sep):
// how the thinking adapts, with no market names stuffed in and no claim to be
// a specialist in any of them.
const description =
  "See how Pixelette adapts marketing strategy around different markets, audiences, buying journeys and commercial challenges.";

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
//   02 Market explorer       eight names, one panel, the Market journey
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
// 30 Sep 2026, THE FINAL BRIEF: the same four chapters, finished. No hero
// image — the eight-market explorer and its Market journey are the page's
// visual — and Work in practice redesigned so its hierarchy follows the
// strength of the evidence. No stock or generated imagery anywhere, and no
// sector routes: the five legacy /industries/[slug] pages are untouched.

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

      {/* 02 The eight-market explorer. */}
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
