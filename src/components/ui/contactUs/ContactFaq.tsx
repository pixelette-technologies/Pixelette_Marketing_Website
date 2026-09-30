import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { contactFaqs } from "@/data/contactUs";

// Native <details>, as on the specialist pages: it opens by keyboard and with
// JavaScript off, and the answers are in the markup the FAQPage schema in
// page.tsx describes.
const ContactFaq = () => {
  return (
    <section className='contactFaq' aria-labelledby='faq-heading'>
      <Container className='main'>
        <Text className='eyebrow'>{contactFaqs.eyebrow}</Text>
        <Heading className='h2' level={2}>
          <span id='faq-heading'>{contactFaqs.heading}</span>
        </Heading>
        <div className='contactFaq__list'>
          {contactFaqs.items.map(item => (
            <details className='contactFaq__item' key={item.question}>
              <summary className='contactFaq__question'>
                <span>{item.question}</span>
                <span className='contactFaq__mark' aria-hidden='true' />
              </summary>
              <p className='contactFaq__answer'>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactFaq;
