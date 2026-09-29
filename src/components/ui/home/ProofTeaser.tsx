import Link from "next/link";
import { Container } from "@/components/common";
import { proofTeaserCopy } from "@/data/home";
import { caseStudyFor } from "@/data/results/caseStudies";

// Home 06: Proof before promises, as a teaser. 29 Sep 2026, locked
// information architecture. It replaced the full Results section (two
// testimonials, "See client results").
//
// COMPACT ON PURPOSE. The opening four sections are the home page's story;
// this is a pointer to the evidence, not the evidence. It routes to Work in
// practice on /industries, which routes to the stories on /results.
//
// ONLY THE TWO BEFORE-AND-AFTER FIGURES, and that is deliberate. BlockGuard's
// figures carry no measurement period (open with management, see
// caseStudies.ts), and the standing rule is that they do not go on the home
// page as standalone proof numbers. A before-and-after pair states its own
// baseline and is named to its client, so it is the least a reader can
// misread; the three raw counts stay on /industries and /results, inside the
// story. If the period is ever supplied, this is the place to revisit.
//
// Figures and labels are read from the case study, verbatim — "16.9k" in
// lower case and "up from" as written. WebBookingPro is named quietly, with
// its own story headline, because its evidence is qualitative.

export default function ProofTeaser() {
  const { heading, lead, cta } = proofTeaserCopy;
  const blockGuard = caseStudyFor("BlockGuard");
  const support = caseStudyFor("WebBookingPro");
  const figures = blockGuard.impact.filter(item => /up from/.test(item.label));

  return (
    <div className='band-alt'>
      <section className='homeTeaser sec' aria-labelledby='proof-teaser-title'>
        <Container className='main'>
          <div className='homeTeaser__grid'>
            <div className='homeTeaser__head'>
              <h2 className='h2' id='proof-teaser-title'>
                {heading}
              </h2>
              <p className='lead homeTeaser__lead'>{lead}</p>
            </div>

            <div className='homeTeaser__body'>
              <p className='homeTeaser__client'>{blockGuard.client}</p>
              <ul className='proofTeaser__figures'>
                {figures.map(item => (
                  <li key={item.label}>
                    <span className='proofTeaser__figure'>{item.value}</span>
                    <span className='proofTeaser__label'>{item.label}</span>
                  </li>
                ))}
              </ul>

              <p className='proofTeaser__also'>
                <span className='homeTeaser__client'>{support.client}</span>{" "}
                {support.heading}
              </p>

              <Link href={cta.to} className='textLink textLink--brand'>
                {cta.label}
                <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
