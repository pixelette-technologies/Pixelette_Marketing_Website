import {
  HomeHero,
  ActivitySection,
  CapabilitiesSection,
  RelevanceSection
} from "@/components/ui/home";
import { ContactSection } from "@/components/common";
import { finalConversionCopy } from "@/data/home";

import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Pixelette Marketing | Marketing that matters to your bottom line",
  description:
    "Strategy, demand, search, pipeline and intelligence working together around the commercial outcomes that matter. Growth marketing for ambitious businesses.",
  path: "",
  absoluteTitle: true,
  keywords: [
    "growth marketing",
    "digital marketing agency",
    "marketing strategy",
    "demand generation",
    "commercial growth"
  ]
});

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
