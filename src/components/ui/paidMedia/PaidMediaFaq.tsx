import { paidMediaContent } from "@/data/services/paidMedia";

const { faqs } = paidMediaContent;

const PaidMediaFaq = () => {
  return (
    <section className='ppcFaq' aria-labelledby='ppc-faq-heading'>
      <div className='container_main'>
        <h2 id='ppc-faq-heading' className='ppcTitle'>
          {faqs.heading}
        </h2>
        <div className='ppcFaq__list'>
          {faqs.items.map(item => (
            <details className='ppcFaq__item' key={item.question}>
              <summary className='ppcFaq__question'>
                <span>{item.question}</span>
                <span className='ppcFaq__mark' aria-hidden='true' />
              </summary>
              <p className='ppcFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaidMediaFaq;
