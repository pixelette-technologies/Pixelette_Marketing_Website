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

// D5. A 28-line commented-out copy of this same component sat above it and is
// deleted with the rest of the dead code.
//
// The colour utilities are gone: color_primary on the heading and
// color_gray-dark on the card body are the partial's job now, which is what
// lets the legacy layer retire. Note that the heading's class reaches the DOM
// as heading_small, not .small — Heading prefixes the first class token only —
// so the Appendix E primitive of that name has never been what styled it.

const ServicesCards: FC<ServicesCardsProps> = ({
  heading = "Default Heading",
  data = []
}) => {
  return (
    <div className='servicesCard'>
      {/* Heading Section */}
      <Heading className='small'>{heading || "No Heading Provided"}</Heading>

      {/* Data Section */}
      <section>
        {data.length > 0 ? (
          data.map((el, index) => (
            <div key={index} className='cardItem'>
              <Text className='primary--semiBold'>
                {el.title || "No Title"}
              </Text>
              <Text className='tertiary'>
                {el.text || "No Description Available"}
              </Text>
            </div>
          ))
        ) : (
          <Text className='tertiary'>No items to display.</Text>
        )}
      </section>
    </div>
  );
};

export default ServicesCards;
