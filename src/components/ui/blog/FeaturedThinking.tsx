import Link from "next/link";
import { Container } from "@/components/common";
import { featured, radar } from "@/data/insights/insights";
import AnswerEngine from "./AnswerEngine";
import EditorialMark from "./EditorialMark";

// /blog-list, 02 Featured thinking and 03 On our radar. 30 Sep 2026.
//
// Two sections in one band: side by side from about 1000px, and below that
// they fold on their own flex bases, Featured first and the radar under it,
// which is the mobile order the brief asks for. No media query.
//
// WHOLE-CARD CLICKABILITY without nesting links: the one real link in each
// card is its call to action, and its ::after covers the card. Its accessible
// name carries the title, so a list of links still says where each one goes.

export default function FeaturedThinking() {
  const { article } = featured;

  return (
    <div className='sec-sm'>
      <Container className='main'>
        <div className='ixLead'>
          <section className='ixFeature' aria-labelledby='ix-featured'>
            <h2 className='ixLabel' id='ix-featured'>
              {featured.label}
            </h2>
            <article className='ixFeature__card'>
              <div className='ixFeature__visual'>
                <AnswerEngine />
              </div>
              <div className='ixFeature__body'>
                <p className='ixTag ixTag--format'>{article.format}</p>
                <h3 className='ixFeature__title'>{article.title}</h3>
                <p className='ixFeature__deck'>{article.deck}</p>
                <p className='ixMeta'>
                  <span className='ixTag ixTag--cap'>{article.capability}</span>
                  <span>{article.readMinutes} min read</span>
                </p>
                <Link href={article.href} className='ixFeature__cta ixStretch'>
                  {featured.cta}
                  <span className='ix-sr'>: {article.title}</span>
                  <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </article>
          </section>

          <section className='ixRadar' aria-labelledby='ix-radar'>
            <h2 className='ixLabel' id='ix-radar'>
              {radar.label}
            </h2>
            <ul className='ixRadar__list'>
              {radar.items.map(item => (
                <li key={item.title} className='ixRadar__item'>
                  <div className='ixRadar__top'>
                    <EditorialMark format='Signal' seed={item.title.length} small />
                    <p className='ixTag ixTag--cap'>{item.category}</p>
                  </div>
                  <h3 className='ixRadar__title'>{item.title}</h3>
                  <p className='ixRadar__summary'>{item.summary}</p>
                  <Link href={item.href} className='ixRadar__cta ixStretch'>
                    {radar.cta}
                    <span className='ix-sr'>: {item.title}</span>
                    <span aria-hidden='true'>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
}
