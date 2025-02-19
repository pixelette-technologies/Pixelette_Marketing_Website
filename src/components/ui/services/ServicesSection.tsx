import { Container, ServicesCards } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface ServicesSectionCards {
  heading?: string;
  data?: { title?: string; text?: string }[];
}

interface ServicesSectionProps {
  heading?: string;
  text?: string;
  data?: ServicesSectionCards[];
}

const ServicesSection: FC<ServicesSectionProps> = ({
  heading = "Default Heading",
  text = "No text provided",
  data = []
}) => {
  return (
    <div
      className='bg_gray--lighter'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <Container className='main'>
        <div className='servicesSection'>
          <header className='bg_gray--lighter'>
            <Heading
              className='large font_family_glory color_tertiary uppercase'
              animation='fade-right'
              duration='1200'
            >
              We manage You grow
            </Heading>
            <div>
              <Heading
                className='secondry font_family_glory color_secondry uppercase'
                animation='fade-left'
                duration='1600'
              >
                {heading || "No Heading Provided"}
              </Heading>
              <Text className='secondry' animation='fade-left' duration='1600'>
                {text || "No description available."}
              </Text>
            </div>
          </header>
          <section>
            {data.length > 0 ? (
              data.map((el, index) => (
                <ServicesCards
                  key={index}
                  heading={el.heading}
                  data={el.data || []}
                />
              ))
            ) : (
              <Text className='tertiary color_gray-dark'>
                No services available.
              </Text>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ServicesSection;
