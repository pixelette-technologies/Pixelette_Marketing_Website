import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { growthStartsData } from "@/data";
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
        </div>
      </Container>
    </>
  );
}
