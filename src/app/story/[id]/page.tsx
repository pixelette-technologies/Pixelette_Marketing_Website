import { ContactSection, TeamSection } from "@/components/common";
import BlockerSection from "@/components/ui/singleIndustriesPage/BlockerSection";
import FinalResult from "@/components/ui/singleIndustriesPage/FinalResult";
import GoalAndProposedSection from "@/components/ui/singleIndustriesPage/GoalAndProposedSection";
import HeroSingleIndustriesPage from "@/components/ui/singleIndustriesPage/HeroSingleIndustriesPage";
import ProcessSection from "@/components/ui/singleIndustriesPage/ProcessSection";
import { talkBusinessData } from "@/data";
import { storiesData } from "@/data/storiesData/storiesData";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const SITE = "https://www.pixelettemarketing.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = storiesData.flatMap(c => c.data).find(item => item.id === parseInt(id, 10));
  if (!story) {
    return {
      title: "Success Story | Pixelette Marketing",
      alternates: { canonical: `${SITE}/story/${id}` }
    };
  }
  const desc =
    typeof story.summary === "string"
      ? story.summary.replace(/<[^>]*>/g, "").trim().slice(0, 160)
      : "";
  return {
    title: `${story.title} | Pixelette Marketing`,
    description: desc || `Case study: ${story.title} by Pixelette Marketing.`,
    alternates: { canonical: `${SITE}/story/${id}` },
    // INTERIM: success stories are placeholder/duplicate. Remove this robots block when real content lands - see content brief.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${story.title}`,
      description: desc || undefined,
      url: `${SITE}/story/${id}`,
      type: "article"
    }
  };
}

export default async function SingleIndustriesPage({ params }: PageProps) {
  const { id } = await params;
  const storyId = parseInt(id, 10);
  const allStories = storiesData.flatMap(category => category.data);
  const story = allStories.find(item => item.id === storyId);

  if (!story) {
    return <div>Blog not found</div>;
  }

  const storyDesc =
    typeof story.summary === "string"
      ? story.summary.replace(/<[^>]*>/g, "").trim().slice(0, 200)
      : "";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: storyDesc || undefined,
    author: { "@type": "Organization", name: "Pixelette Marketing", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Pixelette Marketing",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` }
    },
    mainEntityOfPage: `${SITE}/story/${id}`
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
