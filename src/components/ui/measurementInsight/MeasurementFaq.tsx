import { measurementInsightContent } from "@/data/services/measurementInsight";

const { faqs } = measurementInsightContent;

const MeasurementFaq = () => {
  return (
    <section className='miFaq' aria-labelledby='mi-faq-heading'>
      <div className='container_main'>
        <p className='miEyebrow'>{faqs.eyebrow}</p>
        <h2 id='mi-faq-heading' className='miTitle miTitle--faq'>
          {faqs.heading}
        </h2>
        <div className='miFaq__list'>
          {faqs.items.map(item => (
            <details className='miFaq__item' key={item.question}>
              <summary className='miFaq__question'>
                <span>{item.question}</span>
                <span className='miFaq__mark' aria-hidden='true' />
              </summary>
              <p className='miFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeasurementFaq;
