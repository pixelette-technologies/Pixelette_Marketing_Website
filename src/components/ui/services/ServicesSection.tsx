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
    <div className='bg_gray--lighter'>
      <Container className='main'>
        <div className='servicesSection'>
          <header>
            <Heading className='large font_family_glory color_tertiary uppercase'>
              We manage You grow
            </Heading>
            <div>
              <Heading className='secondry font_family_glory color_secondry uppercase'>
                {heading || "No Heading Provided"}
              </Heading>
              <Text className='secondry'>
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
