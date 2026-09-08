import { FC, ComponentType } from "react";
import { Text } from "../feature";
import Container from "./Container";
import Link from "next/link";
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
  /** Trailing .small line under the copy column. */
  closing?: string;
  /** The brief pairs the primary CTA with a secondary one in the closing
   *  section. The primary IS the form beside this column, so only the
   *  secondary is rendered — a second button that scrolls to an adjacent form
   *  is noise. */
  cta?: { label: string; to: string };
  headingLevel?: 1 | 2;
}

const ContactSection: FC<ContactSectionProps> = ({
  heading,
  text,
  data,
  closing,
  cta,
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
            {data?.length ? (
            <div data-reveal='stagger'>
              {data.map((el, index) => (
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
            ) : null}
            {cta && (
              <Link href={cta.to} className='btn2 contactUsSection__cta'>
                {cta.label}
              </Link>
            )}
            {closing && <Text className='small'>{closing}</Text>}
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
