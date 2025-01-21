import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";

const StoriesHeroSection = () => {
  return (
    <Container className='main'>
      <div className='storiesHeroSection'>
        <Image
          src={"/common/storyHeroImage.webp"}
          alt='Hero Image'
          height={288}
          width={626}
        />
        <section>
          <Heading className='tertiary font_family_glory uppercase'>
            Stories of <span className='color_primary'>growth and impact</span>
          </Heading>
          <Text className='primary color_secondry'>
            Explore the success stories of brands we’ve helped scale. Covering
            everything from strategy to execution, discover how Pixelette
            Marketing’s expertise drives results and inspires innovation.
          </Text>
        </section>
      </div>
    </Container>
  );
};

export default StoriesHeroSection;
