"use client";

import type { FC } from "react";
import dynamic from "next/dynamic";
import type SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import Link from "next/link";
import React from "react";
import { MdArrowForward } from "react-icons/md";
import { Heading } from "@/components/feature";
import { Container } from "@/components/common";
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false
}) as unknown as React.ForwardRefExoticComponent<
  Settings & React.RefAttributes<SlickSlider> & { children?: React.ReactNode }
>;

type ContentSliderDataProps = {
  subheading: string;
  title?: string;
  image: string;
  link?: string;
  id: number;
};

type ContentSliderProps = {
  data: ContentSliderDataProps[];
};

const RelatedBlogs: FC<ContentSliderProps> = ({ data }) => {
  const slider = React.useRef<SlickSlider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
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
    <Container className='main'>
      <div className='contentSlider'>
        <Heading className='secondry'>Related Articles</Heading>

        <section>
          <Slider ref={slider} {...settings}>
            {data.map((el, index) => (
              <div key={index} className='contentSlider_item'>
                <Image
                  src={el.image}
                  height={206}
                  width={300}
                  alt={`${el.title}`}
                />
                <h5>{el.subheading}</h5>
                <h1>{el.title}</h1>
                {el.link && (
                  <Link href={el.link} className='color_gradient'>
                    Read Blog
                    <MdArrowForward />
                  </Link>
                )}
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
      </div>
    </Container>
  );
};

export default RelatedBlogs;
