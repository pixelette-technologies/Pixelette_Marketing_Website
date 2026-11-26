import { CloseWaveBand } from "@/components/common";
import { socialValueContent as copy } from "@/data/socialValue";
import SocialValueIcon from "./SocialValueIcons";

// /social-value — approved design, 24 Nov 2026.
// Header and footer stay on the root layout. The mosaic is the supplied crop.

const SocialValuePage = () => {
  return (
    <div className='svPage'>
      <section className='svHero' aria-labelledby='sv-hero-heading'>
        <div className='svHero__art'>
          <picture>
            <source srcSet='/social-value/mosaic-hero.webp' type='image/webp' />
            <img
              src='/social-value/mosaic-hero.png'
              alt={copy.image.alt}
              width={copy.image.width}
              height={copy.image.height}
              fetchPriority='high'
              decoding='async'
            />
          </picture>
        </div>
        <div className='svHero__copy'>
          <p className='svHero__eyebrow'>
            <span aria-hidden='true' />
            {copy.eyebrow}
          </p>
          <h1 id='sv-hero-heading' className='svHero__heading'>
            {copy.hero.heading}
          </h1>
          {copy.hero.paragraphs.map(paragraph => (
            <p key={paragraph} className='svHero__text'>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className='svPrinciples' aria-labelledby='sv-principles-heading'>
        <div className='svWrap'>
          <h2 id='sv-principles-heading' className='svPrinciples__heading'>
            {copy.principles.heading}
          </h2>
          <p className='svPrinciples__intro'>{copy.principles.intro}</p>
          <ul className='svCards'>
            {copy.principles.cards.map(card => (
              <li key={card.title} className='svCard'>
                <span className='svCard__icon' aria-hidden='true'>
                  <SocialValueIcon name={card.icon} />
                </span>
                <span className='svCard__rule' aria-hidden='true' />
                <div className='svCard__copy'>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='svFocus' aria-label='How the work is approached'>
        <div className='svWrap svFocus__grid'>
          {copy.columns.map(column => (
            <div key={column.heading} className='svFocus__col'>
              <h2>{column.heading}</h2>
              <p>{column.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <CloseWaveBand
        headingId='sv-close-heading'
        heading={copy.close.heading}
        copy={copy.close.copy}
        cta={copy.close.cta}
      />
    </div>
  );
};

export default SocialValuePage;
