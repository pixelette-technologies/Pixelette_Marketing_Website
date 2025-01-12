import { FC } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import Component from "..";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  animation?: string;
  duration?: string;
}

const Accordion: FC<AccordionProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  animation,
  duration,
}) => {
  return (
    <div
      className="accordion"
      style={{ backgroundColor: isOpen ? "#00233a" : "rgba(1, 47, 77, 1)" }}
      data-aos={animation}
      data-aos-duration={duration}
    >
      <header onClick={onToggle} style={{ cursor: "pointer" }}>
        <Component.Feature.Text className="medium">
          <BsQuestionCircle />
          {question}
        </Component.Feature.Text>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </header>
      {isOpen && (
        <section>
          <Component.Feature.Text className="small color_gray">
            {answer}
          </Component.Feature.Text>
        </section>
      )}
    </div>
  );
};

export default Accordion;
