import { FC } from "react";
import { Container } from "@/components/common";
import { Text, Web3MarketingCard } from "@/components/feature";

interface Web3CardsProps {
  image?: string;
  heading?: string;
  text?: string;
}

interface Web3QuestionsProps {
  heading?: string;
  text?: string;
  data?: Web3CardsProps[];
}

const Web3Questions: FC<Web3QuestionsProps> = ({ heading, text, data }) => {
  return (
    <div className='bg_tertiary' data-aos='fade-up' data-aos-duration='1000'>
      <Container className='main'>
        <section className='web3Question'>
          <header>
            <h2
              dangerouslySetInnerHTML={{ __html: heading || "Heading" }}
              className='heading_secondry--light color_secondry'
              data-aos='fade-up'
              data-aos-duration='1200'
            ></h2>
            <Text className='secondry' animation='fade-up' duration='1400'>
              {text}
            </Text>
          </header>

          <section>
            {data?.map((el, index) => (
              <Web3MarketingCard
                key={index}
                image={el.image}
                heading={el.heading}
                summary={el.text}
                animation='fade-up'
                duration={`${1000 + index * 300}`}
              />
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default Web3Questions;
