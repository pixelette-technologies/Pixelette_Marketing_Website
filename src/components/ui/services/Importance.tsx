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
  // Governance quarantine (P1): the "billion dollar brands" cards used
  // unlicensed public-figure photos and unsourced attributed quotes. With the
  // card data emptied, render nothing rather than an empty band. Replace with
  // verified third-party statistics or owned imagery in the approved redesign.
  if (!data || data.length === 0) return null;
  return (
    <div className='importanceBand'>
      <Container className='main'>
        <div className='importance'>
          <center>
            <Heading className='heading_tertiary--medium'>
              {mainheading}
            </Heading>
            <Heading className='heading_tertiary--light'>
              {subHeading}
            </Heading>
          </center>
          <section>
            {data?.map((el, index) => (
              <div
                key={index}
              >
                <div>
                  <section>
                    <Text className='text_tertiary'>{el.summary}</Text>
                    <blockquote>
                      <Text className='small'>{el.role}</Text>
                      <div>
                        <Heading className='heading_ImportanceCardheading'>
                          {el.name}
                        </Heading>
                        <Heading className='heading_ImportanceCardheading'>
                          {el.name}
                        </Heading>
                      </div>
                    </blockquote>
                  </section>
                  <Image
                    src={el.image}
                    alt='Profile'
                    height={310}
                    width={287}
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
