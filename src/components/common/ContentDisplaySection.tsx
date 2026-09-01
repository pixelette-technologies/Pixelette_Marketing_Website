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

// The vertical marquee is gone: a 60fps requestAnimationFrame loop driving a
// setPosition on every tick, a hover-pause state, and four render passes of the
// same card list — three stacked for the "seamless loop" plus a fourth copy for
// mobile. The cards now render ONCE, on a grid, at every width.
//
// No content is lost. The extra passes were the same data.map output repeated
// so the loop had something to scroll into.

const ContentDisplaySection: FC<ContentDisplaySectionProps> = ({
  title,
  heading,
  detail,
  data
}) => {
  return (
    <div className='contentDisplayBand'>
      <Container className='main'>
        <div className='contentDisplaySection'>
          <header>
            <div>
              <Text className='primary'>{title}</Text>
              <h2
                dangerouslySetInnerHTML={{ __html: heading || "" }}
                className='heading_secondry--light'
              ></h2>
              <Text className='secondry'>{detail}</Text>
            </div>
          </header>
          <section className='contentDisplayCards'>
            {data.map((el, index) => (
              <div key={index} className='contentCard'>
                <div className='card-content'>
                  <Text className='primary--bold'>{el.heading}</Text>
                  <Text className='tertiary'>{el.detail}</Text>
                </div>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ContentDisplaySection;
