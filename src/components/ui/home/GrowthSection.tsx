import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { growthStartsData } from "@/data";
import Image from "next/image";
export default function GrowthSection() {
  return (
    <>
      <Container className='main'>
        <div className='growthSection'>
          <header>
            <Heading className='primary color_primary font_family_glory uppercase'>
              Growth starts here
            </Heading>
            <Heading className='primary color_secondry font_family_glory uppercase'>
              We ensure that
            </Heading>
            <div className='bg_tertiary'>
              {growthStartsData.map((el, index) => (
                <div key={index}>
                  <Heading className='primary color_primary font_family_glory uppercase'>
                    {el.value}
                  </Heading>
                  <Text className='secondry color_secondry--light font_family_glory'>
                    {el.detail}
                  </Text>
                </div>
              ))}
            </div>
          </header>
          <section>
            {/* <Heading>work we are proud of</Heading> */}
            <div>
              <section>
                <div>
                  <Image
                    src='/home/g_1.webp'
                    alt='Growth Icons'
                    width={125}
                    height={112}
                  />
                </div>
                <div>
                  <Image
                    src='/home/g_2.webp'
                    alt='Growth Icons'
                    width={191}
                    height={48}
                  />
                </div>
                <div>
                  <Image
                    src='/home/g_3.webp'
                    alt='Growth Icons'
                    width={247}
                    height={70}
                  />
                </div>
                <div>
                  <Image
                    src='/home/g_4.webp'
                    alt='Growth Icons'
                    width={150}
                    height={150}
                  />
                </div>
                <div>
                  <Image
                    src='/home/g_5.webp'
                    alt='Growth Icons'
                    width={191}
                    height={162}
                  />
                </div>
                <div>
                  <Image
                    src='/home/g_6.webp'
                    alt='Growth Icons'
                    width={205}
                    height={86}
                  />
                </div>
              </section>
              <Image
                src='/home/growthBanner.webp'
                alt='Growth Banner'
                width={538}
                height={527}
              />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
