import { FC } from "react";
import { Text, Button } from "../feature";

interface QuestionAndAnswerProps {
  heading: string;
  text: string;
}

const QuestionAndAnswer: FC<QuestionAndAnswerProps> = ({ heading, text }) => {
  return (
    <section className='bg_secondry--light'>
      <div className='questionAndAnswer  text_align_center'>
        <h2
          dangerouslySetInnerHTML={{ __html: heading }}
          className='heading_secondry--light color_white'
        ></h2>
        <Text className='secondry color_white'>{text}</Text>
        <Button className='primary'>{"Book A Consultant - It's On Us!"}</Button>
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
