import {
  ContactSection,
  ContentDisplaySection,
  QuestionAndAnswer,
  TeamSection,
  TrustedBrands
} from "@/components/common";
import {
  Importance,
  ResearchSection,
  ServicesHero,
  ServicesSection,
  Status
} from "@/components/ui/services";
import { servicesData } from "@/data/services/servicesData";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const pageData = servicesData.find(item => item.route === slug);

  const researchData = pageData?.research;

  const importanceData = pageData?.importance;

  const statusData = pageData?.status;

  const serviceData = pageData?.services;

  const contactData = pageData?.howWeWork;

  const questionAndAnswer = pageData?.questionAndAnswer;

  const reviewsData = pageData?.review;

  const marketingServicesData = pageData?.marketingServices;

  return (
    <>
      <ServicesHero
        mainHeading={pageData?.mainHeading}
        subHeading={pageData?.subHeading}
        text={pageData?.summary}
        image={pageData?.image || "/services/heroImageServices.webp"}
      />
      <TrustedBrands  />

      <ResearchSection
        mainHeading={researchData?.mainHeading}
        subHeading={researchData?.subHeading}
        detail={researchData?.detail}
        data={researchData?.data || []}
      />

      <Importance
        mainheading={importanceData?.mainHeading}
        subHeading={importanceData?.subHeading}
        data={importanceData?.data || []}
      />

      <Status
        heading={statusData?.heading}
        text={statusData?.text}
        data={statusData?.data || []}
      />

      <ServicesSection
        heading={serviceData?.heading}
        text={serviceData?.text}
        data={serviceData?.data || []}
      />

      <ContentDisplaySection
        title={marketingServicesData?.title}
        heading={marketingServicesData?.heading}
        detail={marketingServicesData?.detail}
        data={marketingServicesData?.data || []}
      />

      <TeamSection
        mainHeading={reviewsData?.mainHeading}
        subHeading={reviewsData?.subHeading}
        details={reviewsData?.details}
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
