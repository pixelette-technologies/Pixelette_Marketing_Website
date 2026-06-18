import Link from "next/link";
import { engagementData } from "@/data";
import Reveal from "./Reveal";

/**
 * EdCapabilities - the offer, as an editorial index of the real service set
 * (engagementData). Hairline rules, large Playfair names, a quiet arrow on
 * hover. Claims-safe: capability descriptions only.
 */
export default function EdCapabilities() {
  return (
    <section className="edSection edCap" id="capabilities">
      <div className="edWrap">
        <Reveal className="edCap__head">
          <div className="edHead">
            <p className="edEyebrow">What we run</p>
            <h2 className="edHead__title">
              A complete growth function, on retainer.
            </h2>
          </div>
          <p className="edLead">
            One senior team running every lever together, so nothing falls
            between channels and momentum never stalls.
          </p>
        </Reveal>

        <ul className="edCap__list">
          {engagementData.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const href = s.route ? `/services/${s.route}` : "/services";
            return (
              <Reveal as="li" className="edCap__item" key={`${s.mainHeading}-${i}`}>
                <Link href={href} className="edCap__link">
                  <span className="edCap__idx">{num}</span>
                  <h3 className="edCap__name">
                    {s.mainHeading}
                    <span>{s.subHeading}</span>
                  </h3>
                  <p className="edCap__body">{s.text}</p>
                  <span className="edCap__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
