import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { hero, search, ai } = seoVisibilityContent;

const SearchIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true' className='seoQuery__icon'>
    <circle cx='10.5' cy='10.5' r='6.25' fill='none' stroke='currentColor' strokeWidth='1.8' />
    <path d='M15.2 15.2 20 20' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);

const SeoHero = () => {
  return (
    <section className='seoHero' aria-labelledby='seo-hero-heading'>
      <div className='container_main seoHero__inner'>
        <div className='seoHero__copy'>
          <p className='seoHero__eyebrow'>{hero.eyebrow}</p>
          <h1 id='seo-hero-heading' className='seoHero__heading'>
            {hero.heading}
            <span>
              {hero.headingRest} <em>{hero.headingEmphasis}</em>
            </span>
          </h1>
          <p className='seoHero__lead'>{hero.lead}</p>
        </div>

        <div className='seoMonitor'>
          <div className='seoMonitor__bezel'>
            <div className='seoScreen'>
              <p className='seoQuery'>
                <SearchIcon />
                <span>{hero.query}</span>
              </p>

              <div className='seoTabs'>
                <input
                  className='seoControl'
                  type='radio'
                  name='seo-discovery'
                  id='seo-view-search'
                  defaultChecked
                />
                <input
                  className='seoControl'
                  type='radio'
                  name='seo-discovery'
                  id='seo-view-ai'
                />
                <div className='seoTabs__bar'>
                  <label htmlFor='seo-view-search'>Traditional search</label>
                  <label htmlFor='seo-view-ai'>AI-assisted discovery</label>
                </div>
              </div>

              <div className='seoPanels'>
                <article className='seoPanel seoPanel--search'>
                  <p className='seoPanel__kicker'>
                    <span>{search.index}</span>
                    {search.kicker}
                  </p>
                  {search.blocks.map(block => (
                    <div key={block.title}>
                      <p className='seoPanel__title'>{block.title}</p>
                      <p className='seoPanel__body'>{block.body}</p>
                    </div>
                  ))}
                  <p className='seoPanel__tag'>{search.tag}</p>
                </article>

                <article className='seoPanel seoPanel--ai'>
                  <p className='seoPanel__kicker'>
                    <span>{ai.index}</span>
                    {ai.kicker}
                  </p>
                  <p className='seoPanel__body'>{ai.body}</p>
                  <p className='seoPanel__sourcesLabel'>{ai.sourcesLabel}</p>
                  <ul className='seoPanel__sources'>
                    {ai.sources.map(source => (
                      <li key={source}>
                        {source}
                        <span aria-hidden='true'> ↗</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <p className='seoDisclaimer'>{hero.disclaimer}</p>
            </div>
          </div>
          <div className='seoMonitor__neck' aria-hidden='true' />
          <div className='seoMonitor__base' aria-hidden='true' />
        </div>
      </div>
    </section>
  );
};

export default SeoHero;
