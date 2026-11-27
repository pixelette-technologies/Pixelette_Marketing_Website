import { paidMediaContent } from "@/data/services/paidMedia";

const { measure } = paidMediaContent;

const PaidMediaMeasure = () => {
  return (
    <section className='ppcMeasure' aria-labelledby='ppc-measure-heading'>
      <div className='container_main ppcMeasure__grid'>
        <div className='ppcMeasure__intro'>
          <h2 id='ppc-measure-heading' className='ppcTitle'>
            {measure.heading}
          </h2>
          <p className='ppcMeasure__lead'>{measure.intro}</p>
        </div>
        <ul className='ppcMeasure__list'>
          {measure.items.map(item => (
            <li className='ppcMeasure__item' key={item.label}>
              <span className='ppcMeasure__label'>{item.label}</span>
              <span className='ppcMeasure__note'>{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PaidMediaMeasure;
