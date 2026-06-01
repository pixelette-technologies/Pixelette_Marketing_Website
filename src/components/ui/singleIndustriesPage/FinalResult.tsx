"use client";

import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import type SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import NewWhiteBackground from "@/assets/common/NewWhiteBackground";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false
}) as unknown as React.ForwardRefExoticComponent<
  Settings & React.RefAttributes<SlickSlider> & { children?: React.ReactNode }
>;

interface FinalResultDataProps {
  title: string;
  description: string;
  values: string;
  summary: string;
}

interface FinalResultProps {
  mainheading: string;
  maindescription: string;
  icons: string[];
  heading: string;
  description: string;
  data: FinalResultDataProps[];
}

const FinalResult: React.FC<FinalResultProps> = ({
  mainheading,
  maindescription,
  icons,
  heading,
  description,
  data
}) => {
  const slider = React.useRef<SlickSlider | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchMove: true,
    afterChange: (current: number) => setCurrentIndex(current),
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    if (!slider.current) {
      return;
    }

    if (direction === "prev") {
      slider.current.slickPrev();
    } else {
      slider.current.slickNext();
    }
  };

  return (
    <div className='finalresult'>
      <Container className='main'>
        <section>
          <header>
            <div>
              <Heading className='primary--light font_family_glory'>
                {mainheading}
              </Heading>
              <Text className='primary'>{maindescription}</Text>
            </div>
            <section>
              {icons.map((el, index) => (
                <Image
                  key={index}
                  src={el}
                  alt='Logo for tech stack'
                  height={88}
                  width={88}
                />
              ))}
            </section>
          </header>

          <section>
            <div>
              <NewWhiteBackground />
            </div>

            <section>
              <div>
                <Heading className='primary--light font_family_glory'>
                  {heading}
                </Heading>
                <Text className='primary'>{description}</Text>
                <section>
                  <header>
                    <h3 className='font_family_glory'>
                      {data[currentIndex]?.values ?? "N/A"}
                    </h3>
                    <p>
                      {data[currentIndex]?.summary ?? "No summary available"}
                    </p>
                  </header>

                  <section>
                    <section>
                      <Slider ref={slider} {...settings}>
                        {data.map((el, index) => (
                          <div key={index} className='finalresult_slider_card'>
                            <h4>{el.title}</h4>
                            <p>{el.description}</p>
                          </div>
                        ))}
                      </Slider>
                    </section>
                    <header>
                      <div>
                        <button
                          onClick={() => handleArrowClick("prev")}
                          aria-label='Previous slide'
                          title='Previous'
                        >
                          <svg
                            width='70'
                            height='18'
                            viewBox='0 0 77 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M76.5 10.2857V7.71429H5.38096L10.7619 2.57143L9.41667 0L0 9L9.41667 18L10.7619 15.4286L5.38096 10.2857H76.5Z'
                              fill='#B3063C'
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleArrowClick("next")}
                          aria-label='Next slide'
                          title='Next'
                        >
                          <svg
                            width='70'
                            height='18'
                            viewBox='0 0 77 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M0.5 10.2857V7.71429H71.619L66.2381 2.57143L67.5833 0L77 9L67.5833 18L66.2381 15.4286L71.619 10.2857H0.5Z'
                              fill='#B3063C'
                            />
                          </svg>
                        </button>
                      </div>
                    </header>
                  </section>
                </section>
              </div>
            </section>
          </section>
        </section>
      </Container>
    </div>
  );
};

export default FinalResult;
