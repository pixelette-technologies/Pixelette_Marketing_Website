import {
  HomeHero,
  GrowthSection,
  EngagementStalls,
  DynamicMarket,
  RangeOfMarket
} from "@/components/ui/home";
import { TeamSection } from "@/components/common";

export default function Home() {
  return (
    <>
      <HomeHero />
      <GrowthSection />
      <EngagementStalls />
      <DynamicMarket />
      <RangeOfMarket />
      <TeamSection
        mainHeading='From zero to impact'
        subHeading='We deliver results that matter'
      />
    </>
  );
}
