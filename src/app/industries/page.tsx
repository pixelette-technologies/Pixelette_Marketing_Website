import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { SectorGrid, SplitTitle, StageList } from "@/components/ui/home";
import { ArrowEast } from "@/assets/sectors";
import { industriesData } from "@/data/industries/industriesData";
import {
  deeperExperience,
  sectors,
  stages,
  whoWeHelpPage
} from "@/data/industries/whoWeHelp";

const baseUrl = "https://www.pixelettemarketing.com";

// The title and keywords are unchanged: this is an indexed page and the
// search intent behind "web3 marketing" and the rest still lands here. The
// description changed on 23 Sep because it said the company "works with"
// businesses in every sector, which reads as a client list; it now says what
// the page says — built to work with, deeper experience in.
export const metadata: Metadata = {
  title: "Who We Help | Pixelette Marketing",
  description:
    "Pixelette Marketing is built to work with businesses across established and emerging sectors, with deeper experience in AI, fintech, SaaS, technology and Web3.",
  keywords:
    "web3 marketing, fintech marketing, saas marketing, ai marketing, technology marketing agency",
  alternates: { canonical: `${baseUrl}/industries` },
  openGraph: {
    title: "Who We Help | Pixelette Marketing",
    description:
      "Marketing for businesses across established and emerging sectors. We build the strategy around your market, not a sector template.",
    url: `${baseUrl}/industries`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/industries/industriesHero.webp",
        width: 1200,
        height: 630,
        alt: "Who Pixelette Marketing helps"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Help | Pixelette Marketing",
    description:
      "Marketing for businesses across established and emerging sectors. We build the strategy around your market, not a sector template.",
    images: ["/industries/industriesHero.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// --- 23 Sep 2026: the single source of truth for who we help ----------------
// Rebuilt to a positioning brief. This page is now where the sector story is
// told in full, and it tells it in the brief's order:
//
//   1. Hero             the claim — across sectors, built around your market
//   2. Sectors          the eight, the same cards the home page previews
//   3. Unlisted         "Don't see your sector?", a transition, not a ninth card
//   4. Deeper           the five specialist pages, on their own band
//   5. Stages           launch, scale, established — maturity, not industry
//
// WHAT WENT: the eleven-mark typographic field (a second, conflicting
// taxonomy), the "Sector knowledge matters" positioning pair, and the "Sector
// specialisms … where we have built the most specialist knowledge" block. That
// last one is the claim the brief bars: it made five technology pages read as
// the edge of the market and asserted a depth nobody had evidenced.
//
// THE DEEPER EXPERIENCE BAND IS VISUALLY SEPARATE ON PURPOSE. It sits on
// .band-dark, full bleed, so the page shows a change of subject before the
// copy says so, with white cards on it as the home page's Growth System band
// has. It was .band-alt first, and looking at it showed that .band-alt is the
// page ground to the digit (248 245 243 both), so it separated nothing. This
// is the page's only dark band, well inside the cap of three.
//
// Its cards link; the sector cards do not. That asymmetry is the rest of the
// distinction: the eight are the market, the five are further reading.

export default function IndustriesIndexPage() {
  const { eyebrow, heading, lead, aside, unlisted, deeper, stagesBand } =
    whoWeHelpPage;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Who We Help", item: `${baseUrl}/industries` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sectors with a Pixelette Marketing sector page",
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

      {/* 1. Hero. The head and the rail are the home section's own classes,
          so the claim a visitor read on the home page is set the same way
          when they arrive here from "Explore who we help". */}
      <div className='wash-left'>
        <Container className='main'>
          <header className='whoHero dynamicMarket__head'>
            <div className='dynamicMarket__headMain'>
              <Text className='eyebrow'>{eyebrow}</Text>
              <Heading className='h1p dynamicMarket__heading' level={1}>
                <SplitTitle heading={heading} />
              </Heading>
              <Text className='lead'>{lead}</Text>
            </div>
            <p className='dynamicMarket__aside'>{aside}</p>
          </header>
        </Container>
      </div>

      <div className='sec whoSectors'>
        <Container className='main'>
          {/* 2. The eight. No heading of their own: the h1 directly above is
              their heading, and a second "Sectors" title would restate it.
              The grid is labelled for assistive technology instead. */}
          <section aria-label='Sectors we help'>
            <SectorGrid sectors={sectors} compact level={2} />
          </section>

          {/* 3. The transition. Small on purpose — a hairline and a
              paragraph, not a section with its own ground. */}
          <section className='hubAside'>
            <Heading className='h3' level={2}>
              {unlisted.heading}
            </Heading>
            <Text className='body'>{unlisted.body}</Text>
            <Link href={unlisted.cta.to} className='btn hubAside__cta'>
              {unlisted.cta.label}
            </Link>
          </section>
        </Container>
      </div>

      {/* 4. Deeper experience. */}
      <div className='band-dark sec'>
        <Container className='main'>
          <header className='whoBand__head'>
            <Text className='eyebrow'>{deeper.eyebrow}</Text>
            <Heading className='h2' level={2}>
              {deeper.heading}
            </Heading>
            <Text className='lead'>{deeper.body}</Text>
          </header>

          <ul className='specialistGrid' data-reveal='stagger'>
            {deeperExperience.map(area => (
              <li key={area.href}>
                <Link href={area.href} className='specialistCard'>
                  <Heading className='specialistCard__title' level={3}>
                    {area.label}
                  </Heading>
                  <p className='specialistCard__body'>{area.line}</p>
                  <span className='specialistCard__more' aria-hidden='true'>
                    Explore
                    <ArrowEast />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* 5. Stage, kept apart from sector. */}
      <div className='sec'>
        <Container className='main'>
          <header className='whoBand__head'>
            <Text className='eyebrow'>{stagesBand.eyebrow}</Text>
            <Heading className='h2' level={2}>
              {stagesBand.heading}
            </Heading>
            <Text className='lead'>{stagesBand.body}</Text>
          </header>

          <StageList stages={stages} level={3} />

          <Link href={stagesBand.cta.to} className='btn whoBand__cta'>
            {stagesBand.cta.label}
          </Link>
        </Container>
      </div>
    </>
  );
}
