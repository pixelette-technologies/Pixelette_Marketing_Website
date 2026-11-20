import Image from "next/image";
import Link from "next/link";
import { influencerPartnershipsContent } from "@/data/services/influencerPartnerships";

const { hero } = influencerPartnershipsContent;

const InfluencerHero = () => {
  return (
    <section className='ipHero' aria-labelledby='ip-hero-heading'>
      <div className='ipHero__media' aria-hidden='true'>
        <Image
          src={hero.image.src}
          alt=''
          fill
          priority
          sizes='100vw'
          className='ipHero__image'
        />
      </div>

      <div className='ipHero__shade' aria-hidden='true' />

      <div className='container_main ipHero__inner'>
        <div className='ipHero__copy'>
          <p className='ipHero__eyebrow'>{hero.eyebrow}</p>

          <h1 id='ip-hero-heading' className='ipHero__heading'>
            <span className='ipHero__headingLead'>{hero.headingLead}</span>{" "}
            <span className='ipHero__headingAccent'>{hero.headingAccent}</span>
          </h1>

          <p className='ipHero__lead'>{hero.lead}</p>

          <Link href={hero.cta.href} className='ipHero__cta'>
            {hero.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>

        <p className='ipHero__annotation' aria-hidden='true'>
          {hero.annotation.map(line => (
            <span key={line} className='ipHero__annotationLine'>
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default InfluencerHero;
