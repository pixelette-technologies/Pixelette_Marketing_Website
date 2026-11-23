import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { measure } = prEarnedMediaContent;

const phrases = measure.line.split(" · ");

const PrMeasure = () => {
  return (
    <section className='prMeasure' aria-labelledby='pr-measure-heading'>
      <div className='container_main prMeasure__row'>
        <h2 id='pr-measure-heading' className='prSectionTitle'>
          {measure.heading}
        </h2>
        <p className='prMeasure__line'>
          {phrases.map((phrase, index) => (
            <span key={phrase}>
              {index > 0 ? " · " : null}
              <span className='prMeasure__phrase'>{phrase}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default PrMeasure;
