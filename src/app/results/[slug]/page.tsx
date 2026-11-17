import { Container, ContactSection } from "@/components/common";
import { Heading } from "@/components/feature";
import { CaseStudySection, caseStudyAnchor } from "@/components/ui/results";
import { finalConversionCopy } from "@/data/home";
import { caseStudies } from "@/data/results/caseStudies";
import { pageMetadata } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(study => ({
    slug: caseStudyAnchor(study.client)
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find(item => caseStudyAnchor(item.client) === slug);
  if (!study) {
    return pageMetadata({
      title: "Client Results",
      description: "Client evidence from Pixelette Marketing.",
      path: `/results/${slug}`,
      index: false
    });
  }
  return pageMetadata({
    title: `${study.client} results`,
    description: study.heading,
    path: `/results/${slug}`
  });
}

export default async function ResultStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find(item => caseStudyAnchor(item.client) === slug);
  if (!study) notFound();

  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <p className='sec-sm'>
            <Link href='/results' className='textLink'>
              ← All results
            </Link>
          </p>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              {study.client}
            </Heading>
          </section>
        </Container>
      </div>
      <CaseStudySection content={study} ground='page' />
      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
      />
    </>
  );
}
