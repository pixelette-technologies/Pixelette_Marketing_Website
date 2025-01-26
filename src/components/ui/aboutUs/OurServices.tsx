import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { ourServicesData } from "@/data/aboutus";
import React from "react";

const OurServices = () => {
  return (
    <div
      className='bg_tertiary--dark'
      data-aos='fade-up'
      data-aos-duration='1200'
    >
      <Container className='main'>
        <div className='ourServices'>
          <header>
            <Text
              className='primary color_primary'
              animation='fade-up'
              duration='1200'
            >
              Industries we service
            </Text>
            <Heading
              className='secondry--light color_secondry'
              animation='fade-up'
              duration='1400'
            >
              We succeed where it matters most today
            </Heading>
            <Text
              className='secondry color_secondry'
              animation='fade-up'
              duration='1600'
            >
              Navigating the complexities of fast-evolving industries requires a
              deep understanding and agility. We specialize in marketing for
              web3, SaaS, fintech, technology, startups and AI products.
              Partnering with us means getting marketing strategies fit to your
              industry and business that actually work.
            </Text>
          </header>
          <section>
            {ourServicesData.map((el, index) => (
              <ArrowCard
                key={index}
                mainHeading={el.mainHeading}
                subHeading={el.subHeading}
                summary={el.text}
                theme={false}
                textfloat={false}
                animation='fade-up'
                duration={`${1000 + index * 200}`}
              />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
