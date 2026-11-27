import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { deliver, measure } = seoVisibilityContent;

const DocIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true' className='seoNode__icon'>
    <path
      d='M7 3.5h7.2L19 8.2V20.5H7V3.5Z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
    <path d='M14 3.8V8.4H19' fill='none' stroke='currentColor' strokeWidth='1.6' />
    <path d='M9.5 12.2h6.2M9.5 15.4h6.2' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
  </svg>
);

const nodeClass = (id: string) => {
  if (id === "core") return "seoNode seoNode--core";
  if (id === "related") return "seoNode seoNode--related";
  if (id === "hub") return "seoNode seoNode--hub";
  return "seoNode seoNode--priority";
};

const SeoWork = () => {
  return (
    <section className='seoWork'>
      <div className='container_main seoWork__grid'>
        <article className='seoCard seoCard--deliver' aria-labelledby='seo-deliver-heading'>
          <h2 id='seo-deliver-heading' className='seoCard__title'>
            {deliver.heading}
          </h2>
          <div className='seoDeliver'>
            <div className='seoDeliver__list'>
              {deliver.items.map(item => (
                <div className='seoCap' key={item.id}>
                  <input
                    className='seoControl'
                    type='radio'
                    name='seo-capability'
                    id={`seo-cap-${item.id}`}
                  />
                  <label className={`seoCap__label seoCap__label--${item.id}`} htmlFor={`seo-cap-${item.id}`}>
                    <span className='seoCap__title'>{item.title}</span>
                    <span className='seoCap__body'>{item.body}</span>
                  </label>
                </div>
              ))}
            </div>

            <figure className='seoArch'>
              <div className='seoArch__stage'>
                <svg className='seoArch__wires' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden='true'>
                  <line className='seoLine seoLine--core' x1='50' y1='50' x2='16' y2='14' />
                  <line className='seoLine seoLine--related' x1='50' y1='50' x2='84' y2='14' />
                  <line className='seoLine seoLine--hub' x1='50' y1='50' x2='16' y2='86' />
                  <line className='seoLine seoLine--priority' x1='50' y1='50' x2='84' y2='86' />
                </svg>
                <p className='seoHub'>{deliver.centre}</p>
                {deliver.nodes.map(node => (
                  <p key={node.id} className={nodeClass(node.id)}>
                    <DocIcon />
                    <span>{node.label}</span>
                  </p>
                ))}
              </div>
              <figcaption className='seoArch__caption'>{deliver.caption}</figcaption>
            </figure>
          </div>
        </article>

        <article className='seoCard seoCard--measure' aria-labelledby='seo-measure-heading'>
          <h2 id='seo-measure-heading' className='seoCard__title'>
            {measure.heading}
          </h2>
          <div className='seoFrame'>
            <div className='seoFrame__bar'>
              <span className='seoFrame__dots' aria-hidden='true'>
                <i />
                <i />
                <i />
              </span>
              <p className='seoFrame__title'>{measure.frame}</p>
            </div>
            <p className='seoFrame__note'>{measure.note}</p>
            <div className='seoMeasure'>
              {measure.items.map(item => (
                <div className={`seoMeasure__item seoMeasure__item--${item.id}`} key={item.id}>
                  <input
                    className='seoControl'
                    type='radio'
                    name='seo-measure'
                    id={`seo-measure-${item.id}`}
                  />
                  <label className='seoRow' htmlFor={`seo-measure-${item.id}`}>
                    <span className='seoRow__name'>{item.title}</span>
                    <span className='seoRow__hint'>{item.hint}</span>
                    <span className='seoRow__detail'>{item.detail}</span>
                    <span className='seoRow__dot' aria-hidden='true' />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SeoWork;
