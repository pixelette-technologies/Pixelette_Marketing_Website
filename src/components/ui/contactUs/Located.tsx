import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { locatedData } from "@/data/contactUs";
import Image from "next/image";
import React from "react";

const Located = () => {
  return (
    <div
      className='bg_tertiary--dark'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <Container className='main'>
        <section className='located'>
          <Heading
            className='secondry--light color_secondry'
            animation='fade-up'
            duration='1200'
          >
            We’re stationed all around the globe
          </Heading>
          <section>
            {locatedData.map((el, index) => (
              <blockquote
                key={index}
                className='bg_white'
                data-aos='fade-up'
                data-aos-duration={`${1000 + index * 300}`}
              >
                <Image
                  src={el.img}
                  alt='City Profile'
                  width={243}
                  height={179}
                />
                <div>
                  <h2
                    className='heading_secondry--boldLight'
                    dangerouslySetInnerHTML={{ __html: el.city }}
                  />
                  <Text className='primary color_secondry'>{el.phone}</Text>
                  <Text className='primary color_secondry'>{el.email}</Text>
                  <Text className='primary color_secondry'>{el.address}</Text>
                </div>
              </blockquote>
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default Located;
