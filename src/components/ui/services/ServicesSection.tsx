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
    <div className='band-alt'>
      <Container className='main'>
        <div className='servicesSection'>
          {/* The sticky header needs its own ground so the cards do not scroll
              through it. Same band as the section, stated once. */}
          <header className='band-alt'>
            <Heading
              className='heading_large font_family_glory uppercase'
            >
              We manage You grow
            </Heading>
            <div>
              <Heading
                className='heading_secondry font_family_glory uppercase'
              >
                {heading || "No Heading Provided"}
              </Heading>
              <Text className='text_secondry'>
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
              <Text className='text_tertiary'>
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
