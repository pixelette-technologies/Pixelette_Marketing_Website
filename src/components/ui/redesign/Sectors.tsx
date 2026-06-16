import Link from "next/link";
import { dynamicMarketData } from "@/data";
import Reveal from "./Reveal";

/**
 * Sectors - editorial "built for" band. Typographic list, hairline dividers,
 * arrow micro-interaction, scroll reveals. Claims-safe positioning only.
 */

export default function Sectors() {
  return (
    <section className='pmSection pmSection--raised pmSectors'>
      <div className='pmWrap'>
        <Reveal className='pmHead pmHead--split'>
          <div>
            <p className='pmEyebrow pmEyebrow--crim'>Built for</p>
            <h2 className='pmH2 pmH2--ink'>
              Ambitious technology, commerce and Web3 brands.
            </h2>
          </div>
          <p className='pmLead pmLead--ink'>
            Operators in fast-moving markets where positioning is hard, buyers
            are sophisticated and growth has to be earned.
          </p>
        </Reveal>

        <ul className='pmSectors__grid'>
          {dynamicMarketData.map((s, i) => {
            const href = s.route ? `/industries/${s.route}` : "/industries";
            return (
              <Reveal
                as='li'
                className='pmSectors__item'
                key={`${s.mainHeading}-${i}`}
                delay={(i % 3) * 0.06}
              >
                <Link href={href} className='pmSectors__link'>
                  <h3 className='pmSectors__name'>
                    {s.mainHeading}
                    <span> {s.subHeading}</span>
                  </h3>
                  <p className='pmSectors__body'>{s.text}</p>
                  <span className='pmSectors__arrow' aria-hidden='true'>
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
