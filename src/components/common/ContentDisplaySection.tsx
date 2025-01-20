import { FC } from "react";
import { Text } from "../feature";
import Container from "./Container";

interface CardProps {
  heading?: string;
  detail?: string;
}

interface ContentDisplaySectionProps {
  title?: string;
  heading?: string;
  detail?: string;
  data: CardProps[];
}

const ContentDisplaySection: FC<ContentDisplaySectionProps> = ({
  title,
  heading,
  detail,
  data
}) => {
  return (
    <div className='bg_secondry'>
      <Container className='main'>
        <div className='contentDisplaySection'>
          <header>
            <Text>{title}</Text>
            <h2
              dangerouslySetInnerHTML={{ __html: heading || "" }}
              className='heading_secondry--light color_white'
            ></h2>
            <Text>{detail}</Text>
          </header>
          <section>
            {data?.map((el, index) => (
              <div key={index}>
                <Text>{el.heading}</Text>
                <Text>{el.detail}</Text>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ContentDisplaySection;
