import Reveal from "./Reveal";
import ContactUsForm from "@/components/common/ContactUsForm";

/**
 * EdContact - the conversion close. Real, verified organisation contact facts
 * (a VIS-001 credibility signal: show a real organisation, make contact easy)
 * + the existing working Resend-backed form. Claims-safe: contact facts only.
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

export default function EdContact() {
  return (
    <section className="edSection edContact" id="contact">
      <div className="edWrap edContact__grid">
        <Reveal>
          <p className="edEyebrow">Start a conversation</p>
          <h2 className="edContact__title">
            Tell us where growth should <em>come from.</em>
          </h2>
          <p className="edLead" style={{ marginTop: "2.4rem" }}>
            A focused first call, no pitch theatre. We will tell you honestly
            whether we are the right partner for where you are headed.
          </p>

          <ul className="edContact__details">
            {DETAILS.map((d) => (
              <li key={d.k}>
                <span className="edContact__k">{d.k}</span>
                {d.href ? (
                  <a href={d.href} className="edContact__v">
                    {d.v}
                  </a>
                ) : (
                  <span className="edContact__v">{d.v}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="edContact__form">
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
}
