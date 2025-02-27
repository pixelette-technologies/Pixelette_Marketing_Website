"use client";
import { useState, FC } from "react";
import { Accordion } from "../feature";
import Container from "./Container";

type FaqItem = {
  question?: string;
  answer?: string;
  list?: string[];
};

type FaqsProps = {
  data?: FaqItem[];
};

const Faqs: FC<FaqsProps> = ({ data }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <Container className='main'>
      <section className='faqs'>
        {data?.map((el, index) => (
          <Accordion
            key={index}
            ind={`0${index + 1}`}
            question={el.question}
            answer={el.answer}
            isOpen={openAccordionIndex === index}
            onToggle={() => handleAccordionToggle(index)}
            animation='fade-up'
            duration={`1${index}00`}
          />
        ))}
      </section>
    </Container>
  );
};

export default Faqs;
