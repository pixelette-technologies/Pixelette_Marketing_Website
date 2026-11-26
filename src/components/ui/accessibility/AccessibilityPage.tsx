import Link from "next/link";
import { CloseWaveBand } from "@/components/common";
import { accessibilityContent as copy } from "@/data/accessibility";
import AccessibilityIcon from "./AccessibilityIcons";

// /accessibility — approved design, 24 Nov 2026.
// Header and footer stay on the root layout. The mosaic is the supplied crop.
// Both page buttons go to the contact page. The header CTA is unchanged.

const AccessibilityPage = () => {
  return (
    <div className='axPage'>
      <section className='axHero' aria-labelledby='ax-hero-heading'>
        <div className='axHero__art'>
          <picture>
            <source srcSet='/accessibility/mosaic-hero.webp' type='image/webp' />
            <img
              src='/accessibility/mosaic-hero.png'
              alt={copy.image.alt}
              width={copy.image.width}
              height={copy.image.height}
              fetchPriority='high'
              decoding='async'
            />
          </picture>
        </div>
        <div className='axHero__copy'>
          <p className='axHero__eyebrow'>
            <span aria-hidden='true' />
            {copy.eyebrow}
          </p>
          <h1 id='ax-hero-heading' className='axHero__heading'>
            {copy.hero.headingLines.map(line => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          {copy.hero.paragraphs.map(paragraph => (
            <p key={paragraph} className='axHero__text'>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className='axMatters' aria-labelledby='ax-matters-heading'>
        <div className='axWrap'>
          <h2 id='ax-matters-heading' className='axMatters__heading'>
            {copy.matters.heading}
          </h2>
          <p className='axMatters__intro'>{copy.matters.intro}</p>
          <ul className='axCards'>
            {copy.matters.cards.map(card => (
              <li key={card.title} className='axCard'>
                <span className='axCard__icon' aria-hidden='true'>
                  <AccessibilityIcon name={card.icon} />
                </span>
                <span className='axCard__rule' aria-hidden='true' />
                <div className='axCard__copy'>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='axHelp' aria-labelledby='ax-help-heading'>
        <div className='axWrap'>
          <div className='axHelp__panel'>
            <span className='axHelp__icon' aria-hidden='true'>
              <AccessibilityIcon name='message' />
            </span>
            <span className='axHelp__rule' aria-hidden='true' />
            <div className='axHelp__copy'>
              <h2 id='ax-help-heading'>{copy.help.heading}</h2>
              <p>{copy.help.copy}</p>
            </div>
            <Link href={copy.help.cta.href} className='btn btn--pill axCta'>
              {copy.help.cta.label}
              <span aria-hidden='true'> →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className='axWork' aria-labelledby='ax-work-heading'>
        <div className='axWrap axWork__grid'>
          <div className='axWork__lead'>
            <h2 id='ax-work-heading'>{copy.work.heading}</h2>
            <p>{copy.work.left}</p>
          </div>
          <span className='axWork__rule' aria-hidden='true' />
          <p className='axWork__aside'>{copy.work.right}</p>
        </div>
      </section>

      <CloseWaveBand
        headingId='ax-close-heading'
        heading={copy.close.heading}
        copy={copy.close.copy}
        cta={copy.close.cta}
      />
    </div>
  );
};

export default AccessibilityPage;
