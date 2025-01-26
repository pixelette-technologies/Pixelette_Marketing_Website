// import { FC } from "react";
// import { Heading, Text } from "../feature";

// interface CardsData {
//   title?: string;
//   text?: string;
// }

// interface ServicesCardsProps {
//   heading?: string;
//   data?: CardsData[];
// }

// const ServicesCards: FC<ServicesCardsProps> = ({ heading, data }) => {
//   return (
//     <div className='servicesCard'>
//       <Heading className='small color_primary'>{heading}</Heading>
//       <section>
//         {data?.map((el, index) => (
//           <div key={index}>
//             <Text className='primary--semiBold'>{el.title}</Text>
//             <Text className='tertiary color_gray-dark'>{el.text}</Text>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default ServicesCards;

import { FC } from "react";
import { Heading, Text } from "../feature";

interface CardsData {
  title?: string;
  text?: string;
}

interface ServicesCardsProps {
  heading?: string;
  data?: CardsData[];
}

const ServicesCards: FC<ServicesCardsProps> = ({
  heading = "Default Heading",
  data = []
}) => {
  return (
    <div className='servicesCard' data-aos='fade-up' data-aos-duration='1400'>
      {/* Heading Section */}
      <Heading className='small color_primary'>
        {heading || "No Heading Provided"}
      </Heading>

      {/* Data Section */}
      <section>
        {data.length > 0 ? (
          data.map((el, index) => (
            <div key={index} className='cardItem'>
              <Text className='primary--semiBold'>
                {el.title || "No Title"}
              </Text>
              <Text className='tertiary color_gray-dark'>
                {el.text || "No Description Available"}
              </Text>
            </div>
          ))
        ) : (
          <Text className='tertiary color_gray-dark'>No items to display.</Text>
        )}
      </section>
    </div>
  );
};

export default ServicesCards;
