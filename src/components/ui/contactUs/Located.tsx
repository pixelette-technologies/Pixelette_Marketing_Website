import { Heading, Text } from "@/components/feature";
import { locatedData } from "@/data/contactUs";
import Image from "next/image";
import React from "react";

const Located = () => {
  return (
    <div className='bg_tertiary--dark'>
      <Heading>We’re stationed all around the globe</Heading>
      <Text>
        Show locations in a different way, not really happy with how it’s
        currently done here. Maybe turn it into a slider or a drop down,
        collapsible thing so that it doesn’t take up too much space. Show the
        main two countries i.e. UK and US in the first row.
      </Text>
      <section>
        {locatedData.map((el, index) => (
          <blockquote key={index}>
            <Image src={el.img} alt='City Profile' width={243} height={179} />
            <div>
              <h2 dangerouslySetInnerHTML={{ __html: el.city }} />
              <Text>{el.phone}</Text>
              <Text>{el.email}</Text>
              <Text>{el.address}</Text>
            </div>
          </blockquote>
        ))}
      </section>
    </div>
  );
};

export default Located;
