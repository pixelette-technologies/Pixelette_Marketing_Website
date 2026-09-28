import Link from "next/link";
import { Container } from "@/components/common";
import { growthProcessData, waysToWorkData } from "@/data/home";

// HOW WE WORK / WAYS TO ENGAGE — 28 Sep 2026, the creative transformation
// brief, section 29 item 8: "present this without another generic grid if
// possible".
//
// Two sections became one chapter with two halves, because they answer one
// question — what happens if I get in touch? — in two parts: the four steps
// every engagement goes through, then the three shapes an engagement can take.
//
//   THE PROCESS is a single line with four stops, numbered, read left to
//   right. It was a card grid on its own dark band; the band is released so
//   the intelligence chapter can be the page's one dark ground.
//   THE ENGAGEMENTS are three rows on hairlines — name, what it is, what you
//   leave with — which is the rows idiom the design system already sanctions
//   for things that are compared rather than browsed. Management's own words,
//   verbatim, with the closing sentence of each in its own column, as it was
//   in PointItem's `outcome` slot.
//
// One CTA for the chapter. The process's own ("Start with your growth
// challenge") and the engagements' ("Discuss the right engagement") both led
// to /contactus; two buttons to one form, a screen apart, is one too many.

export default function HowWeWork() {
  const process = growthProcessData;
  const ways = waysToWorkData;

  return (
    <section className='howWeWork sec'>
      <Container className='main'>
        <div className='howWeWork__inner'>
          <h2 className='eyebrow'>How we work</h2>

          <div className='howWeWork__part'>
            <p className='howWeWork__kicker'>{process.eyebrow}</p>
            <h3 className='h2'>{process.heading}</h3>

            <ol className='processLine'>
              {process.items.map(step => (
                <li key={step.title} className='processLine__step'>
                  <span className='processLine__num' aria-hidden='true'>
                    {step.index}
                  </span>
                  <h4 className='processLine__title'>{step.title}</h4>
                  <p className='processLine__body'>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className='howWeWork__part'>
            <p className='howWeWork__kicker'>{ways.eyebrow}</p>
            <h3 className='h2'>{ways.heading}</h3>
            {ways.lead && <p className='lead howWeWork__lead'>{ways.lead}</p>}

            <ul className='engagements'>
              {ways.items.map(item => (
                <li key={item.title} className='engagements__row'>
                  <h4 className='engagements__title'>{item.title}</h4>
                  <p className='engagements__body'>{item.body}</p>
                  {item.outcome && (
                    <p className='engagements__outcome'>{item.outcome}</p>
                  )}
                </li>
              ))}
            </ul>

            {ways.closing && <p className='small howWeWork__closing'>{ways.closing}</p>}

            {ways.cta && (
              <Link href={ways.cta.to} className='btn btn--arrow howWeWork__cta'>
                {ways.cta.label}
                <span aria-hidden='true'>→</span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
