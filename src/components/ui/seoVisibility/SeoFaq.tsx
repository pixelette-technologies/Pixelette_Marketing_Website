import { seoVisibilityContent } from "@/data/services/seoVisibility";

const { faqs } = seoVisibilityContent;

const SeoFaq = () => {
  return (
    <section className='seoFaq' aria-labelledby='seo-faq-heading'>
      <div className='container_main'>
        <h2 id='seo-faq-heading' className='seoFaq__heading'>
          {faqs.heading}
        </h2>
        <div className='seoFaq__list'>
          {faqs.items.map(item => (
            <details className='seoFaq__item' key={item.question}>
              <summary className='seoFaq__question'>
                <span>{item.question}</span>
                <span className='seoFaq__mark' aria-hidden='true' />
              </summary>
              <p className='seoFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoFaq;
