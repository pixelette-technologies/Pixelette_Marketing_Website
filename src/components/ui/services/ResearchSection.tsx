"use client";

import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";
import CountUp from "react-countup";

interface CardProps {
  value?: number;
  message?: string;
  source?: string;
}

interface ResearchSectionProps {
  mainHeading?: string;
  subHeading?: string;
  detail?: string;
  data?: CardProps[];
}

const ResearchSection: FC<ResearchSectionProps> = ({
  mainHeading,
  subHeading,
  detail,
  data
}) => {
  return (
    <Container className='main'>
      <div className='researchSection'>
        <header>
          <div>
            <Heading
              className='secondry color_secondry font_family_glory uppercase'
              animation='fade-up'
              duration='1200'
            >
              {mainHeading}
              <span> {subHeading}</span>
            </Heading>
          </div>
          <Text className='secondry' animation='fade-up' duration='1600'>
            {detail}
          </Text>
        </header>

        <section data-aos='fade-up' data-aos-duration='1200'>
          {data?.map((el, index) => (
            <div
              key={index}
              id={`counter-section-${index + 1}`}
              className='counter-section'
              data-aos='fade-up'
              data-aos-duration={`${1000 + index * 200}`}
            >
              <Heading className='primary color_primary font_family_glory '>
                <CountUp start={0} end={el.value || 0} duration={7} />%
              </Heading>
              <Text className='secondry font_family_glory'>{el.message}</Text>
              <blockquote className='bg_white'>
                <Text className='secondry font_family_glory'>
                  Source: {el.source}
                </Text>
              </blockquote>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
};

export default ResearchSection;
