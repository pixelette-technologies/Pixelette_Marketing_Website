import { Container, Faqs } from "@/components/common";
import { Heading } from "@/components/feature";
import { faqCopy, faqs } from "@/data/strategy";

// Four questions, through the SHARED Faqs / Accordion pair the service and
// sector pages already use. No new FAQ treatment on this page, which is the
// brief's instruction to reuse rather than duplicate — and Accordion is
// already converted, so this brings no legacy classes with it: real button,
// aria-expanded, panel always in the DOM, card tokens, hover on the border
// only.
//
// Faqs renders its own Container, so this component supplies only the header
// and lets the shared one lay the accordions out beneath. That is why the
// header has a Container of its own rather than the two being nested.
//
// FOUR, AND NOT ONE MORE. The brief says not to pad it, and an FAQ is the
// easiest place on any page to start answering questions nobody asked.

const StrategyFaq = () => {
  return (
    <section className='strategyFaq'>
      <Container className='main'>
        <header className='strategyFaq__header'>
          <Heading className='eyebrow' level={2}>
            {faqCopy.eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {faqCopy.heading}
          </Heading>
        </header>
      </Container>

      <Faqs data={faqs} />
    </section>
  );
};

export default StrategyFaq;
