import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { StageList } from "@/components/ui/home";
import { SectorIndex } from "@/components/ui/industries";
import { EvidenceStory, ProofFeature } from "@/components/ui/results";
import { ArrowEast } from "@/assets/sectors";
import { industriesData } from "@/data/industries/industriesData";
import {
  deeperExperience,
  industriesPage,
  stages
} from "@/data/industries/whoWeHelp";
import {
  measuredStudies,
  qualitativeStudies
} from "@/data/results/caseStudies";

const baseUrl = "https://www.pixelettemarketing.com";

// The keywords are unchanged: this is an indexed page and the search intent
// behind "web3 marketing" and the rest still lands here. 28 Sep 2026: the
// title is "Industries" now, matching the navigation (brief, section 13), and
// the description says "built to support", the brief's own claim, rather than
// anything that reads as a client list.
const title = "Industries | Pixelette Marketing";
const description =
  "Pixelette Marketing is built to support organisations across established and emerging sectors, with deeper experience in AI, fintech, SaaS, technology and Web3.";
const shareDescription =
  "Different markets. Different challenges. Marketing built around the market, audience, buying journey and commercial challenge.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "web3 marketing, fintech marketing, saas marketing, ai marketing, technology marketing agency",
  alternates: { canonical: `${baseUrl}/industries` },
  openGraph: {
    title,
    description: shareDescription,
    url: `${baseUrl}/industries`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/industries/industriesHero.webp",
        width: 1200,
        height: 630,
        alt: "Industries Pixelette Marketing is built to support"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: shareDescription,
    images: ["/industries/industriesHero.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// --- 28 Sep 2026: Industries -------------------------------------------------
// Rebuilt to the creative transformation brief, sections 13–18. The order:
//
//   1. Hero             "Different markets. Different challenges."
//   2. The eight        a numbered editorial index (SectorIndex), not cards
//   3. Unlisted         "Don't see your sector?", a transition
//   4. Deeper           the five specialist pages, on the page's dark band
//   5. Evidence         BlockGuard dominant, WebBookingPro secondary
//   6. Stages           launch, scale, established — maturity, not industry
//
// THE TWO CLAIMS STAY VISIBLY APART (brief, section 16). The eight are
// markets the company is BUILT TO SUPPORT, set on the light ground as an index
// with no links. The five are where WIDER EXPERIENCE adds depth, set on the
// one dark band as linked cards. Different ground, different form, different
// verb — a reader sees the change of claim before reading it.
//
// EVIDENCE IS NEW HERE (brief, section 18) and it is weighted, not balanced:
// BlockGuard at full size with its figures, WebBookingPro beneath it, smaller,
// labelled qualitative, with no number of any kind. Both link to /results,
// which stays live for direct links and search even though it has left the
// primary navigation.
//
// The 23 Sep history of this page — the eleven-mark field and the "sector
// specialisms" block, both removed for claiming too much — is in git and in
// [[02 Decisions]].

export default function IndustriesIndexPage() {
  const { eyebrow, heading, lead, evidence, unlisted, deeper, stagesBand } =
    industriesPage;

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

      {/* 1. Hero — the brief's headline and copy. */}
      <div className='wash-left'>
        <Container className='main'>
          <header className='industriesIntro'>
            <Text className='eyebrow'>{eyebrow}</Text>
            <Heading className='h1p industriesIntro__title' level={1}>
              <span>{heading.lead}</span>{" "}
              <span className='industriesIntro__accent'>{heading.accent}</span>
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>
        </Container>
      </div>

      <div className='sec whoSectors'>
        <Container className='main'>
          {/* 2. The eight, as a numbered editorial index. No heading of
              their own: the h1 directly above is their heading. */}
          <section aria-label='Industries'>
            <SectorIndex level={2} />
          </section>

          {/* 3. The transition. */}
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

      {/* 4. Deeper experience — a different claim on a different ground. */}
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

      {/* 5. Evidence in practice (brief, section 18). BlockGuard dominant,
          WebBookingPro secondary and qualitative. */}
      {measuredStudies.map((study, i) => (
        <ProofFeature
          key={study.client}
          study={study}
          eyebrow={i === 0 ? evidence.eyebrow : evidence.secondaryEyebrow}
        />
      ))}
      {qualitativeStudies.length > 0 && (
        <div className='industriesEvidence'>
          <Container className='main'>
            {qualitativeStudies.map(study => (
              <EvidenceStory
                key={study.client}
                study={study}
                eyebrow={evidence.secondaryEyebrow}
              />
            ))}
          </Container>
        </div>
      )}

      {/* 6. Stage, kept apart from sector. */}
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
