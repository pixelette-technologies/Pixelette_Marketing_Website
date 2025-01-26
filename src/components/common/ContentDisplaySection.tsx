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
    <div className='bg_secondry' data-aos='fade-up' data-aos-duration='1000'>
      <Container className='main'>
        <div className='contentDisplaySection'>
          <header>
            <Text
              className='primary color_white'
              animation='fade-up'
              duration='1400'
            >
              {title}
            </Text>
            <h2
              dangerouslySetInnerHTML={{ __html: heading || "" }}
              className='heading_secondry--light color_white'
              data-aos='fade-up'
              data-aos-duration='1200'
            ></h2>
            <Text
              className='secondry color_gray'
              animation='fade-up'
              duration='1600'
            >
              {detail}
            </Text>
          </header>
          <section>
            {data?.map((el, index) => (
              <div
                key={index}
                data-aos='fade-up'
                data-aos-duration={`${1000 + index * 200}`}
              >
                <Text className='primary--bold'>{el.heading}</Text>
                <Text className='tertiary'>{el.detail}</Text>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ContentDisplaySection;
