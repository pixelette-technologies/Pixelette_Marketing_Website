import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutCeo } from "@/data/aboutus";
import Image from "next/image";

// Leadership / CEO. Placed after why we exist. Portrait + name/role + copy,
// using the same eyebrow / burgundy title / plum body language as the rest
// of About. No card chrome — figure and copy on the page ground.

const AboutCeo = () => {
  const { eyebrow, name, role, image, body } = aboutCeo;

  return (
    <Container className='main'>
      <section className='aboutCeo' aria-labelledby='about-ceo-name'>
        <div className='aboutCeo__head'>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
        </div>

        <div className='aboutCeo__grid'>
          <figure className='aboutCeo__figure'>
            <Image
              src={image.src}
              alt={image.alt}
              width={640}
              height={640}
              className='aboutCeo__image'
              sizes='(max-width: 60rem) 100vw, 28rem'
              priority={false}
            />
          </figure>

          <div className='aboutCeo__copy'>
            <Heading className='h2' level={3} id='about-ceo-name'>
              {name}
            </Heading>
            <p className='aboutCeo__role'>{role}</p>

            <div className='aboutCeo__body'>
              {body.map(paragraph => (
                <Text key={paragraph} className='body'>
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutCeo;
