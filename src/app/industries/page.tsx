import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { industriesData } from "@/data/industries/industriesData";
import { whoWeHelpData } from "@/data/home";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Who We Help | Pixelette Marketing",
  description:
    "Pixelette Marketing works with businesses across established and emerging sectors, from technology and financial services to healthcare, education and professional services.",
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
        alt: "Industries Pixelette Marketing serves"
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

// The twin of /services, added in the same 10 Jun 2026 commit, carrying the
// same inline styles and the same ~9.5px summaries. See that file for the
// full note; this page is structurally identical and shares its partial.
//
// NOT A CONTENT CHANGE. The heading, the standfirst, both JSON-LD blocks and
// every card title and summary are exactly what was here before, still read
// from industriesData. Only the markup and the styling change.

const SCALE: Record<string, string> = {
  lead: "marketField__mark--lead",
  mid: "marketField__mark--mid",
  quiet: "marketField__mark--quiet"
};

export default function IndustriesIndexPage() {
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

      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Who we help
            </Heading>
            <Text className='lead'>{whoWeHelpData.lead}</Text>
          </section>
        </Container>
      </div>

      <div className='hubList sec'>
        <Container className='main'>
          {/* THE RANGE COMES FIRST, and it is the home page's own field. A
              visitor arrives here from "Find your growth route", having just
              read eleven markets and "And beyond"; the page they land on has
              to keep that promise rather than take it back, which is exactly
              what "the sectors we understand best" over five technology cards
              used to do. */}
          <ul className='marketField' data-reveal='stagger'>
            {whoWeHelpData.markets.map(mark => (
              <li
                key={mark.label}
                className={[
                  "marketField__mark",
                  SCALE[mark.scale],
                  mark.accent && "marketField__mark--accent"
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {mark.label}
              </li>
            ))}
            <li className='marketField__mark marketField__beyond'>
              {whoWeHelpData.beyond}
            </li>
          </ul>

          <section className='hubPositioning'>
            <Heading className='h3' level={2}>
              {whoWeHelpData.positioning.heading}
            </Heading>
            <Text className='body'>{whoWeHelpData.positioning.body}</Text>
          </section>

          {/* THE FIVE, REWRITTEN AGAINST WHAT UK AGENCY SECTOR PAGES ACTUALLY
              DO. The first attempt said "these five have their own page… where
              we have written the most", which describes the WEBSITE rather than
              the work — no agency writes about its own page structure, and it
              read as an apology for a short list.
              
              Click Consult's Sector Specialisms page is the pattern followed
              here: a heading that owns the expertise rather than claiming a
              boundary, one sentence per sector written in the second person
              about the CLIENT'S problem rather than about the industry, and
              the breadth hedge given its own section in plain speech instead
              of a parenthetical. */}
          <section className='hubLinks'>
            <Heading className='h3' level={2}>
              Sector specialisms
            </Heading>
            <Text className='body'>
              Every market has its own buyers, buying cycles and competitive
              pressure. These five are where we have built the most specialist
              knowledge, and where the detail below goes furthest.
            </Text>
            <ul className='sectorList'>
              {industriesData.map(industry => (
                <li className='sectorList__item' key={industry.route}>
                  <Link
                    href={`/industries/${industry.route}`}
                    className='sectorList__link'
                  >
                    {industry.title}
                  </Link>
                  <Text className='body'>{industry.hubLine}</Text>
                </li>
              ))}
            </ul>
          </section>

          {/* The hedge gets its own block and its own heading. A list of five
              on a page about range re-creates the closed-list problem the top
              of this page just solved, and a trailing "and more" does not
              undo it. */}
          <section className='hubAside'>
            <Heading className='h3' level={2}>
              If your sector is not one of the five
            </Heading>
            <Text className='body'>
              It rarely changes the answer. What decides a growth plan is the
              buyer, the buying cycle and the constraint holding growth back —
              and those are questions we would ask whatever market you are in.
            </Text>
            <Link href='/contactus' className='btn hubAside__cta'>
              Talk to us about your market
            </Link>
          </section>
        </Container>
      </div>
    </>
  );
}
