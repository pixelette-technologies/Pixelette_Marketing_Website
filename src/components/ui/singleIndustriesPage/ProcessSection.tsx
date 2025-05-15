"use client";

import React, { useState } from "react";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

interface ProcessSectionDataProps {
  heading: string;
  description: string;
}

interface ProcessSectionProps {
  heading: string;
  description: string;
  data: ProcessSectionDataProps[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  heading,
  description,
  data
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to first index

  return (
    <Container className='main'>
      <div className='processSection'>
        <header>
          <Heading className='primary--light font_family_glory'>
            {heading}
          </Heading>
          <Text className='primary'>{description}</Text>
        </header>
        <section>
          <div>
            <header>
              {data.map((item, index) => (
                <div
                  key={index}
                  id={activeIndex === index ? "active_Tab_Process" : ""}
                >
                  <div className='bg_primary'></div>
                  <h4 onClick={() => setActiveIndex(index)}>{item.heading}</h4>
                </div>
              ))}
            </header>
            <section>
              <Text className='secondry'>{data[activeIndex].description}</Text>
            </section>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ProcessSection;
