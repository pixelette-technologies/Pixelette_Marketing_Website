import Image from "next/image";
import Link from "next/link";
import { measurementInsightContent } from "@/data/services/measurementInsight";

const { hero } = measurementInsightContent;

const MeasurementHero = () => {
  return (
    <section className='miHero' aria-labelledby='mi-hero-heading'>
      <div className='container_main miHero__grid'>
        <div className='miHero__copy'>
          <p className='miHero__eyebrow'>{hero.eyebrow}</p>
          <h1 id='mi-hero-heading' className='miHero__heading'>
            <span className='miHero__line'>{hero.lineOne}</span>
            <span className='miHero__line'>{hero.lineTwo}</span>
          </h1>
          <p className='miHero__lead'>{hero.lead}</p>
          <Link href={hero.cta.href} className='miCta'>
            {hero.cta.label}
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
        <div className='miHero__art'>
          <Image
            className='miHero__image'
            src='/services/measurement/hero-collage.png'
            alt={hero.artAlt}
            width={709}
            height={477}
            priority
            sizes='(max-width: 900px) 100vw, 46rem'
          />
        </div>
      </div>
      <div className='miHero__waveWrap' aria-hidden='true'>
        <Image
          className='miHero__waves'
          src='/services/measurement/hero-waves.png'
          alt=''
          width={1024}
          height={110}
          sizes='100vw'
        />
      </div>
    </section>
  );
};

export default MeasurementHero;
