"use client";

import { useState } from "react";
import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const offsetX = ((clientX - rect.left) / rect.width - 0.5) * 20;
    const offsetY = ((clientY - rect.top) / rect.height - 0.5) * 20;
    setOffset({ x: offsetX, y: offsetY });
  };

  return (
    <Container className='main'>
      <div className='heroHome' onMouseMove={handleMouseMove}>
        <div>
          <section data-aos='fade-up'>
            {/* Men Picture */}
            <Image
              src='/home/hh_image_1.webp'
              alt='Hero Section Banner'
              width={402}
              priority
              height={408}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.1s ease-out"
              }}
            />
            {/* Building Image */}
            <Image
              src='/home/hh_image_2.webp'
              alt='Hero Section Banner'
              width={342}
              priority
              height={362}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.5s ease-out"
              }}
            />
            {/* Back ground round */}
            <Image
              src='/home/hh_image_3.webp'
              alt='Hero Section Banner'
              width={353}
              priority
              height={354}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.4s ease-out"
              }}
            />
            {/* Laptop */}
            <Image
              src='/home/hh_image_4.webp'
              alt='Hero Section Banner'
              width={199}
              priority
              height={218}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.5s ease-out"
              }}
            />
            {/* Clock tower */}
            <Image
              src='/home/hh_image_6.webp'
              alt='Hero Section Banner'
              width={162}
              priority
              height={628}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: "transform 0.5s ease-out"
              }}
            />
          </section>
        </div>

        <Image
          src='/home/heroImageForMobile.png'
          alt='Background image for mobile responsive '
          height={480}
          width={520}
          priority
        />

        <section className='bg_tertiary' data-aos='fade-up'>
          <div>
            <Heading
              className='hero color_primary font_family_glory uppercase'
              animation='fade-up'
              duration='1200'
              level={1}
            >
              Marketing That Matters
            </Heading>
            <Heading
              className='hero color_secondry font_family_glory uppercase'
              animation='fade-up'
              duration='1400'
              level={2}
            >
              to Your Bottom Line
            </Heading>
            <Text className='primary' animation='fade-up' duration='1600'>
              Pixelette Marketing is a retained growth partner for high-growth
              SaaS, technology, e-commerce, fintech and Web3 brands. We believe
              your industry deserves strategies as innovative as your solutions.
              Take the guesswork out of growth by requesting your strategy
              proposal today and{" "}
              <span className=' text_primary--bold color_primary'>
                start achieving ROI you can see!
              </span>
            </Text>
            <Link href='/contactus'>
              <Button className='primary' animation='fade-up' duration='1800'>
                Book A Call
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}
