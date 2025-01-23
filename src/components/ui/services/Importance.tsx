import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";
import { FC } from "react";

interface CardProps {
  role?: string;
  name?: string;
  summary?: string;
  image: string;
}

interface ImportanceProps {
  mainheading?: string;
  subHeading?: string;
  data?: CardProps[];
}

const Importance: FC<ImportanceProps> = ({ mainheading, subHeading, data }) => {
  return (
    <div className='bg_secondry'>
      <Container className='main'>
        <div className='importance'>
          <center>
            <Heading className='tertiary--medium color_primary'>
              {mainheading}
            </Heading>
            <Heading className='tertiary--light color_white'>
              {subHeading}
            </Heading>
          </center>
          <section>
            {data?.map((el, index) => (
              <div key={index}>
                <div className='bg_primary'>
                  <section>
                    <Text className='tertiary color_white'>{el.summary}</Text>
                    <blockquote>
                      <Text className='small color_white'>{el.role}</Text>
                      <Heading className='ImportanceCardheading uppercase color_white'>
                        {el.name}
                      </Heading>
                    </blockquote>
                  </section>
                  <Image
                    src={el.image}
                    alt='Profile'
                    height={450}
                    width={360}
                  />
                </div>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Importance;
