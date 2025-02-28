import { FC } from "react";
import Text from "./Text";
import Image from "next/image";

interface AccordionProps {
  question?: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
  animation?: string;
  duration?: string;
  ind?: string;
}

const Accordion: FC<AccordionProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  animation,
  duration,
  ind
}) => {
  return (
    <div
      className='accordion'
      data-aos={animation}
      data-aos-duration={duration}
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      <header>
        <div>
          <Text
            className={`primary--bolder  ${isOpen ? "color_primary" : "color_primary--light"}  `}
          >
            {ind}
          </Text>
          <Text className='primary--bolder'>{question}</Text>
        </div>
        <blockquote>
          {isOpen ? (
            <Image
              src='/common/crossIcon.svg'
              height={19}
              width={19}
              alt='icon'
            />
          ) : (
            <Image
              src='/common/plusIcon.svg'
              height={19}
              width={19}
              alt='icon'
            />
          )}
        </blockquote>
      </header>

      {isOpen && (
        <section>
          <Text className='secondry '>{answer}</Text>
        </section>
      )}
    </div>
  );
};

export default Accordion;
