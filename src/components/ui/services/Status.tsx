"use client";

import { Container } from "@/components/common";
import { Text, Heading } from "@/components/feature";
import { FC, useState, useEffect, useId, useRef } from "react";
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
  // The observer used to run document.querySelectorAll(".counter-section"),
  // which also picked up ResearchSection's nodes on every /services/[slug]
  // page, and both components emitted the same counter-section-N ids, so two
  // elements shared an id in one document. The query is scoped to this
  // component's own subtree now and the ids carry a unique prefix.
  //
  // The .counter-section CLASS is deliberately unchanged: it is the only
  // class-name-to-JS coupling in the codebase.
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const sectionId = (index: number) => `${uid}-counter-${index + 1}`;
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

    const scope = rootRef.current;
    if (!scope) return;
    const targets = scope.querySelectorAll(".counter-section");
    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, [data]);

  return (
    <div className='bg_primary' ref={rootRef}>
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
                id={sectionId(index)}
                className='counter-section'
              >
                <Text className='primary color_white'>
                  <span>
                    {visibleSections[sectionId(index)] ? (
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
