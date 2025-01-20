import { IndustriesHero, Web3Questions } from "@/components/ui/industries";
import {
  ContactSection,
  QuestionAndAnswer,
  TeamSection
} from "@/components/common";
import { industriesData } from "@/data/industries/industriesData";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const pageData = industriesData.find(item => item.route === slug);

  const ourSolutionData = pageData?.ourSolutions;

  const contactData = pageData?.howWeWork;

  const questionAndAnswer = pageData?.questionAndAnswer;

  return (
    <>
      <IndustriesHero
        mainHeading={pageData?.mainHeading}
        subHeading={pageData?.subHeading}
        text={pageData?.summary}
        image={pageData?.image || "/industries/industriesHero.webp"}
      />
      <Web3Questions
        heading={ourSolutionData?.heading}
        text={ourSolutionData?.text}
        data={ourSolutionData?.data || []}
      />
      <ContactSection
        heading={contactData?.heading}
        data={contactData?.data || []}
      />
      <TeamSection />

      <QuestionAndAnswer
        heading={questionAndAnswer?.question}
        text={questionAndAnswer?.answer}
      />
    </>
  );
}
