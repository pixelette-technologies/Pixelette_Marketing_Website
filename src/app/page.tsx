import {
  HomeHero,
  ActivitySection,
  CapabilitiesSection,
  SecondMarketBand,
  RelevanceSection
} from "@/components/ui/home";
import { ContactSection } from "@/components/common";
import { finalConversionCopy } from "@/data/home";

import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title:
    "Pixelette Marketing | Marketing and communications that build brands, engage audiences and deliver measurable results",
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

export default function Home() {
  return (
    <>
      <HomeHero />
      <ActivitySection />
      <CapabilitiesSection />
      <SecondMarketBand />
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
