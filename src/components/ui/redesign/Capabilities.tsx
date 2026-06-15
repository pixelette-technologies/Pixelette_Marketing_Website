import Link from "next/link";
import { engagementData } from "@/data";
import Reveal from "./Reveal";

/**
 * Capabilities - editorial index of the real service set. Hairline rules,
 * large Fraunces names, a quiet arrow micro-interaction on hover, scroll
 * reveals. Claims-safe: capability descriptions only.
 */

export default function Capabilities() {
  return (
    <section className='pmSection pmSection--light pmCap'>
      <div className='pmWrap'>
        <Reveal className='pmHead pmHead--split'>
          <div>
            <p className='pmEyebrow pmEyebrow--crim'>What we run</p>
            <h2 className='pmH2 pmH2--ink'>
              A complete growth function, on retainer.
            </h2>
          </div>
          <p className='pmLead pmLead--ink'>
            One senior team running every lever together, so nothing falls
            between channels and momentum never stalls.
          </p>
        </Reveal>

        <ul className='pmCap__list'>
          {engagementData.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const href = s.route ? `/services/${s.route}` : "/services";
            return (
              <Reveal
                as='li'
                className='pmCap__item'
                key={`${s.mainHeading}-${i}`}
                delay={(i % 2) * 0.06}
              >
                <Link href={href} className='pmCap__link'>
                  <span className='pmCap__idx'>{num}</span>
                  <h3 className='pmCap__name'>
                    {s.mainHeading}
                    <span>{s.subHeading}</span>
                  </h3>
                  <p className='pmCap__body'>{s.text}</p>
                  <span className='pmCap__arrow' aria-hidden='true'>
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
