import { FC, ComponentType } from "react";
import { Text } from "../feature";
import Container from "./Container";
import ContactUsForm from "./ContactUsForm";

interface ContactData {
  icon: ComponentType;
  heading?: string;
  text: string;
}

interface ContactSectionProps {
  heading?: string;
  text?: string;
  data?: ContactData[];
  headingLevel?: 1 | 2;
}

const ContactSection: FC<ContactSectionProps> = ({
  heading,
  text,
  data,
  headingLevel = 2
}) => {
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";
  return (
    <div className='bg_tertiary' data-aos='fade-up' data-aos-duration='1000'>
      <Container className='main'>
        <section className='contactUsSection'>
          <section>
            {heading && (
              <HeadingTag
                className='heading_primary font_family_glory uppercase'
                dangerouslySetInnerHTML={{ __html: heading }}
                data-aos='fade-right'
                data-aos-duration='1200'
              ></HeadingTag>
            )}
            {text && <Text className='secondry'>{text}</Text>}
            <div data-aos='fade-up'>
              {data?.map((el, index) => (
                <blockquote className='bg_white' key={index}>
                  <section>
                    <el.icon />
                  </section>
                  <div>
                    {el.heading && (
                      <Text className='primary--bolder'>{el.heading}</Text>
                    )}
                    <Text className='tertiary'>{el.text}</Text>
                  </div>
                </blockquote>
              ))}
            </div>
          </section>
          <div>
            <ContactUsForm />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ContactSection;
