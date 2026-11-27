import { leadGenerationContent } from "@/data/services/leadGeneration";

const { faqs } = leadGenerationContent;

const LeadFaq = () => {
  return (
    <section className='lgFaq' aria-labelledby='lg-faq-heading'>
      <div className='container_main'>
        <h2 id='lg-faq-heading' className='lgTitle'>
          {faqs.heading}
        </h2>
        <div className='lgFaq__list'>
          {faqs.items.map(item => (
            <details className='lgFaq__item' key={item.question}>
              <summary className='lgFaq__question'>
                <span>{item.question}</span>
                <span className='lgFaq__mark' aria-hidden='true' />
              </summary>
              <p className='lgFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadFaq;
