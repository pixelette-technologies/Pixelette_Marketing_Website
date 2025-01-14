import { FC, ReactNode } from "react";
import { Heading, Text } from "../feature";
import Container from "./Container";
import ContactUsForm from "./ContactUsForm";

interface ContactData {
  icon: ReactNode;
  heading: string;
  text: string;
}

interface ContactSectionProps {
  heading: string;
  text: string;
  data: ContactData[];
}

const ContactSection: FC<ContactSectionProps> = ({ heading, text, data }) => {
  return (
    <div className='bg_tertiary'>
      <Container className='main'>
        <section className='contactUsSection'>
          <section>
            <Heading className='pirmary font_family_glory'>{heading}</Heading>
            <Text>{text}</Text>
            <div>
              {data.map((el, index) => (
                <blockquote key={index}>
                  {el.icon}
                  <div>
                    <Heading>{el.heading}</Heading>
                    <Text>{el.text}</Text>
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
