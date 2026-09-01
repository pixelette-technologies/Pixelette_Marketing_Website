"use client";

import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC, useId } from "react";
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
  // These ids were counter-section-N, identical to the ones Status emits on the
  // same page, so two elements shared an id in one document. This component
  // never observes them — it runs CountUp immediately — but the duplicates were
  // real and Status's document-wide query was picking these nodes up.
  const uid = useId();

  return (
    <Container className='main'>
      <div className='researchSection'>
        <header>
          <div>
            <Heading
              className='secondry font_family_glory uppercase'
            >
              {mainHeading}
              <span> {subHeading}</span>
            </Heading>
          </div>
          <Text className='secondry'>
            {detail}
          </Text>
        </header>

        <section>
          {data?.map((el, index) => (
            <div
              key={index}
              id={`${uid}-counter-${index + 1}`}
              className='counter-section card-feature'
            >
              <Heading className='primary font_family_glory'>
                <CountUp start={0} end={el.value || 0} />%
              </Heading>
              <Text className='secondry font_family_glory'>{el.message}</Text>
              <blockquote>
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
