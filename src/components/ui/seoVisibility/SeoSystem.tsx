import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { system } = seoVisibilityContent;

const SeoSystem = () => {
  return (
    <section className='seoSystem' aria-labelledby='seo-system-heading'>
      <div className='container_main seoSystem__grid'>
        <h2 id='seo-system-heading' className='seoSystem__heading'>
          {system.headingLead} <em>{system.headingEmphasis}</em>
        </h2>
        <div className='seoSystem__aside'>
          <p className='seoSystem__support'>{system.support}</p>
          <ol className='seoPath'>
            {system.steps.map((step, index) => (
              <li className='seoPath__item' key={step}>
                {index > 0 ? (
                  <span className='seoPath__arrow' aria-hidden='true'>
                    →
                  </span>
                ) : null}
                <span className='seoPath__step' tabIndex={0}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default SeoSystem;
