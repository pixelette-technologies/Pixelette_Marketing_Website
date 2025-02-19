import ArrowRed from "@/assets/common/ArrowLeft";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { growthStartsData } from "@/data";
import Image from "next/image";

type GrowthData = {
  value: string;
  detail: string;
};

export default function GrowthSection() {
  const images = [
    { src: "/home/g_1.webp", width: 125, height: 112 },
    { src: "/home/g_2.webp", width: 191, height: 48 },
    { src: "/home/g_3.webp", width: 247, height: 70 },
    { src: "/home/g_4.webp", width: 150, height: 150 },
    { src: "/home/g_5.webp", width: 191, height: 162 },
    { src: "/home/g_6.webp", width: 205, height: 86 }
  ];

  return (
    <Container className='main'>
      <div className='growthSection'>
        <header>
          <Heading
            className='secondary color_primary font_family_glory uppercase'
            animation='fade-right'
            duration='1400'
          >
            Growth starts here
            <ArrowRed />
          </Heading>
          <Heading
            className='secondary color_secondary font_family_glory uppercase'
            animation='fade-right'
            duration='1400'
          >
            SUCCESS FOLLOWS NEXT.
          </Heading>
          <div
            className='bg_tertiary'
            data-aos='fade-up'
            data-aos-duration='1600'
          >
            {growthStartsData.map((el: GrowthData, index: number) => (
              <div key={index}>
                <Heading className='primary color_primary font_family_glory uppercase'>
                  {el.value}
                </Heading>
                <Text className='secondary color_secondary--light font_family_glory'>
                  {el.detail}
                </Text>
              </div>
            ))}
          </div>
        </header>

        <section>
          <div>
            <section data-aos='fade-right' data-aos-duration={1300}>
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.src}
                    alt='Growth Icons'
                    width={image.width}
                    height={image.height}
                  />
                </div>
              ))}

              {/* <Heading>work we are proud of</Heading> */}
            </section>
            <div data-aos='fade-left' data-aos-duration='2000'>
              <Image
                src='/home/growthBanner.webp'
                alt='Growth Banner'
                width={538}
                height={527}
              />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
