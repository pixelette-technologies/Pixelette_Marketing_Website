"use client";

import { Container } from "@/components/common";
import { Text, Heading } from "@/components/feature";
import { FC, useState, useEffect } from "react";
import CountUp from "react-countup";

interface CardProps {
  value?: number;
  detail?: string;
}
interface StatusProps {
  heading?: string;
  text?: string;
  data?: CardProps[];
}

const Status: FC<StatusProps> = ({ heading, text, data }) => {
  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        setVisibleSections(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const targets = document.querySelectorAll(".counter-section");
    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, []);

  return (
    <div className='bg_primary'>
      <Container className='main'>
        <div className='status'>
          <header>
            <Heading
              className='secondry--light color_white'
            >
              {heading}
            </Heading>
            <Text
              className='secondry color_white'
            >
              {text}
            </Text>
          </header>
          <section>
            {data?.map((el, index) => (
              <div
                key={index}
                id={`counter-section-${index + 1}`}
                className='counter-section'
              >
                <Text className='primary color_white'>
                  <span>
                    {visibleSections[`counter-section-${index + 1}`] ? (
                      <CountUp start={0} end={el.value || 0} />
                    ) : (
                      "0"
                    )}
                    %{" "}
                  </span>
                  {el.detail}
                </Text>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Status;
