import Link from "next/link";
import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";
import PrCollage from "./PrCollage";

const { hero } = prEarnedMediaContent;

const PrHero = () => {
  return (
    <section className='prHero' aria-labelledby='pr-hero-heading'>
      <div className='container_main prHero__inner'>
        <div className='prHero__copy'>
          <p className='prHero__eyebrow'>{hero.eyebrow}</p>
          <h1 id='pr-hero-heading' className='prHero__heading'>
            {hero.headingLines.map(line => (
              <span key={line}>{line}</span>
            ))}
            <span>
              {hero.headingClose} <em>{hero.headingEmphasis}</em>
            </span>
          </h1>
          <p className='prHero__lead'>{hero.lead}</p>
          <Link href={hero.cta.href} className='prHero__cta'>
            {hero.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
        <PrCollage />
      </div>
    </section>
  );
};

export default PrHero;
