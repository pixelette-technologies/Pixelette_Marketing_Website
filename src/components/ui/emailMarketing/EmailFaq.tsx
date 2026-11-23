import { emailMarketingContent } from "@/data/services/emailMarketing";

const { faqs } = emailMarketingContent;

const EmailFaq = () => {
  return (
    <section className='emFaq' aria-labelledby='em-faq-heading'>
      <div className='container_main'>
        <h2 id='em-faq-heading' className='emSectionTitle'>
          {faqs.heading}
        </h2>
        <div className='emFaq__list'>
          {faqs.items.map(item => (
            <details className='emFaq__item' key={item.question}>
              <summary className='emFaq__question'>
                <span>{item.question}</span>
                <span className='emFaq__mark' aria-hidden='true' />
              </summary>
              <p className='emFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmailFaq;
