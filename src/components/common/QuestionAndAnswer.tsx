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
        {/* 25 Sep 2026: was "Book a consultation – it's on us!", on all eight
            service pages. It promised a free consultation nobody has confirmed
            and it was the legacy agency CTA the rest of the site has dropped.
            The label is the form's own heading, so the button and the page it
            opens say the same thing. */}
        <Link href='/contactus'>
          <Button className='primary'>Tell us what needs to grow</Button>
        </Link>
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
