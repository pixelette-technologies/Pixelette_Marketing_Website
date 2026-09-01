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
        />
        <section>
          <Heading
            className='heading_tertiary font_family_glory uppercase'
            level={1}
          >
            Pixelette
            <span> Marketing Blog</span>
          </Heading>
          <Text
            className='text_primary'
          >
            Your marketing knowlege repository for emerging industries
          </Text>
        </section>
      </div>
    </Container>
  );
};

export default BlogHeroSection;
