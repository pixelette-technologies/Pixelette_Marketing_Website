"use client";

import { FC, useState, useEffect, useRef, useCallback } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const speed = 0.1; // Reduced speed for smoother movement

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isHovered) {
      setPosition(prev => {
        const newPosition = prev + (speed * (deltaTime / 16)); // Normalize by 60fps
        // Reset position when it reaches 50% (half of the content)
        return newPosition >= 50 ? 0 : newPosition;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const renderCard = (el: CardProps, index: number, key: string) => (
    <div 
      key={key}
      className="marquee-card"
    >
      <div className="card-content">
        <Text className='primary--bold'>{el.heading}</Text>
        <Text className='tertiary'>{el.detail}</Text>
      </div>
    </div>
  );

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
          <section 
            className="marquee-section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={marqueeRef}
              className="marquee-content"
              style={{
                transform: `translateY(-${position}%)`,
                transition: isHovered ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}
            >
              {/* First set of items */}
              {data.map((el, index) => renderCard(el, index, `first-${index}`))}
              {/* Duplicate set for seamless loop */}
              {data.map((el, index) => renderCard(el, index, `second-${index}`))}
              {/* Third set to ensure seamless loop */}
              {data.map((el, index) => renderCard(el, index, `third-${index}`))}
            </div>
          </section>
          {/* Mobile view */}
          <div className="mobile-view">
            {data.map((el, index) => renderCard(el, index, `mobile-${index}`))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContentDisplaySection;
