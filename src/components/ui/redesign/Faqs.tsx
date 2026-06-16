import Reveal from "./Reveal";

/**
 * Faqs - premium editorial FAQ that handles real buyer objections at the
 * decision point (conversion + clarity + trust), emits valid FAQPage JSON-LD
 * (technical readiness + AI-answer eligibility), and uses native
 * details/summary (keyboard-accessible, content crawlable when collapsed).
 *
 * Claims-safe: honest answers only. The proof answer states our discretion
 * policy rather than publishing any unconsented figure or logo.
 */

const FAQS = [
  {
    q: "Do you work on retainer or per project?",
    a: "We are built for retained partnerships, where strategy, demand and proof compound month on month. If a single project is genuinely the better fit for where you are, we will tell you."
  },
  {
    q: "Which sectors do you focus on?",
    a: "Technology and SaaS, Web3 and blockchain, e-commerce and DTC, fintech, and high-growth service businesses. Fast-moving markets where positioning is hard and buyers are sophisticated."
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements open with a focused growth audit in the first weeks, so the roadmap is built on your real funnel rather than assumptions."
  },
  {
    q: "Can we see results and case studies?",
    a: "Yes, on a call. We share relevant work, references and detail with each client's permission, and we do not publish figures or logos we are not cleared to use. Discretion is part of how we work."
  },
  {
    q: "Who will we actually work with?",
    a: "A senior team that owns your roadmap end to end. You work with operators, not account managers reading from a script."
  },
  {
    q: "What happens on the first call?",
    a: "A focused conversation to pressure-test your growth model and show you where compounding could begin. No pitch theatre, and no obligation."
  }
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
};

export default function Faqs() {
  return (
    <section className='pmSection pmSection--light pmFaq'>
      <div className='pmWrap'>
        <Reveal className='pmHead pmHead--split'>
          <div>
            <p className='pmEyebrow pmEyebrow--crim'>Questions</p>
            <h2 className='pmH2 pmH2--ink'>
              What serious teams ask before they start.
            </h2>
          </div>
          <p className='pmLead pmLead--ink'>
            Straight answers, up front. If something here is not clear, it is a
            good first thing to raise on a call.
          </p>
        </Reveal>

        <Reveal className='pmFaq__list'>
          {FAQS.map((f, i) => (
            <details className='pmFaq__item' key={i}>
              <summary className='pmFaq__q'>
                {f.q}
                <span className='pmFaq__icon' aria-hidden='true' />
              </summary>
              <div className='pmFaq__a'>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  );
}
