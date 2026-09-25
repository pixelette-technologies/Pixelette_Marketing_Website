import { MailIcon, PhoneIcon } from "@/assets/contactUs";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { howItWorkData } from "@/data/contactUs";

// 25 Sep 2026: four numbered steps (see howItWorkData), and the headings on
// the current type roles rather than heading_secondry--light and
// heading_secondry--boldLight. The contact details are links now; they were
// plain text, so a phone number could not be tapped on the device most likely
// to be reading it.
const CONTACTS = [
  { Icon: MailIcon, label: "sales@pixelettemarketing.com", href: "mailto:sales@pixelettemarketing.com" },
  { Icon: PhoneIcon, label: "+44 20 4518 8226", href: "tel:+442045188226" },
  { Icon: PhoneIcon, label: "+1 773 270 9034", href: "tel:+17732709034" }
];

const HowItWork = () => {
  return (
    <div className='howItworksBand'>
      <Container className='main'>
        <div className='howItworks'>
          <header>
            <Heading className='h2'>What happens next</Heading>
            <section>
              {CONTACTS.map(({ Icon, label, href }) => (
                <div key={href}>
                  <Icon />
                  <a className='text_primary' href={href}>
                    {label}
                  </a>
                </div>
              ))}
            </section>
          </header>
          <ol data-reveal='stagger'>
            {howItWorkData.map(el => (
              <li key={el.index}>
                <span className='howItworks__index' aria-hidden='true'>
                  {el.index}
                </span>
                <div>
                  <Heading className='h4' level={3}>
                    {el.heading}
                  </Heading>
                  <Text className='body'>{el.text}</Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
};

export default HowItWork;
