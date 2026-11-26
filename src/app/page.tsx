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

export async function generateMetadata() {
  return await pageMetadata({
    title:
      "Pixelette Marketing | Marketing and communications that deliver measurable impact",
    description:
      "We bring together strategy, creative campaigns, digital marketing, communications and insight to help businesses and public-sector organisations reach their audiences, strengthen engagement and achieve meaningful results.",
    path: "",
    absoluteTitle: true,
    keywords: [
      "marketing and communications agency",
      "digital marketing agency",
      "marketing strategy",
      "public sector communications",
      "brand strategy"
    ]
  });
}

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
      />
    </>
  );
}
