"use client";

import React, { useId, useState } from "react";
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

// D5. The tab list was a set of <h4> elements carrying onClick: no button, no
// keyboard path, no focus state and no way to tell which one was selected
// other than an id. That is the same defect the FAQ accordion had before
// b32f4c3, and it is fixed the same way — a real button inside the heading, so
// the document outline does not change and the control becomes reachable.
//
// The active state moves from an id to aria-selected. An id is a poor way to
// express state, and #active_Tab_Process could only ever match one element on
// a page, which is why the styling for it sat outside the component's own
// block.

const ProcessSection: React.FC<ProcessSectionProps> = ({
  heading,
  description,
  data
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const uid = useId();
  const panelId = `${uid}-process-panel`;

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
            <header role='tablist'>
              {data.map((item, index) => (
                <div key={index}>
                  <div></div>
                  <h4>
                    <button
                      type='button'
                      role='tab'
                      aria-selected={activeIndex === index}
                      aria-controls={panelId}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.heading}
                    </button>
                  </h4>
                </div>
              ))}
            </header>
            <section id={panelId} role='tabpanel'>
              <Text className='secondry'>{data[activeIndex].description}</Text>
            </section>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ProcessSection;
