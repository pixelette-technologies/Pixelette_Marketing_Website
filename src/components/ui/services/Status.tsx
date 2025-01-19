import { Container } from "@/components/common";
import { Text, Heading } from "@/components/feature";
import { FC } from "react";

interface CardProps {
  value: number;
  detail: string;
}
interface StatusProps {
  heading: string;
  text: string;
  data: CardProps[];
}

const Status: FC<StatusProps> = ({ heading, text, data }) => {
  return (
    <div className='bg_primary'>
      <Container className='main'>
        <div className='status'>
          <header>
            <Heading className='secondry--light color_white'>{heading}</Heading>
            <Text className='secondry color_white'>{text}</Text>
          </header>
          <section>
            {data.map((el, index) => (
              <div key={index}>
                <Text className='primary color_white'>
                  <span>{el.value}</span>
                  {el.detail}
                </Text>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Status;
