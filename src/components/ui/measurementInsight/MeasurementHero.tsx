import Image from "next/image";
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
            <span className='miHero__line'>
              <em className='miHero__accent'>{hero.lineTwo}</em>
            </span>
          </h1>
          <p className='miHero__lead'>{hero.lead}</p>
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
    </section>
  );
};

export default MeasurementHero;
