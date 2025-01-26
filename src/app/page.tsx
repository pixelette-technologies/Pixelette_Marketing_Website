import {
  HomeHero,
  GrowthSection,
  EngagementStalls,
  DynamicMarket,
  RangeOfMarket
} from "@/components/ui/home";
import {
  ContactSection,
  TeamSection,
  TrustedBrands
} from "@/components/common";
import { talkBusinessData } from "@/data";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBrands heading='Leading Brands' />
      <GrowthSection />
      <EngagementStalls />
      <DynamicMarket />
      <RangeOfMarket />
      <TeamSection
        mainHeading='From zero to impact'
        subHeading='We deliver results that matter'
      />
      <ContactSection
        heading={`let's <span> talk business <span/>`}
        data={talkBusinessData}
      />
    </>
  );
}
