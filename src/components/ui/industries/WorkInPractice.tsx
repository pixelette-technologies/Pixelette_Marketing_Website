import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { caseStudyAnchor } from "@/components/ui/results";
import {
  WORK_IN_PRACTICE_ID,
  industriesPage
} from "@/data/industries/industries";
import { caseStudyFor } from "@/data/results/caseStudies";
import FigureReveal, { type Figure } from "./FigureReveal";

// /industries, chapter 03: Work in practice. 29 Sep 2026; redesigned 30 Sep to
// the final Industries brief, which rejected the two white cards.
//
// It replaces Results as a navigation destination. The two stories are shown
// here in brief and told in full on /results, which stays live for direct
// links and search; "See the work" goes to the story itself.
//
// ASYMMETRIC ON PURPOSE, and the asymmetry is the argument. BlockGuard's
// evidence is quantitative, WebBookingPro's is qualitative, so BlockGuard is a
// featured blush panel across about two thirds of the row and WebBookingPro an
// open column beside it, no panel at all. Two equal cards would claim the
// evidence is equal, and would tempt someone to manufacture figures for the
// second to fill its slot. It must not be done.
//
// THE WORDS AND FIGURES ARE THE CASE STUDY'S, read from caseStudies.ts, with
// two exceptions, both the brief's: the two headlines, broader than the case
// studies' so the page does not read as a Web3 or a hospitality page, and the
// shorter figure labels below.
//
// THE FIGURES ARE CHECKED, NOT RETYPED. Each one names the case study's value
// and label it presents, and the page fails to build if either has moved — so
// a figure changed on /results cannot silently disagree with this page.
// Checked on 30 Sep against the brief: 5 → 160, 200 → 16.9k, 2,435, 29,974,
// 975. They match. "16.9k" stays in the case study's lower case.
//
// This comes AFTER the market explorer and never before it: the page is about
// markets, and BlockGuard must not define it.

const LEAD = {
  client: "BlockGuard",
  market: "Technology & Innovation",
  heading: "Building visibility and community in a fast-moving digital market"
};

// WebBookingPro is labelled Technology & Innovation because its own case study
// calls it "an accommodation technology solution" in a "hospitality technology
// market": software. No Travel & Hospitality ninth market, on instruction.
const SUPPORT = {
  client: "WebBookingPro",
  market: "Technology & Innovation",
  heading: "Building greater visibility in a competitive market"
};

/** The five figures in the brief's form, each tied to the published entry. */
const LEAD_FIGURES: (Figure & { source: string })[] = [
  {
    from: "5",
    to: "160",
    label: "Ranking keywords",
    source: "ranking keywords - up from 5"
  },
  {
    from: "200",
    to: "16.9k",
    label: "Organic impressions",
    source: "organic impressions - up from 200"
  },
  {
    to: "2,435",
    label: "Campaign participants",
    source: "campaign participants"
  },
  {
    to: "29,974",
    label: "Campaign engagements",
    source: "campaign engagements"
  },
  {
    to: "975",
    label: "New Telegram and Discord community members",
    source: "new Telegram and Discord community members"
  }
];

export default function WorkInPractice() {
  const { eyebrow, heading } = industriesPage.work;
  const lead = caseStudyFor(LEAD.client);
  const support = caseStudyFor(SUPPORT.client);

  const figures: Figure[] = LEAD_FIGURES.map(({ source, ...figure }) => {
    const published = lead.impact.find(item => item.label === source);
    if (!published || published.value !== figure.to) {
      throw new Error(
        `Work in practice: "${figure.to} ${figure.label}" no longer matches the ${lead.client} case study.`
      );
    }
    return figure;
  });

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
            <article className='workFeature'>
              <p className='workInPractice__tag'>
                {LEAD.market} <span aria-hidden='true'>/</span>{" "}
                <span className='workInPractice__client'>{lead.client}</span>
              </p>
              <Heading className='h3 workFeature__heading' level={3}>
                {LEAD.heading}
              </Heading>
              <Text className='body workFeature__context'>
                {lead.challenge}
              </Text>

              <FigureReveal figures={figures} />

              <Link
                href={`/results#${caseStudyAnchor(lead.client)}`}
                className='textLink textLink--brand'
              >
                See the work
                <span aria-hidden='true'>→</span>
              </Link>
            </article>

            <article className='workSupport'>
              <p className='workInPractice__tag'>
                {SUPPORT.market} <span aria-hidden='true'>/</span>{" "}
                <span className='workInPractice__client'>{support.client}</span>
              </p>
              <Heading className='h4 workSupport__heading' level={3}>
                {SUPPORT.heading}
              </Heading>
              <Text className='body'>{support.challenge}</Text>

              {/* Qualitative, because that is what management supplied. Two of
                  the four outcomes, verbatim; the rest are on the story. */}
              <ul className='workSupport__outcomes'>
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
