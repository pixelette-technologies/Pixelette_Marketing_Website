import Reveal from "./Reveal";
import ContactUsForm from "@/components/common/ContactUsForm";

/**
 * ContactClose - premium editorial conversion close, replacing the old
 * brochure-style contact block so the page reads as one piece end to end.
 *
 * Carries real, verified organisation contact facts (from the production
 * LocalBusiness schema) - a VIS-001 credibility signal ("show a real
 * organisation, make contact easy"). Reuses the existing working form.
 * Claims-safe: contact facts only, no proof, metrics, logos or testimonials.
 */

const DETAILS = [
  {
    k: "Email",
    v: "sales@pixelettemarketing.com",
    href: "mailto:sales@pixelettemarketing.com"
  },
  { k: "Telephone", v: "+44 20 4518 8226", href: "tel:+442045188226" },
  { k: "Studio", v: "77 Fulham Palace Road, London W6 8JA" }
];

export default function ContactClose() {
  return (
    <section className='pmSection pmSection--light pmContact'>
      <div className='pmWrap pmContact__grid'>
        <Reveal className='pmContact__intro'>
          <p className='pmEyebrow pmEyebrow--crim'>Start a conversation</p>
          <h2 className='pmH2 pmH2--ink'>
            Tell us where growth should <em>come from.</em>
          </h2>
          <p className='pmLead pmLead--ink'>
            A focused first call, no pitch theatre. We will tell you honestly
            whether we are the right partner for where you are headed.
          </p>

          <ul className='pmContact__details'>
            {DETAILS.map((d) => (
              <li key={d.k}>
                <span className='pmContact__k'>{d.k}</span>
                {d.href ? (
                  <a href={d.href} className='pmContact__v'>
                    {d.v}
                  </a>
                ) : (
                  <span className='pmContact__v'>{d.v}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className='pmContact__form'>
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
}
