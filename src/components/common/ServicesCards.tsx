import { FC } from "react";
import { Heading, Text } from "../feature";

interface CardsData {
  title: string;
  text: string;
}

interface ServicesCardsProps {
  heading: string;
  data: CardsData[];
}

const ServicesCards: FC<ServicesCardsProps> = ({ heading, data }) => {
  return (
    <div className='servicesCard'>
      <Heading className='small color_primary'>{heading}</Heading>
      <section>
        {data.map((el, index) => (
          <div key={index}>
            <Text className='primary--semiBold'>{el.title}</Text>
            <Text className='tertiary color_gray-dark'>{el.text}</Text>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ServicesCards;
