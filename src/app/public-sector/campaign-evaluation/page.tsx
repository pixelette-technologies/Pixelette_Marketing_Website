import Link from "next/link";
import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Campaign evaluation",
  description:
    "Did the campaign achieve what it was for? Evaluation against public outcomes using the GCS Evaluation Cycle and Magenta Book limits.",
  path: "/public-sector/campaign-evaluation",
  index: false
});

/** Stages verified against the GCS Evaluation Cycle page (updated 14 Sep 2026).
 *  Impact / Outcomes “what it measures” use the live Cycle wording where the
 *  plan’s table quoted an older formulation. */
const stages = [
  {
    stage: "Inputs",
    measures: "What you put in — evidence-based planning and content creation",
    produce:
      "The objective, the audience evidence, and the evaluation design, written before delivery starts"
  },
  {
    stage: "Outputs",
    measures:
      "Audience experience — what is delivered and how your audience encounters and interacts with your communications through reach, distribution and exposure",
    produce: "Reach and distribution against plan, by audience segment"
  },
  {
    stage: "Outtakes",
    measures:
      "Audience perceptions — what your audience think, feel or intend to do because of your communication activities",
    produce:
      "Awareness, comprehension, sentiment and stated intention, measured against a baseline"
  },
  {
    stage: "Outcomes",
    measures: "Audience behaviour — the response from and behaviour of your audience",
    produce: "The behaviour the campaign existed to change, measured"
  },
  {
    stage: "Impact",
    measures:
      "What you achieve — in terms of organisation and policy objectives and KPIs",
    produce:
      "A plain answer on whether the objective was met, and by how much"
  },
  {
    stage: "Learning and innovation",
    measures: "What you play forward",
    produce: "What we would do differently, including anything that did not work"
  }
] as const;

