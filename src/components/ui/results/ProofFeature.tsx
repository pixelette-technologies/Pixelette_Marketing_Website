import Link from "next/link";
import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { caseAnchor } from "@/data/results/caseStudies";
import type { CaseStudyContent } from "./CaseStudySection";
import ProofFigures from "./ProofFigures";

// "PROOF, NOT PROMISES." — a measured case study. 28 Sep 2026, the creative
// transformation brief, sections 7, 18 and 20.
//
// One component, two pages: the home page, directly under the hero, and the
// Industries page's "Evidence in practice". BlockGuard is the only study that
// qualifies today. Everything rendered comes from the case study itself, so
// the client, the heading, the challenge, the quotation and the figures are
// management's words from caseStudies.ts and cannot be restated here in a
// sharper form.
//
// IT IS A CASE STUDY, NOT A ROW OF STATISTICS, and that is what keeps it
// inside the home-page rule on the figures (see caseStudies.ts): the client
// is named, the before-and-after pairs are drawn as pairs, the totals are
// labelled as one campaign's totals, and the full study is one link away.
//
// BUILT TO TAKE MORE CASES (brief, section 20). It takes any study that
// carries `evidence`, and the pages map over `measuredStudies`, so a second
// measured study appears by being added to caseStudies.ts. Handed a study with
// no evidence it throws: a qualitative story belongs in EvidenceStory.

export default function ProofFeature({
  study,
  eyebrow = "Proof, not promises",
  titleLevel = 3
}: {
  study: CaseStudyContent;
  eyebrow?: string;
  /** The client headline's level. The eyebrow is the section's h2, so the
   *  headline is an h3 beneath it, as every home section has it. */
  titleLevel?: 3 | 4;
}) {
  const { evidence } = study;
  if (!evidence) {
    throw new Error(
      `ProofFeature draws measured studies only; ${study.client} has no evidence.`
    );
  }

  return (
    <section className='proof sec'>
      <Container className='main'>
        <div className='proof__grid'>
          <header className='proof__story'>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <p className='proof__client'>{study.client}</p>
            <Heading className='h2 proof__heading' level={titleLevel}>
              {study.heading}
            </Heading>
            <p className='body proof__challenge'>{study.challenge}</p>
            <p className='body proof__work'>{study.work}</p>

            <figure className='proof__quote'>
              <blockquote>
                <p>{study.quote.detail}</p>
              </blockquote>
              <figcaption>
                {study.quote.name}, {study.quote.role}
              </figcaption>
            </figure>

            <Link
              href={`/results#${caseAnchor(study.client)}`}
              className='arrowLink proof__more'
            >
              View the case study
              <span aria-hidden='true'>→</span>
            </Link>
          </header>

          <div className='proof__evidence'>
            <p className='proof__kind'>Measured outcomes</p>
            <ProofFigures
              progressions={evidence.progressions}
              totals={evidence.totals}
            />
            {/* The figures carry no measurement period, and saying so is
                better than letting a reader assume one. */}
            <p className='src proof__source'>
              Figures as reported in the {study.client} case study.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
