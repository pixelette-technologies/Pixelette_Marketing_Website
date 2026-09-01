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
      className='questionAndAnswerBand'
    >
      <div className='questionAndAnswer  text_align_center'>
        {subheading ? (
          <header>
            <Text className='text_primary'>Become a partner</Text>
          </header>
        ) : (
          ""
        )}

        <h2
          dangerouslySetInnerHTML={{ __html: heading || "" }}
          className='heading_secondry--light'
        ></h2>
        <Text
          className='text_secondry'
        >
          {text}
        </Text>
        <Link href='/contactus'>
          <Button className='primary'>
            {"Book a consultant - it's on us!"}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
