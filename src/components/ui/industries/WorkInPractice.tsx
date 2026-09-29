import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { caseStudyAnchor } from "@/components/ui/results";
import {
  WORK_IN_PRACTICE_ID,
  industriesPage
} from "@/data/industries/industries";
import { caseStudyFor } from "@/data/results/caseStudies";

// /industries, chapter 03: Work in practice. 29 Sep 2026.
//
// It replaces Results as a navigation destination. The two stories are shown
// here in brief and told in full on /results, which stays live for direct
// links and search; "See the work" goes to the story itself.
//
// ASYMMETRIC ON PURPOSE, and the asymmetry is the argument. BlockGuard's
// evidence is quantitative, WebBookingPro's is qualitative, so BlockGuard takes
// roughly 62% of the row and WebBookingPro 38%. Two identical cards would
// claim the evidence is equal, and would tempt someone to manufacture figures
// for the second to fill its slot. It must not be done.
//
// EVERY WORD AND FIGURE IS THE CASE STUDY'S, read from caseStudies.ts rather
// than retyped, with one exception: BlockGuard's headline is the
// specification's suggested positioning line, which is broader than the case
// study's "for a growing Web3 ecosystem" so the Industries page does not read
// as a Web3 page. The five figures were checked against the case study on
// 29 Sep and match it exactly, including "16.9k" in lower case.
//
// This comes AFTER the industry experience and never before it: the page is
// about markets, and BlockGuard must not define it.

const LEAD = {
  client: "BlockGuard",
  heading: "Building visibility and community in a fast-moving digital market"
};
const SUPPORT = { client: "WebBookingPro" };

export default function WorkInPractice() {
  const { eyebrow, heading } = industriesPage.work;
  const lead = caseStudyFor(LEAD.client);
  const support = caseStudyFor(SUPPORT.client);

  return (
    <div className='band-alt' id={WORK_IN_PRACTICE_ID}>
      <Container className='main'>
        <section className='workInPractice sec' aria-labelledby='work-title'>
          <header className='workInPractice__head'>
            <Text className='eyebrow'>{eyebrow}</Text>
            <h2 className='h2' id='work-title'>
              {heading}
            </h2>
          </header>

          <div className='workInPractice__grid'>
            <article className='workStory workStory--lead'>
              <Text className='workStory__client'>{lead.client}</Text>
              <Heading className='h3 workStory__heading' level={3}>
                {LEAD.heading}
              </Heading>
              <Text className='body'>{lead.challenge}</Text>

              <ul className='workStory__figures'>
                {lead.impact.map(item => (
                  <li key={item.label}>
                    <span className='workStory__figure'>{item.value}</span>
                    <span className='workStory__label'>{item.label}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/results#${caseStudyAnchor(lead.client)}`}
                className='textLink textLink--brand'
              >
                See the work
                <span aria-hidden='true'>→</span>
              </Link>
            </article>

            <article className='workStory workStory--support'>
              <Text className='workStory__client'>{support.client}</Text>
              <Heading className='h4 workStory__heading' level={3}>
                {support.heading}
              </Heading>
              <Text className='body'>{support.challenge}</Text>

              {/* Qualitative, because that is what management supplied. Two of
                  the four outcomes, verbatim; the rest are on the story. */}
              <ul className='workStory__outcomes'>
                {support.impact.slice(0, 2).map(item => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>

              <Link
                href={`/results#${caseStudyAnchor(support.client)}`}
                className='textLink textLink--brand'
              >
                See the work
                <span aria-hidden='true'>→</span>
              </Link>
            </article>
          </div>
        </section>
      </Container>
    </div>
  );
}
