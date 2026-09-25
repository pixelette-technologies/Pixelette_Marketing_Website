import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";

// 25 Sep 2026: "Pixelette Marketing Blog / Your marketing knowledge
// repository" became the page the navigation and footer already called it,
// Insights, with the final correction pass's standfirst as the h1. Type moved
// onto .eyebrow and .h1p with the other interior heroes. The layout and the
// image are unchanged; the image is decorative, so its alt is empty (it was
// "Hero About Us Page").
const BlogHeroSection = () => {
  return (
    <Container className='main'>
      <div className='blogHeroSection'>
        <Image
          src='/aboutUs/heroImageAbout.webp'
          alt=''
          width={626}
          height={288}
        />
        <section>
          <Text className='eyebrow'>Insights</Text>
          <Heading className='h1p' level={1}>
            Practical thinking on growth, marketing and the markets changing both.
          </Heading>
        </section>
      </div>
    </Container>
  );
};

export default BlogHeroSection;
