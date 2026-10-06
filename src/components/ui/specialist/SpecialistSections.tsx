import type { SpecialistFaqItem, SpecialistItem } from "@/data/services/specialist";

// The four short, static sections of a specialist page, kept together because
// each is a list and a class name and nothing else: 06 How we work, 07 What
// good looks like, 08 the close and 09 the questions. The section heads and
// containers are SpecialistServicePage's; these render the bodies.

/** 06 How we work. Four compact stages in a row, numbered, no timeline. */
export const HowWeWork = ({ steps }: { steps: SpecialistItem[] }) => (
  <ol className='spSteps'>
    {steps.map((step, index) => (
      <li className='spSteps__step' key={step.title}>
        <span className='spSteps__index' aria-hidden='true'>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className='spSteps__title'>{step.title}</h3>
        <p className='spSteps__body'>{step.body}</p>
      </li>
    ))}
  </ol>
);

/** 07 What good looks like. The standard the work is built to, NOT a results
 *  section: the brief bars "Results", "Case studies" and "Proof" until real,
 *  service-specific evidence exists. The check is drawn, and hidden from
 *  assistive tech; the statement is the content. */
export const WhatGoodLooksLike = ({ points }: { points: string[] }) => (
  <ul className='spGood'>
    {points.map(point => (
      <li className='spGood__point' key={point}>
        <span className='spGood__check' aria-hidden='true' />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

/** 09 Useful questions. Native <details>, so it opens by keyboard and with
 *  JavaScript off, and the answers are in the markup the FAQPage schema
 *  describes. */
export const SpecialistFaq = ({ items }: { items: SpecialistFaqItem[] }) => (
  <div className='spFaq'>
    {items.map(item => (
      <details className='spFaq__item' key={item.question}>
        <summary className='spFaq__question'>
          <span>{item.question}</span>
          <span className='spFaq__mark' aria-hidden='true' />
        </summary>
        <p className='spFaq__answer'>{item.answer}</p>
      </details>
    ))}
  </div>
);
