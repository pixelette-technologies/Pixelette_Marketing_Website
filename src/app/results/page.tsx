import { Container } from "@/components/common";
import { ContactSection } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { CaseStudySection } from "@/components/ui/results";
import { finalConversionCopy, resultsCopy } from "@/data/home";
import { caseStudies } from "@/data/results/caseStudies";
import Link from "next/link";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Client Results",
  description:
    "What changed after the work started. Client evidence from Pixelette Marketing engagements, with the objective, the work delivered and the outcome.",
  path: "/results"
});
}

export default function ResultsPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='resultsHero'>
            <Text className='eyebrow'>{resultsCopy.eyebrow}</Text>
            <Heading className='h1p' level={1}>
              {resultsCopy.heading}
            </Heading>
            <Text className='lead'>{resultsCopy.lead}</Text>
            <Link href='/contactus'>
              <Button className='primary'>Discuss Your Project</Button>
            </Link>
          </section>
        </Container>
      </div>

      {caseStudies.map((study, index) => (
        <CaseStudySection
          key={study.client}
          content={study}
          ground={index % 2 === 0 ? "page" : "alt"}
        />
      ))}

      <Container className='main'>
        <section className='sec' aria-labelledby='how-we-report-title'>
          <Heading className='h2' level={2} id='how-we-report-title'>
            How we report results
          </Heading>
          <Text className='body'>
            Every figure on these pages names its source and its period —
            including when the period is not yet recorded. We quote results
            exactly as published and we do not round, extrapolate or combine
            them. Where a number is ours rather than a client&apos;s, we say
            so. Where a result cannot be attributed to our work with
            confidence, we say that too.
          </Text>
          <Text className='body'>
            We hold ourselves to this because we sell measurement. An agency
            that is loose with its own numbers has already told you what its
            reporting will look like.
          </Text>
        </section>
      </Container>

      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
      />
    </>
  );
}
