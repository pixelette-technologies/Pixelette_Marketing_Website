import {
  ContactSection,
  TeamSection,
  TrustedBrands
} from "@/components/common";
import {
  DynamicMarket,
  EngagementStalls,
  GrowthSection,
  HomeHero,
  RangeOfMarket
} from "@/components/ui/home";
import { talkBusinessData } from "@/data";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBrands header='Trusted Brands' heading='Leading Brands' />
      <GrowthSection />
      <EngagementStalls />
      <DynamicMarket />
      <RangeOfMarket />
      <TeamSection />
      <ContactSection
        heading={`let's <span> talk business <span/>`}
        data={talkBusinessData}
      />
    </>
  );
}
