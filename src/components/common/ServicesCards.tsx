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
// lets the legacy layer retire.
//
// A note here used to say the group heading reaches the DOM as heading_small
// rather than .small, because Heading prefixed the first class token. F2
// stopped it doing that, so the note has been wrong since — it rendered
// <h2 class="small"> and did hit the primitive. It is the .eyebrow now: the
// group label is the eyebrow in the guide's section anatomy, and .eyebrow
// carries the brand tone itself, so the partial no longer sets a colour.

const ServicesCards: FC<ServicesCardsProps> = ({
  heading = "Default Heading",
  data = []
}) => {
  return (
    <div className='servicesCard'>
      {/* Heading Section */}
      <Heading className='eyebrow'>{heading || "No Heading Provided"}</Heading>

      {/* Data Section */}
      <section data-reveal='stagger'>
        {data.length > 0 ? (
          data.map((el, index) => (
            <div key={index} className='cardItem'>
              <Text className='text_primary--semiBold'>
                {el.title || "No Title"}
              </Text>
              <Text className='text_tertiary'>
                {el.text || "No Description Available"}
              </Text>
            </div>
          ))
        ) : (
          <Text className='text_tertiary'>No items to display.</Text>
        )}
      </section>
    </div>
  );
};

export default ServicesCards;
