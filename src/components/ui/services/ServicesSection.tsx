import { Container, ServicesCards } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface ServicesSectionCards {
  heading: string;
  data: [];
}

interface ServicesSectionProps {
  heading: string;
  text: string;
  data: ServicesSectionCards[];
}

const ServicesSection: FC<ServicesSectionProps> = ({ heading, text, data }) => {
  return (
    <div className='bg_gray--lighter'>
      <Container className='main'>
        <div className='servicesSection'>
          <header>
            <Heading className='large font_family_glory color_tertiary uppercase'>
              We manage You grow
            </Heading>
            <div>
              <Heading className='secondry font_family_glory color_secondry uppercase'>
                {heading}
              </Heading>
              <Text className='secondry'>{text}</Text>
            </div>
          </header>
          <section>
            {data.map((el, index) => (
              <ServicesCards key={index} heading={el.heading} data={el.data} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ServicesSection;
