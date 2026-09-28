import Link from "next/link";
import { Heading } from "@/components/feature";
import { caseAnchor } from "@/data/results/caseStudies";
import type { CaseStudyContent } from "./CaseStudySection";

// A SECONDARY, QUALITATIVE STORY. 28 Sep 2026, the creative transformation
// brief, sections 18 and 21: WebBookingPro.
//
// The brief is exact about this one. Its outcomes are qualitative, it is
// weaker evidence than BlockGuard, and weak evidence must not be made to look
// equivalent to strong. So it is deliberately SMALLER than ProofFeature, it
// carries no figure of any kind, and it says what kind of evidence it is in
// words — "Qualitative outcomes" — rather than leaving the reader to infer it
// from the absence of numbers. Everything else is management's copy from
// caseStudies.ts, verbatim.
//
// It renders only statements-style studies. Handed a study with figures, it
// throws: that study belongs in ProofFeature, and quietly drawing it here
// would make strong evidence look weak — the same fault in the other
// direction.

export default function EvidenceStory({
  study,
  eyebrow,
  level = 3
}: {
  study: CaseStudyContent;
  eyebrow?: string;
  level?: 2 | 3;
}) {
  if (study.impactStyle !== "statements") {
    throw new Error(
      `EvidenceStory renders qualitative studies only; ${study.client} carries figures.`
    );
  }
  const anchor = caseAnchor(study.client);

  return (
    <article className='evidenceStory'>
      <div className='evidenceStory__head'>
        {eyebrow && <p className='eyebrow'>{eyebrow}</p>}
        <p className='evidenceStory__client'>{study.client}</p>
        <Heading className='h3' level={level}>
          {study.heading}
        </Heading>
        <p className='body'>{study.challenge}</p>
      </div>

      <div className='evidenceStory__body'>
        <p className='evidenceStory__kind'>Qualitative outcomes</p>
        <ul className='evidenceStory__outcomes'>
          {study.impact.map(item => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
        <figure className='evidenceStory__quote'>
          <blockquote>
            <p>{study.quote.detail}</p>
          </blockquote>
          <figcaption>
            {study.quote.name}, {study.quote.role}
          </figcaption>
        </figure>
        <Link href={`/results#${anchor}`} className='arrowLink'>
          Read the story
          <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </article>
  );
}
