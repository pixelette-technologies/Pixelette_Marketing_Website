import { ContactSection, TeamSection } from "@/components/common";
import BlockerSection from "@/components/ui/singleIndustriesPage/BlockerSection";
import FinalResult from "@/components/ui/singleIndustriesPage/FinalResult";
import GoalAndProposedSection from "@/components/ui/singleIndustriesPage/GoalAndProposedSection";
import HeroSingleIndustriesPage from "@/components/ui/singleIndustriesPage/HeroSingleIndustriesPage";
import ProcessSection from "@/components/ui/singleIndustriesPage/ProcessSection";
import { talkBusinessData } from "@/data";
import { storiesData } from "@/data/storiesData/storiesData";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleIndustriesPage({ params }: PageProps) {
  const { id } = await params;
  const storyId = parseInt(id, 10);
  const allStories = storiesData.flatMap(category => category.data);
  const story = allStories.find(item => item.id === storyId);

  if (!story) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <HeroSingleIndustriesPage
        heading={story.title}
        description={story.summary}
        data={story.arrowData}
      />
      <BlockerSection
        heading={story.blockerSection.heading}
        description={story.blockerSection.description}
      />

      <GoalAndProposedSection
        goalHeading={story.goalSection.goalHeading}
        goalDescription={story.goalSection.goaldescription}
        proposedHeading={story.goalSection.proposedHeading}
        proposedDescription={story.goalSection.proposedDescription}
      />

      <ProcessSection
        heading={story.processSection.heading}
        description={story.processSection.description}
        data={story.processSection.data}
      />

      <FinalResult
        mainheading={story.techStackData.mainheading}
        maindescription={story.techStackData.maindescription}
        heading={story.techStackData.heading}
        description={story.techStackData.description}
        data={story.techStackData.data}
        icons={story.techStackData.icon}
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
