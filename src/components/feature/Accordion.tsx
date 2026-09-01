import { FC, useId } from "react";
import Text from "./Text";
import Image from "next/image";

interface AccordionProps {
  question?: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
  ind?: string;
}

// Two defects fixed here, both approved in Phase A and neither needing new copy.
//
// 1. The answer was mounted only while open — `{isOpen && <section>…}`. That put
//    FAQ answer text out of the DOM entirely until clicked, across all 13
//    service and industry routes, which are the same pages that emit FAQPage
//    JSON-LD CONTAINING those answers. The panel is always rendered now and
//    hidden with the `hidden` attribute, so the markup and the structured data
//    finally agree.
//
// 2. The toggle was a div with an onClick and a cursor style: no button, no
//    aria-expanded, no keyboard path and no focus state. It is a real button
//    now, with aria-expanded and aria-controls, so it is reachable and operable
//    from the keyboard and picks up the global focus ring.
//
// The question text already existed, so this is markup, not copy. Text renders
// a <p>, which is not valid inside a button, so the two labels are spans
// carrying the classes Text would have emitted.

const Accordion: FC<AccordionProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  ind
}) => {
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className='accordion'>
      <button
        type='button'
        id={buttonId}
        className='accordion__toggle'
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className='accordion__label'>
          <span
            className={`text_primary--bolder ${
              isOpen ? "color_primary" : "color_primary--light"
            }`}
          >
            {ind}
          </span>
          <span className='text_primary--bolder'>{question}</span>
        </span>
        <span className='accordion__marker' aria-hidden='true'>
          <Image
            src={isOpen ? "/common/crossIcon.svg" : "/common/plusIcon.svg"}
            height={19}
            width={19}
            alt=''
          />
        </span>
      </button>

      <section id={panelId} role='region' aria-labelledby={buttonId} hidden={!isOpen}>
        <Text className='secondry '>{answer}</Text>
      </section>
    </div>
  );
};

export default Accordion;
