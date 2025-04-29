import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";
import React from "react";

interface SingleBlogContentDataProps {
  id: number;
  titleOne: string;
  titleTwo: string;
  description: string;
}

interface SingleBlogContent {
  heading: string;
  description: string;
  data: SingleBlogContentDataProps[];
}

const SingleBlogContent: React.FC<SingleBlogContent> = ({
  heading,
  description,
  data
}) => {
  const generateId = (title: string) =>
    title.replace(/\s+/g, "-").toLowerCase();

  return (
    <Container className='main'>
      <div className='singleBlogContent'>
        <div>
          <header>
            <Heading className='primary color_primary'>{heading}</Heading>
            <Text className='primary'>{description}</Text>
          </header>

          <section>
            {data.map(el => (
              <div key={el.id} id={generateId(el.titleOne)}>
                <Heading className='secondry--boldLight'>
                  {el.titleOne}: {el.titleTwo}
                </Heading>
                <Text className='primary'>{el.description}</Text>
              </div>
            ))}
          </section>
        </div>

        <section>
          <div>
            <div className='bg_primary'>
              <Heading>Table of content</Heading>
              <ul>
                {data.map((el, index) => (
                  <li key={el.id}>
                    <a href={`#${generateId(el.titleOne)}`}>
                      {index + 1}. {el.titleOne}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <section>
              <h3>Share this</h3>
              <a href='http://facebook.com' target='_blank'>
                <Image
                  src='/blogs/facebookIcon.svg'
                  alt='FacebookIcon'
                  height={35}
                  width={35}
                />
              </a>
              <a href='http://facebook.com' target='_blank'>
                <Image
                  src='/blogs/twitterIcon.svg'
                  alt='TwitterIcon'
                  height={40}
                  width={40}
                />
              </a>
              <a href='http://facebook.com' target='_blank'>
                <Image
                  src='/blogs/instacon.svg'
                  alt='InstagramIcon'
                  height={35}
                  width={35}
                />
              </a>
            </section>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default SingleBlogContent;
