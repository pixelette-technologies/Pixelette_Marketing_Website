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
  data: ContactData[];
}

const ContactSection: FC<ContactSectionProps> = ({ heading, text, data }) => {
  return (
    <div className='bg_tertiary'>
      <Container className='main'>
        <section className='contactUsSection'>
          <section>
            {heading && (
              <h2
                className='heading_primary font_family_glory uppercase'
                dangerouslySetInnerHTML={{ __html: heading  }}
              ></h2>
            )}
            {text && <Text className='secondry'>{text}</Text>}
            <div>
              {data.map((el, index) => (
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
