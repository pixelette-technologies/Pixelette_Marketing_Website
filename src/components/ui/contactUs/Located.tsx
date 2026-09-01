import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { locatedData } from "@/data/contactUs";
import Image from "next/image";
import React from "react";

const Located = () => {
  return (
    <div
      className='band-alt'
    >
      <Container className='main'>
        <section className='located'>
          <Heading
            className='heading_secondry--light'
          >
            We’re stationed all around the globe
          </Heading>
          <Text
            className='text_secondry'
          >
            Show locations in a different way, not really happy with how it’s
            currently done here. Maybe turn it into a slider or a drop down,
            collapsible thing so that it doesn’t take up too much space. Show
            the main two countries i.e. UK and US in the first row.
          </Text>
          <section>
            {locatedData.map((el, index) => (
              <blockquote
                key={index}
                
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
                  <Text className='text_primary'>{el.phone}</Text>
                  <Text className='text_primary'>{el.email}</Text>
                  <Text className='text_primary'>{el.address}</Text>
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
