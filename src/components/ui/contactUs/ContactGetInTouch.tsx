import { MailIcon, PhoneIcon, PinIcon } from "@/assets/contactUs";
import { Container } from "@/components/common";
import ContactUsForm from "@/components/common/ContactUsForm";
import { Heading } from "@/components/feature";
import { CONTACT_EMAIL, contactForm, offices } from "@/data/contactUs";

// Offices beside the form, the Pixelette Technologies layout: a narrow column
// of addresses and numbers, the form in a card taking the wider share.
//
// The section's h2 is visually hidden, as theirs is. The two columns are
// self-evident on sight and a visible "Get in touch" under an h1 that already
// says it would be the line printed twice again.
//
// The form is ContactUsForm unchanged, with its own intro switched off: the
// card carries the heading instead. The form is a governed contract (see
// 06 The enquiry form) and nothing here touches its fields.
const ContactGetInTouch = () => {
  return (
    <section className='contactTouch' aria-labelledby='contact-heading'>
      <Container className='main'>
        <h2 className='contactTouch__srOnly' id='contact-heading'>
          Get in touch
        </h2>
        <div className='contactTouch__split'>
          <div className='contactTouch__offices'>
            {offices.map(office => (
              <div className='contactTouch__item' key={office.name}>
                <span className='contactTouch__icon'>
                  <PinIcon />
                </span>
                <div>
                  <p className='contactTouch__name'>{office.name}</p>
                  {office.note && <p className='contactTouch__note'>{office.note}</p>}
                  <address className='contactTouch__address'>
                    {office.address.map(line => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  <a className='contactTouch__line' href={office.phone.href}>
                    <PhoneIcon />
                    {office.phone.label}
                  </a>
                </div>
              </div>
            ))}
            <div className='contactTouch__item'>
              <span className='contactTouch__icon'>
                <MailIcon />
              </span>
              <a className='contactTouch__name contactTouch__mail' href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className='contactTouch__card'>
            <Heading className='h3' level={3}>
              {contactForm.heading}
            </Heading>
            <ContactUsForm showIntro={false} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactGetInTouch;
