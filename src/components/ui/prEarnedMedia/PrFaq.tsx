import { prEarnedMediaContent } from "@/data/services/prEarnedMedia";

const { faqs } = prEarnedMediaContent;

const PrFaq = () => {
  return (
    <section className='prFaq' aria-labelledby='pr-faq-heading'>
      <div className='container_main'>
        <h2 id='pr-faq-heading' className='prSectionTitle'>
          {faqs.heading}
        </h2>
        <div className='prFaq__list'>
          {faqs.items.map(item => (
            <details className='prFaq__item' key={item.question}>
              <summary className='prFaq__question'>
                <span>{item.question}</span>
                <span className='prFaq__mark' aria-hidden='true' />
              </summary>
              <p className='prFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrFaq;
