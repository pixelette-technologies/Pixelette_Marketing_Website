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
    <div className='band-closing'>
      <Container className='main'>
        <section className='contactUsSection'>
          <section>
            {heading && (
              <HeadingTag
                className={headingLevel === 1 ? "h1p" : "h2"}
                dangerouslySetInnerHTML={{ __html: heading }}
              ></HeadingTag>
            )}
            {text && <Text className='lead'>{text}</Text>}
            <div data-reveal='stagger'>
              {data?.map((el, index) => (
                <blockquote key={index}>
                  <section>
                    <el.icon />
                  </section>
                  <div>
                    {el.heading && (
                      <Text className='text_primary--bolder'>{el.heading}</Text>
                    )}
                    <Text className='text_tertiary'>{el.text}</Text>
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
