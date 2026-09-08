import { Container } from "@/components/common";
import { ContactSection, TeamSection } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { finalConversionCopy, resultsCopy } from "@/data/home";
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
// The page is deliberately THIN, and honestly so. The brief's publication
// gates bar publishing any metric without a documented baseline, timeframe and
// client approval, and bar rewriting the testimonials for sales effect. So
// this page carries the brief's frame and the two verbatim quotations, and
// nothing invented to fill it out. Evidence-led case studies are named in the
// brief as the next content priority, and they belong here when they exist.

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

      {/* The two testimonials, verbatim, from teamData. */}
      <TeamSection
        mainHeading='Client proof'
        subHeading='In their words'
      />

      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
      />
    </>
  );
}
