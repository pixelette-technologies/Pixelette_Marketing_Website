import Link from "next/link";
import { socialValueContent as copy } from "@/data/socialValue";
import SocialValueIcon from "./SocialValueIcons";

// /social-value — approved design, 24 Nov 2026.
// Header and footer stay on the root layout. The mosaic is the supplied crop.

const SocialValuePage = () => {
  return (
    <div className='svPage'>
      <section className='svHero' aria-labelledby='sv-hero-heading'>
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

      <section className='svClose' aria-labelledby='sv-close-heading'>
        <svg
          className='svClose__wave'
          viewBox='0 0 1440 96'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path
            fill='currentColor'
            d='M0 96V58C160 22 340 8 560 28C760 46 900 78 1080 52C1240 28 1360 10 1440 18V96H0Z'
          />
        </svg>
        <div className='svClose__band'>
          <div className='svWrap svClose__inner'>
            <h2 id='sv-close-heading'>{copy.close.heading}</h2>
            <p>{copy.close.copy}</p>
            <Link href={copy.close.cta.href} className='svClose__cta'>
              {copy.close.cta.label}
              <span aria-hidden='true'> →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialValuePage;
