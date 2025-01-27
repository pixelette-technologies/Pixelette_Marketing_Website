"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const { top } = section.getBoundingClientRect();
        const totalItems = data.length - 1;
        const children = section.children;
        Array.from(children).forEach((child, index) => {
          const speedFactor = 0.8 + totalItems * 0.8;
          const offset = (index / totalItems) * speedFactor - top * speedFactor;
          (child as HTMLElement).style.transform = `translateY(${offset}px)`;
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <div className='bg_secondry' data-aos='fade-up' data-aos-duration='1000'>
      <Container className='main'>
        <div className='contentDisplaySection'>
          <header>
            <div>
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
            </div>
          </header>
          <section ref={sectionRef}>
            {data?.map((el, index) => (
              <div key={index}>
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
