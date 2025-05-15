import { ContactSection, TeamSection } from "@/components/common";
import BlockerSection from "@/components/ui/singleIndustriesPage/BlockerSection";
import FinalResult from "@/components/ui/singleIndustriesPage/FinalResult";
import GoalAndProposedSection from "@/components/ui/singleIndustriesPage/GoalAndProposedSection";
import HeroSingleIndustriesPage from "@/components/ui/singleIndustriesPage/HeroSingleIndustriesPage";
import ProcessSection from "@/components/ui/singleIndustriesPage/ProcessSection";
import { singleIndustriesData } from "@/data/industries/singleIndustriesData";
import { talkBusinessData } from "@/data";

export default function SingleIndustriesPage() {
  return (
    <>
      <HeroSingleIndustriesPage
        heading={singleIndustriesData.heroSection.mainHeading}
        description={singleIndustriesData.heroSection.description}
        data={singleIndustriesData.heroSection.data}
      />
      <BlockerSection
        heading={singleIndustriesData.blockerSection.heading}
        description={singleIndustriesData.blockerSection.description}
      />

      <GoalAndProposedSection
        goalHeading={singleIndustriesData.goalSection.goalHeading}
        goalDescription={singleIndustriesData.goalSection.goaldescription}
        proposedHeading={singleIndustriesData.goalSection.proposedHeading}
        proposedDescription={
          singleIndustriesData.goalSection.proposedDescription
        }
      />

      <ProcessSection
        heading={singleIndustriesData.processSection.heading}
        description={singleIndustriesData.processSection.description}
        data={singleIndustriesData.processSection.data}
      />

      <FinalResult
        mainheading={singleIndustriesData.techStackData.mainheading}
        maindescription={singleIndustriesData.techStackData.maindescription}
        heading={singleIndustriesData.techStackData.heading}
        description={singleIndustriesData.techStackData.description}
        data={singleIndustriesData.techStackData.data}
        icons={singleIndustriesData.techStackData.icon}
      />

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
