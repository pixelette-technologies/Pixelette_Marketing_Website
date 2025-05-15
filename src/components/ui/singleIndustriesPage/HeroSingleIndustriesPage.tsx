import Image from "next/image";
import { FC } from "react";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { Container } from "@/components/common";

interface HeroSingleIndustriesPageDataProps {
  title: string;
  description: string;
}

interface HeroSingleIndustriesPageProps {
  heading: string;
  description: string;
  data: HeroSingleIndustriesPageDataProps[];
}

const HeroSingleIndustriesPage: FC<HeroSingleIndustriesPageProps> = ({
  heading,
  description,
  data
}) => {
  return (
    <div className='heroSingleIndustriesPage'>
      <Image
        width={561}
        height={341}
        src='/industries/noiseBackground.png'
        alt={`${heading}`}
      />
      <Container className='main'>
        <section>
          <section>
            <div>
              <Image
                src='/industries/heroSinglelogoForHeader.svg'
                alt='Logo for single industries page logo'
                height={70}
                width={201}
              />

              <section>
                <Heading className='primary font_family_glory color_primary'>
                  {heading}
                </Heading>
                <Text className='primary'>{description}</Text>
              </section>
            </div>

            <Image
              width={500}
              height={311}
              src='/industries/singleIndustriesPageHeroImage.png'
              alt={`${heading}`}
            />
          </section>
          <blockquote>
            {data.map((el, index) => (
              <ArrowCard
                key={index}
                subHeading={el.title}
                summary={el.description}
                theme={false}
                textfloat={false}
                className='hover_black_arrowCard'
                animation='fade-up'
              />
            ))}
          </blockquote>
        </section>
      </Container>
    </div>
  );
};

export default HeroSingleIndustriesPage;
