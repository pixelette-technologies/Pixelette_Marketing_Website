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
    <div className='bg_secondry' data-aos='fade-up' data-aos-duration='1200'>
      <Container className='main'>
        <div className='importance'>
          <center>
            <Heading
              className='tertiary--medium color_primary'
              animation='fade-up'
              duration='1200'
            >
              {mainheading}
            </Heading>
            <Heading
              className='tertiary--light color_white'
              animation='fade-up'
              duration='1400'
            >
              {subHeading}
            </Heading>
          </center>
          <section>
            {data?.map((el, index) => (
              <div
                key={index}
                data-aos='fade-up'
                data-aos-duration={`${1000 + index * 200}`}
              >
                <div>
                  <section>
                    <Text className='tertiary color_white'>{el.summary}</Text>
                    <blockquote>
                      <Text className='small color_white'>{el.role}</Text>
                      <div>
                        <Heading className='ImportanceCardheading uppercase '>
                          {el.name}
                        </Heading>
                        <Heading className='ImportanceCardheading uppercase '>
                          {el.name}
                        </Heading>
                      </div>
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
