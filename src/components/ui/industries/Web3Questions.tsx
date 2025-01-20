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
    <div className='bg_tertiary'>
      <Container className='main'>
        <section className='web3Question'>
          <header>
            <h2
              dangerouslySetInnerHTML={{ __html: heading || "Heading" }}
              className='heading_secondry--light color_secondry'
            ></h2>
            <Text className='secondry'>{text}</Text>
          </header>

          <section>
            {data?.map((el, index) => (
              <Web3MarketingCard
                key={index}
                image={el.image}
                heading={el.heading}
                summary={el.text}
              />
            ))}
          </section>
        </section>
      </Container>
    </div>
  );
};

export default Web3Questions;
