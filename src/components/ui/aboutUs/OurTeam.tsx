import { Container } from "@/components/common";
import { Text, Heading } from "@/components/feature";
import { ourTeamData } from "@/data/aboutus";
import Image from "next/image";

const OurTeam = () => {
  return (
    <div className='ourTeamBand'>
      <Container className='main'>
        <section className='ourTeam'>
          <header>
            <Text
              className='text_primary'
            >
              Our team
            </Text>
            <Heading
              className='heading_secondry--light'
            >
              Your partners in growth
            </Heading>
            <Text
              className='text_secondry'
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
