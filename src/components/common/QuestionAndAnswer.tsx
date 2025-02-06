import { FC } from "react";
import { Text, Button } from "../feature";

interface QuestionAndAnswerProps {
  heading?: string;
  text?: string;
}

const QuestionAndAnswer: FC<QuestionAndAnswerProps> = ({ heading, text }) => {
  return (
    <section
      className='bg_secondry--light'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <div className='questionAndAnswer  text_align_center'>
        <h2
          dangerouslySetInnerHTML={{ __html: heading || "" }}
          className='heading_secondry--light color_white'
          data-aos='fade-up'
          data-aos-duration='1200'
        ></h2>
        <Text
          className='secondry color_white'
          animation='fade-up'
          duration='1400'
        >
          {text}
        </Text>
        <Button className='primary' animation='fade-up' duration='1600'>
          {"Book a consultant - it's on us!"}
        </Button>
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
