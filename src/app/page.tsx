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
    "Marketing and communications that build brands, engage audiences and deliver measurable results. Strategy, demand, search, pipeline and intelligence working together for commercial and public and civic buyers.",
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
