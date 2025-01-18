import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { ourServicesData } from "@/data/aboutus";
import React from "react";

const OurServices = () => {
  return (
    <div className='bg_tertiary--dark'>
      <Container className='main'>
        <div className='ourServices'>
          <header>
            <Text>Industries we service</Text>
            <Heading>We succeed where it matters most today</Heading>
            <Text>
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
              />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
