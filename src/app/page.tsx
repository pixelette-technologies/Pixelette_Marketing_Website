import {
  HomeHero,
  ActivitySection,
  CapabilitiesSection,
  RelevanceSection
} from "@/components/ui/home";
import { ContactSection } from "@/components/common";
import { finalConversionCopy } from "@/data/home";

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

// Home opens on the approved four sections, then the contact form.
//
//   01–04  the approved opening sequence
//   05     Final conversion
//
// The industries teaser, proof teaser, AI-accelerated strip and wider-group
// block were removed from this page. Their copy stays in homeContent.ts.

export default function Home() {
  return (
    <>
      <HomeHero />
      <ActivitySection />
      <CapabilitiesSection />
      <RelevanceSection />
      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
        cta={finalConversionCopy.secondaryCta}
      />
    </>
  );
}
