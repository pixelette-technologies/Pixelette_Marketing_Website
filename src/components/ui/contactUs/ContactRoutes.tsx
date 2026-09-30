import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { contactRoutes } from "@/data/contactUs";

// Other routes in: three cards on the thirds grid. Each ends on a link to
// something that exists, so none of them is a dead end.
const ContactRoutes = () => {
  return (
    <section className='contactRoutes' aria-labelledby='routes-heading'>
      <Container className='main'>
        <Heading className='h3' level={2}>
          <span id='routes-heading'>{contactRoutes.heading}</span>
        </Heading>
        <ul className='contactRoutes__grid' data-reveal='stagger'>
          {contactRoutes.items.map(route => (
            <li className='contactRoutes__card' key={route.heading}>
              <Heading className='h4' level={3}>
                {route.heading}
              </Heading>
              <Text className='body'>{route.text}</Text>
              {route.link.href.startsWith("/") ? (
                <Link className='contactRoutes__link' href={route.link.href}>
                  {route.link.label}
                </Link>
              ) : (
                <a className='contactRoutes__link' href={route.link.href}>
                  {route.link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ContactRoutes;