export default function CampaignEvaluationPage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Did the campaign achieve what it was for?
            </Heading>
            <Text className='lead'>
              Reach is easy to report. Whether anything changed is the harder
              question, and it is the one a public buyer has to answer — to a
              board, to a committee, or to whoever signed off the money.
            </Text>
            <Text className='body'>
              We evaluate communications campaigns against the outcome they
              were commissioned to achieve, using the frameworks government
              already works to, and we are explicit about what the evidence can
              and cannot establish.
            </Text>
          </section>
        </Container>
      </div>

      <Container className='main'>
        <section className='sec' aria-labelledby='how-title'>
          <Heading className='h2' level={2} id='how-title'>
            How we work
          </Heading>
          <Text className='body'>
            Government communications are evaluated through the GCS Evaluation
            Cycle, published 8 February 2024 and most recently updated 14
            September 2026, which the Government Communication Service
            describes as an &quot;agile evolution of our previous model, the
            Evaluation Framework 2.0&quot;. We work to its six stages rather
            than to a framework of our own invention:
          </Text>
          <div className='sec-sm' style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th scope='col'>Stage</th>
                  <th scope='col'>What it measures</th>
                  <th scope='col'>What we produce</th>
                </tr>
              </thead>
              <tbody>
                {stages.map(row => (
                  <tr key={row.stage}>
                    <th scope='row'>{row.stage}</th>
                    <td>{row.measures}</td>
                    <td>{row.produce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Text className='body'>
            These categories are not ours. The Evaluation Cycle states that
            metrics &quot;should be divided into inputs, outputs, outtakes and
            outcomes, in line with definitions widely used by the International
            Association for Measurement and Evaluation of Communication (AMEC)
            and other professional bodies.&quot;
          </Text>
        </section>

        <section className='sec' aria-labelledby='baseline-title'>
          <Heading className='h2' level={2} id='baseline-title'>
            Evaluation starts before the campaign, or it is not evaluation
          </Heading>
          <Text className='body'>
            The single most common reason a campaign cannot be evaluated is
            that nobody recorded the before state. Once it is gone it cannot be
            recovered.
          </Text>
          <Text className='body'>
            The Evaluation Cycle asks communicators to &quot;Embed evaluation
            upfront as a core element in every communication plan&quot;. The
            OASIS planning framework puts it more concretely still, asking you
            to &quot;Establish a current baseline measure if no communication
            activity were to take place.&quot;
          </Text>
          <Text className='body'>
            That is a counterfactual, and it is the whole game. HM
            Treasury&apos;s Magenta Book, the central government guidance on
            evaluation, most recently updated 15 May 2026, frames impact
            evaluation as establishing &quot;the extent to which any observed
            changes can be attributed to the intervention&quot; against
            &quot;what would have happened in the absence of the policy&quot;.
          </Text>
          <Text className='body'>
            So the first thing we do on any campaign is write down what is
            happening now. If you are talking to us after a campaign has
            finished and no baseline was recorded, we will tell you what can
            still be reconstructed and what cannot, rather than producing a
            number that cannot be defended.
          </Text>
        </section>

        <section className='sec' aria-labelledby='limits-title'>
          <Heading className='h2' level={2} id='limits-title'>
            What evaluation cannot tell you
          </Heading>
          <Text className='body'>
            We would rather set this out before you commission us than explain
            it in a final report.
          </Text>
          <Text className='body'>
            The Magenta Book is direct about the limits. &quot;No one evaluation
            approach can appropriately evaluate all types of intervention.&quot;
            Knowing the size of an effect &quot;will rarely explain why this
            impact occurred&quot;. Impact evaluation &quot;cannot on its own
            assess whether those outcomes are justified&quot;. And on reporting,
            it is unambiguous: &quot;clear communication of the limitations of
            evaluation findings must always be given.&quot;
          </Text>
          <Text className='body'>In practice that means:</Text>
          <ul className='body'>
            <li>
              Attribution is a matter of degree, not a yes or no. Establishing
              impact &quot;should involve rigorous comparison either in time,
              between groups or to alternative theories&quot;. Where we cannot
              run that comparison, we say the result is indicative and explain
              why
            </li>
            <li>
              A campaign is never the only thing happening. National coverage, a
              change in policy, the weather and the season all move the same
              numbers
            </li>
            <li>
              Some outcomes arrive after the reporting period. We will tell you
              which of your objectives cannot honestly be assessed inside the
              timescale you have
            </li>
            <li>
              Small audiences produce wide margins. On a campaign reaching a few
              thousand people, a change of a few percentage points may not mean
              anything
            </li>
          </ul>
          <Text className='body'>
            An evaluation that reports only what worked is a marketing document,
            not an evaluation.
          </Text>
        </section>

        <section className='sec' aria-labelledby='cost-title'>
          <Heading className='h2' level={2} id='cost-title'>
            What it costs, and what it should cost
          </Heading>
          <Text className='body'>
            The Magenta Book&apos;s principle is proportionality: &quot;All
            policies, programmes and projects should be subject to proportionate
            evaluation&quot;, and a good evaluation &quot;is proportionate in
            scale&quot;. A small campaign does not need a large evaluation.
          </Text>
          <Text className='body'>
            For paid campaigns there is a published benchmark. The GCS
            Evaluation Cycle states: &quot;For paid-for campaigns: We recommend
            that approximately 5 to 10% of total campaign resources are
            allocated to evaluation&quot; — and notes this should go to
            &quot;research and optimisation which can include both in-house and
            outside agency research.&quot;
          </Text>
          <Text className='body'>
            We use that proportion to sense-check whether an evaluation has been
            budgeted for at all.
          </Text>
          <Text className='body'>
            Government guidance recommends that roughly 5 to 10% of a paid
            campaign&apos;s resources go to evaluation, so in public-sector work
            this is usually a line that has already been budgeted for. What it
            costs with us depends on what you need measured and how much of it
            can come from data you already hold. We will tell you the price for
            the evaluation your campaign actually needs. If that is more than
            the guidance implies for your budget, we will say so and let you
            decide, rather than scope the work down until it stops being
            evidence.
          </Text>
        </section>

        <section className='sec' aria-labelledby='ways-title'>
          <Heading className='h2' level={2} id='ways-title'>
            Three ways to buy it
          </Heading>
          <ul className='body'>
            <li>
              <strong>Evaluation design, before a campaign</strong> — the
              objective, the baseline, the measurement plan. The cheapest and
              most valuable thing we do.
            </li>
            <li>
              <strong>Evaluation delivery, alongside a campaign</strong> —
              measurement through the six stages, with real-time reporting.
            </li>
            <li>
              <strong>Independent evaluation, after a campaign</strong> —
              including campaigns someone else ran.
            </li>
          </ul>
          <Text className='body'>
            A worked evaluation will appear on /public-sector/demonstrations
            when labelled demonstration concepts are ready. Until then that
            page is not linked from this site.
          </Text>
        </section>
      </Container>
    </>
  );
}
