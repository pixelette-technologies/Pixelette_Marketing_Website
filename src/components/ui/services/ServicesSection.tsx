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
          {/* No longer sticky, so it no longer needs a ground of its own to
              stop the cards scrolling through it — it sits on the section's
              own .band-alt. See the partial for why sticky had to go. */}
          <header>
            <Heading
              className='heading_large font_family_glory'
            >
              We manage You grow
            </Heading>
            <div>
              <Heading
                className='heading_secondry font_family_glory'
              >
                {heading || "No Heading Provided"}
              </Heading>
              <Text className='text_secondry'>
                {text || "No description available."}
              </Text>
            </div>
          </header>
          <section data-reveal='stagger'>
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
