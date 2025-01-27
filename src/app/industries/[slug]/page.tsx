import { IndustriesHero, Web3Questions } from "@/components/ui/industries";
import {
  ContactSection,
  ContentDisplaySection,
  QuestionAndAnswer
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

  const marketingServicesData = pageData?.marketingServices;

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
      <ContentDisplaySection
        title={marketingServicesData?.title}
        heading={marketingServicesData?.heading}
        detail={marketingServicesData?.detail}
        data={marketingServicesData?.data || []}
      />
      <ContactSection
        heading={contactData?.heading}
        data={contactData?.data || []}
      />

      <QuestionAndAnswer
        heading={questionAndAnswer?.question}
        text={questionAndAnswer?.answer}
      />
    </>
  );
}
