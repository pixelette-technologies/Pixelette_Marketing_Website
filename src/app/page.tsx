import { TeamSection, TrustedBrands } from "@/components/common";
import {
  DynamicMarket,
  EngagementStalls,
  GrowthSection,
  HomeHero,
  RangeOfMarket
} from "@/components/ui/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBrands header='Trusted by' heading='Leading Brands' />
      <GrowthSection />
      <EngagementStalls />
      <DynamicMarket />
      <RangeOfMarket />
      <TeamSection />
    </>
  );
}
