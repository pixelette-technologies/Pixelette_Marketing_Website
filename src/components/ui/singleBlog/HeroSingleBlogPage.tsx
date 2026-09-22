import { Container } from "@/components/common";
import { Text } from "@/components/feature";
import Image from "next/image";
import React from "react";

interface HeroSingleBlogPageProps {
  image: string;
  imageAlt: string;
  profile: string;
  name: string;
  lastUpdateDate: string;
}

const HeroSingleBlogPage: React.FC<HeroSingleBlogPageProps> = ({
  image,
  imageAlt,
  profile,
  name,
  lastUpdateDate
}) => {
  return (
    <Container className='main'>
      <div className='heroSingleBlogPage'>
        <Image src={image} alt={imageAlt} height={460} width={1250} />

        <section>
          <div>
            <Text>Written by</Text>
            <Image
              src={profile}
              alt='Profile of Blog Poster'
              height={29}
              width={29}
            />
            <Text>{name}</Text>
          </div>
          <div>
            <Text>Last Updated: {lastUpdateDate}</Text>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HeroSingleBlogPage;
