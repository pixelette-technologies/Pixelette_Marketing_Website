import Image from "next/image";
import { leadGenerationContent } from "@/data/services/leadGeneration";

const { hero, outcomes } = leadGenerationContent;

const LeadHero = () => {
  return (
    <section className='lgHero' aria-labelledby='lg-hero-heading'>
      <div className='container_main'>
        <div className='lgHero__split'>
          <div className='lgHero__copy'>
            <p className='lgHero__eyebrow'>{hero.eyebrow}</p>
            <h1 id='lg-hero-heading' className='lgHero__heading'>
              {hero.headingLead} <em>{hero.headingEmphasis}</em>
            </h1>
            <p className='lgHero__lead'>{hero.lead}</p>
            <p className='lgHero__strap'>{hero.strap}</p>
          </div>
          <div className='lgHero__art'>
            <Image
              className='lgHero__image'
              src='/services/lead_generation/action-triptych.png'
              alt={hero.artAlt}
              width={585}
              height={431}
              priority
              sizes='(max-width: 900px) 100vw, 40rem'
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <ul className='lgOutcomes'>
          {outcomes.map(item => (
            <li className='lgOutcomes__item' key={item.title}>
              <p className='lgOutcomes__title'>{item.title}</p>
              <p className='lgOutcomes__body'>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LeadHero;
