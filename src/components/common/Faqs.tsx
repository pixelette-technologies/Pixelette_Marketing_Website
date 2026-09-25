"use client";
import { useState, FC } from "react";
import { Accordion, Heading, Text } from "../feature";
import Container from "./Container";

type FaqItem = {
  question?: string;
  answer?: string;
  list?: string[];
};

type FaqsProps = {
  data?: FaqItem[];
  /** Optional section header. The service pages have none and keep none;
   *  the deeper-experience pages open theirs on an eyebrow and an h2 so the
   *  questions are not an unlabelled list at the foot of the page. */
  eyebrow?: string;
  heading?: string;
};

const Faqs: FC<FaqsProps> = ({ data, eyebrow, heading }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <Container className='main'>
      {heading && (
        <header className='faqs__head whoBand__head'>
          {eyebrow && <Text className='eyebrow'>{eyebrow}</Text>}
          <Heading className='h2' level={2}>
            {heading}
          </Heading>
        </header>
      )}
      <section className='faqs' data-reveal='stagger'>
        {data?.map((el, index) => (
          <Accordion
            key={index}
            ind={`0${index + 1}`}
            question={el.question}
            answer={el.answer}
            isOpen={openAccordionIndex === index}
            onToggle={() => handleAccordionToggle(index)}
          />
        ))}
      </section>
    </Container>
  );
};

export default Faqs;
