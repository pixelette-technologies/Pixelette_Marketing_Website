import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";

const BlogHeroSection = () => {
  return (
    <Container className='main'>
      <div className='blogHeroSection'>
        <Image
          src='/aboutUs/heroImageAbout.webp'
          alt='Hero About Us Page'
          width={626}
          height={288}
          data-aos='fade-up'
        />
        <section>
          <Heading
            className='tertiary font_family_glory uppercase'
            animation='fade-up'
            duration='1200'
          >
            Pixelette
            <span className='color_primary'> Marketing Blog</span>
          </Heading>
          <Text
            className='primary color_secondry'
            animation='fade-up'
            duration='1400'
          >
            Your marketing knowlege repository for emerging industries
          </Text>
        </section>
      </div>
    </Container>
  );
};

export default BlogHeroSection;
