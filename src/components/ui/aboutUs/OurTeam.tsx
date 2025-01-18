import { Container } from "@/components/common";
import { Text } from "@/components/feature";
import { ourTeamData } from "@/data/aboutus";
import Image from "next/image";

const OurTeam = () => {
  return (
    <div className='bg_secondry'>
      <Container className='main'>
        <header>
          <Text className='primary color_primary'>Our team</Text>
          <Text>Your partners in growth</Text>
          <Text>
            At Pixelette Marketing, our team of passionate marketers is
            dedicated to helping your brand not just get noticed but also
            adopted.
          </Text>
        </header>

        <section>
          {ourTeamData.map((el, index) => (
            <div style={{ backgroundColor: el.bgColor }} key={index}>
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
      </Container>
    </div>
  );
};

export default OurTeam;
