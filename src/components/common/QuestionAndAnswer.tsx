import { FC } from "react";
import { Text, Button } from "../feature";
import Link from "next/link";

interface QuestionAndAnswerProps {
  heading?: string;
  text?: string;
  subheading?: boolean;
}

const QuestionAndAnswer: FC<QuestionAndAnswerProps> = ({
  heading,
  text,
  subheading
}) => {
  return (
    <section
      className='bg_secondry--light'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <div className='questionAndAnswer  text_align_center'>
        {subheading ? (
          <header>
            <Text className='primary color_primary'>Become a partner</Text>
          </header>
        ) : (
          ""
        )}

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
        <Link href='/contactus'>
          <Button className='primary' animation='fade-up' duration='1600'>
            {"Book a consultant - it's on us!"}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
