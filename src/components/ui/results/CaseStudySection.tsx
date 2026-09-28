import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { caseAnchor } from "@/data/results/caseStudies";
import type { ClientQuote } from "@/data/teamData";
import type { CaseStudyEvidence } from "@/data/results/caseStudies";
import { FC } from "react";

export interface CaseStudyImpact {
  /** The figure. Absent on a qualitative outcome. */
  value?: string;
  label: string;
}

export interface CaseStudyContent {
  client: string;
  heading: string;
  challenge: string;
  work: string;
  impactHeading: string;
  /** EXPLICIT, never derived from whether the items happen to carry values.
   *  See the note below. */
  impactStyle: "figures" | "statements";
  impact: CaseStudyImpact[];
  /** Measured outcomes as numbers, for ProofFeature. Absent on a
   *  qualitative study. See caseStudies.ts, 28 Sep 2026. */
  evidence?: CaseStudyEvidence;
  /** Trailing line. Only one of the two case studies has one. */
  closing?: string;
  quote: ClientQuote;
}

export interface CaseStudySectionProps {
  content: CaseStudyContent;
  ground?: "page" | "alt";
}

// One client story on /results: who it was, what was in the way, what we did,
// what changed, and the client saying so.
//
// It takes the standard section anatomy rather than a new one — the client
// name is the real <h2> in the eyebrow slot and the story headline is the
// visual .h2 on an <h3>, which is the same visual-level / semantic-level split
// ItemsSection, GrowthSection and every interior hero already use. On /results
// the <h1> belongs to the hero, so two case studies give the page a flat list
// of two <h2>s and nothing competes with it.
//
// IMPACT STYLE IS A PROP, NOT INFERRED. It would be trivial to check whether
// every item carries a `value` and pick the layout from that, and it would be
// wrong for the same reason ItemsSection takes `grid` explicitly: the moment
// someone adds a fifth qualitative line to a set of four figures, the whole
// block silently changes shape and nobody sees it until it renders. The call
// site states which it is.
//
// THERE IS NO DARK GROUND OPTION. The page spends none of its three bands
// today and the impact figures are the obvious candidate for one, but dark is
// punctuation in this system and two case studies running back to back would
// take two of the three. Left on page/alt until someone has actually seen the
// page. Ground is read from the band in SCSS, as everywhere else.
const CaseStudySection: FC<CaseStudySectionProps> = ({
  content,
  ground = "page"
}) => {
  const {
    client,
    heading,
    challenge,
    work,
    impactHeading,
    impactStyle,
    impact,
    closing,
    quote
  } = content;

  const inner = (
    <Container className='main'>
      {/* The id is the anchor "View the case study" links to from the home
          page and /industries, 28 Sep 2026. Derived from the client name so
          a new study gets one without anyone remembering to add it. */}
      <article
        className='caseStudy'
        id={caseAnchor(client)}
      >
        <header>
          <Heading className='eyebrow' level={2}>
            {client}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
          <Text className='lead'>{challenge}</Text>
          <Text className='body'>{work}</Text>
        </header>

        <section className='caseStudy__impact'>
          {/* h4, one level below the story headline's h3. */}
          <Heading className='h4 caseStudy__impactHeading' level={4}>
            {impactHeading}
          </Heading>

          {/* A list, because that is what it is. The figure and its label are
              one item, so they sit in one <li> rather than being split across
              a definition list that screen readers would read as two. */}
          <ul
            className={`caseStudy__impactList caseStudy__impactList--${impactStyle}`}
            data-reveal='stagger'
          >
            {impact.map((item, index) => (
              <li key={index}>
                {item.value && (
                  <span className='caseStudy__figure'>{item.value}</span>
                )}{" "}
                <span className='caseStudy__label'>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {closing && <Text className='body caseStudy__closing'>{closing}</Text>}

        {/* The quotation sits with the engagement it is about. On the home page
            the same two sentences render as a detached pair in TeamSection; the
            text comes from one definition in teamData.ts so the two cannot
            drift. cite= carries the attribution machine-readably; the visible
            attribution is a <figcaption>, which is the element for it. */}
        <figure className='caseStudy__quote'>
          <blockquote>
            <Text className='lead'>{quote.detail}</Text>
          </blockquote>
          <figcaption>
            <span className='caseStudy__quoteName'>{quote.name}</span>{" "}
            <span className='caseStudy__quoteRole'>{quote.role}</span>
          </figcaption>
        </figure>
      </article>
    </Container>
  );

  // Same wrapper rule as ItemsSection: a full-bleed ground has to sit outside
  // the container or it clips to the wrap, and on the page ground there is
  // nothing to bleed, so no empty div is emitted.
  return ground === "alt" ? <div className='band-alt'>{inner}</div> : inner;
};

export default CaseStudySection;
