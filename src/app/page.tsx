import {
  HomeHero,
  ActivitySection,
  CapabilitiesSection,
  RelevanceSection,
  IndustriesTeaser,
  ProofTeaser,
  ItemsSection,
  AiTechnologySection
} from "@/components/ui/home";
import { ContactSection } from "@/components/common";
import { finalConversionCopy, widerAdvantageData } from "@/data/home";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pixelette Marketing | Growth Marketing & Commercial Growth",
  description: "Build demand, qualified pipeline, conversion and measurable growth with connected strategy, search, content, paid media, lifecycle marketing and growth intelligence.",
  keywords: ['digital marketing agency', 'digital marketing services', 'digital marketing solutions'],
  alternates: {
    canonical: 'https://www.pixelettemarketing.com',
  },
  openGraph: {
    title: "Pixelette Marketing | Growth Marketing & Commercial Growth",
    description: "Build demand, qualified pipeline, conversion and measurable growth with connected strategy, search, content, paid media, lifecycle marketing and growth intelligence.",
  },
}

// --- 29 Sep 2026: the locked information architecture ------------------------
// Home is the shop window: it opens on the approved four sections, previews,
// proves a little and routes deeper. It is meant to stop early.
//
//   01–04  the approved opening sequence — NOT to be redesigned by structural
//          work
//   05     Industries teaser (no cards; the eight live on /industries)
//   06     Proof before promises, compact (routes to Work in practice)
//   07     AI-accelerated. Human-led. — kept: nothing else on the site says it
//   08     Part of Pixelette — kept: the only place the wider group is described
//   09     Final conversion
//
// REMOVED as duplication: the logo strip (still on /aboutus and the service
// pages), the growth figure, the five capabilities a second time (03 says it;
// /services owns the detail), the eight-card Who we help section, the full
// Results section, the engagement-model grid and the process. Their copy is
// kept in homeContent.ts where it is management's; the components that only
// rendered them here are unused now.

export default function Home() {
  return (
    <>
      <HomeHero />
      <ActivitySection />
      <CapabilitiesSection />
      <RelevanceSection />
      <IndustriesTeaser />
      <ProofTeaser />
      <AiTechnologySection />
      <ItemsSection content={widerAdvantageData} topRule />
      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
        cta={finalConversionCopy.secondaryCta}
      />
    </>
  );
}
