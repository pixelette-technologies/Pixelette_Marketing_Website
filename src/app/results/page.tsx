import { Container } from "@/components/common";
import { ContactSection } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { CaseStudySection } from "@/components/ui/results";
import { finalConversionCopy, resultsCopy } from "@/data/home";
import { caseStudies } from "@/data/results/caseStudies";
import Link from "next/link";
import type { Metadata } from "next";

const baseUrl = "https://www.pixelettemarketing.com";

// The destination for every "See client results" link the brief puts on the
// homepage — the hero, the proof band and the results section.
//
// IT IS NOT /success_stories. That route serves legacy Pixelette Technologies
// content, was hidden from the navigation on 2 Jun 2026 and is deliberately
// kept out of the sitemap; pointing the brief's CTAs at it would have put
// another company's case studies behind a Pixelette Marketing promise.
//
// The page WAS deliberately thin: the brief's publication gates bar publishing
// any metric without a documented baseline and client approval, and bar
// rewriting the testimonials for sales effect, so it carried the frame and the
// two verbatim quotations and nothing invented to fill it out.
//
// 11 Sep 2026. Management supplied the two case studies the brief named as the
// next content priority, so the gate is satisfied by evidence rather than by
// absence and they render here. See src/data/results/caseStudies.ts for what
// is still missing from them and why it is not filled in.
//
// TeamSection CAME OFF THIS PAGE. It existed to carry the two client
// quotations while there was nothing else to show; both quotations now sit
// inside the case study they are actually about, which is where a testimonial
// is worth most. Rendering both would put each quote on the page twice. The
// home page's TeamSection is untouched and still reads from the same single
// definition in teamData.ts.

export const metadata: Metadata = {
  title: "Client Results | Pixelette Marketing",
  description:
    "What changed after the work started. Client evidence from Pixelette Marketing's growth engagements, with the commercial problem, the work delivered and the outcome.",
  alternates: { canonical: `${baseUrl}/results` },
  openGraph: {
    title: "Client Results | Pixelette Marketing",
    description:
      "What changed after the work started. Client evidence from Pixelette Marketing's growth engagements.",
    url: `${baseUrl}/results`,
    siteName: "Pixelette Marketing",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function ResultsPage() {
  return (
    <>
      {/* .wash-left is the interior-page hero ground, as every page that is
          not the home page takes. The h1 lives here and nowhere else on the
          route — route-walk asserts one per page. */}
      <div className='wash-left'>
        <Container className='main'>
          <section className='resultsHero'>
            <Text className='eyebrow'>{resultsCopy.eyebrow}</Text>
            <Heading className='h1p' level={1}>
              {resultsCopy.heading}
            </Heading>
            <Text className='lead'>{resultsCopy.lead}</Text>
            <Link href='/contactus'>
              <Button className='primary'>Build my growth plan</Button>
            </Link>
          </section>
        </Container>
      </div>

      {/* NO HEADING PAIR ABOVE THESE. The hero directly above already carries
          the eyebrow and the heading for the page, and there is no second pair
          in the brief or in management's copy to give this block. Writing one
          would be inventing copy to complete a pattern — the trap this
          codebase has reverted twice.

          Grounds alternate so two stories read as two, not one long column.
          Neither is dark: see CaseStudySection for why the page keeps all
          three of its bands in hand. */}
      {caseStudies.map((study, index) => (
        <CaseStudySection
          key={study.client}
          content={study}
          ground={index % 2 === 1 ? "alt" : "page"}
        />
      ))}

      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
      />
    </>
  );
}
