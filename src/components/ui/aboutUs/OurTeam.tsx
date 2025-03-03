import { Container } from "@/components/common";
import { Text, Heading } from "@/components/feature";
import { ourTeamData } from "@/data/aboutus";
import Image from "next/image";

const OurTeam = () => {
  return (
    <div className='bg_secondry' data-aos='fade-up' data-aos-duration='1000'>
      <Container className='main'>
        <section className='ourTeam'>
          <header>
            <Text
              className='primary color_primary'
              animation='fade-right'
              duration='1200'
            >
              Our team
            </Text>
            <Heading
              className='secondry--light color_white'
              animation='fade-right'
              duration='1200'
            >
              Your partners in growth
            </Heading>
            <Text
              className='secondry color_gray--light'
              animation='fade-up'
              duration='1600'
            >
              At Pixelette Marketing, our team of passionate marketers is
              dedicated to helping your brand not just get noticed but also
              adopted.
            </Text>
          </header>

          <section>
            {ourTeamData.map((el, index) => (
              <div
                style={{ backgroundColor: el.bgColor }}
                key={index}
                data-aos='fade-up'
                data-aos-duration={`${1000 + index * 300}`}
              >
                <center>
                  <Text>{el.name}</Text>
                  <Text>{el.role}</Text>
                </center>
                <Image
                  src={el.profile}
                  alt={el.name}
                  height={el.height}
                  width={el.width}
                />
              </div>
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default OurTeam;
