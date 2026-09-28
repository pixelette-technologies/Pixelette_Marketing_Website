import {
  HomeHero,
  CredibilityStrip,
  EditorialStatement,
  ConnectedSystem,
  JourneySection,
  IntelligenceSection,
  IndustriesPreview,
  HowWeWork,
  GroupAdvantage
} from "@/components/ui/home";
import { EvidenceStory, ProofFeature } from "@/components/ui/results";
import { ContactSection, Container } from "@/components/common";
import {
  finalConversionCopy,
  homeCloseCopy,
  interruptionCopy,
  measurementStatement
} from "@/data/home";
import {
  measuredStudies,
  qualitativeStudies
} from "@/data/results/caseStudies";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: "Pixelette Marketing | Growth Marketing & Commercial Growth",
  description: "Build demand, qualified pipeline, conversion and measurable growth with connected strategy, search, content, paid media, lifecycle marketing and growth intelligence.",
  keywords: ['digital marketing agency', 'digital marketing services', 'digital marketing solutions'],
  alternates: {
    canonical: 'https://www.pixelettemarketing.com',
  },
  openGraph: {
    title: "Pixelette Marketing | Growth Marketing & Commercial Growth",
    description: "Build demand, qualified pipeline, conversion and measurable growth with connected strategy, search, content, paid media, lifecycle marketing and growth intelligence.",
  },
}

// THE HOME PAGE, 28 SEP 2026 — the creative transformation brief, section 29.
// The positioning, the five capabilities and the copy are the approved ones;
// what changed is the presentation. Each section is a chapter with its own
// form, rather than heading-copy-cards eleven times over:
//
//    1  Hero + growth engine            HomeHero
//       Credibility line                CredibilityStrip
//    2  Early proof — BlockGuard        ProofFeature
//    3  Editorial interruption          EditorialStatement
//    4  Connected growth system         ConnectedSystem
//    5  Commercial journey              JourneySection
//       Punctuation                     EditorialStatement
//    6  Intelligence — the dark chapter IntelligenceSection
//    7  Industries preview              IndustriesPreview
//    8  How we work / ways to engage    HowWeWork
//    9  Additional evidence             EvidenceStory (WebBookingPro)
//   10  The Pixelette advantage         GroupAdvantage
//   11  Tell us what needs to grow      ContactSection
//
// GONE FROM THIS PAGE: the "Results that matter" section and its "See client
// results" links (brief, section 20 — proof is shown here, not sent
// elsewhere), the five capability cards, the growth ring, the Who we help
// cards and the scroll-driven strip.
//
// DARK GROUNDS: ONE. The intelligence chapter, which the brief asks to be the
// page's single deliberate change of atmosphere. The logo row that used to
// be a forced second dark band is now a light line (see CredibilityStrip).
//
// The one .rule-cap is on the connected growth system.

// The lead proof is the first measured study; any further measured studies
// and every qualitative one follow in "More evidence". Adding a study to
// caseStudies.ts is the whole of adding it here (brief, section 20).
const [leadStudy, ...moreMeasured] = measuredStudies;

export default function Home() {
  return (
    <>
      <HomeHero />
      <CredibilityStrip />
      {leadStudy && <ProofFeature study={leadStudy} />}
      <EditorialStatement
        lead={interruptionCopy.lead}
        turn={interruptionCopy.turn}
        support={interruptionCopy.support}
      />
      <ConnectedSystem />
      <JourneySection />
      <EditorialStatement
        lead={measurementStatement.lead}
        turn={measurementStatement.turn}
        align='end'
      />
      <IntelligenceSection />
      <IndustriesPreview />
      <HowWeWork />
      {moreMeasured.map(study => (
        <ProofFeature key={study.client} study={study} eyebrow='More evidence' />
      ))}
      {qualitativeStudies.map((study, i) => (
        <section className='sec' key={study.client}>
          <Container className='main'>
            <EvidenceStory
              study={study}
              eyebrow={i === 0 && !moreMeasured.length ? 'More evidence' : undefined}
              level={2}
            />
          </Container>
        </section>
      ))}
      <GroupAdvantage />
      <ContactSection
        id='enquiry'
        eyebrow={homeCloseCopy.eyebrow}
        heading={homeCloseCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
        cta={finalConversionCopy.secondaryCta}
        formIntro={false}
      />
    </>
  );
}
