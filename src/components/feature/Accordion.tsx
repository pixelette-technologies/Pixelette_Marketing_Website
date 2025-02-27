import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Text from "./Text";

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
      // style={{ backgroundColor: isOpen ? "#00233a" : "rgba(1, 47, 77, 1)" }}
      data-aos={animation}
      data-aos-duration={duration}
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
        <blockquote
          onClick={onToggle}
          className={isOpen ? "bg_primary" : "bg_tertiary"}
          style={{ cursor: "pointer" }}
        >
          {isOpen ? (
            <FaMinus style={{ color: "white" }} />
          ) : (
            <FaPlus style={{ color: "black" }} />
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
