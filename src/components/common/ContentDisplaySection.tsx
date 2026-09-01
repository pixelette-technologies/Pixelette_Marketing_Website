import { FC } from "react";
import { Text } from "../feature";
import Container from "./Container";

interface CardProps {
  heading?: string;
  detail?: string;
}

interface ContentDisplaySectionProps {
  title?: string;
  heading?: string;
  detail?: string;
  data: CardProps[];
}

// The vertical marquee is gone: a 60fps requestAnimationFrame loop driving a
// setPosition on every tick, a hover-pause state, and four render passes of the
// same card list — three stacked for the "seamless loop" plus a fourth copy for
// mobile. The cards now render ONCE, on a grid, at every width.
//
// Phase F. Brought onto the same anatomy as EngagementStalls on the home
// page — the section this one was asked to match.
//
// Three things changed and the third was a live defect:
//
//   1. Anatomy. The heading column was a STICKY half-width column beside a
//      capped card grid, so the cards were squeezed into 34rem while the left
//      half of a full-bleed dark band sat empty for the length of the list.
//      It stacks now, exactly as EngagementStalls does: heading block on top
//      held to 34rem, cards below across the full width, three across.
//   2. Type roles. title/heading/detail were text_primary, a display heading
//      variant and text_secondry; they are .eyebrow, .h2 and .lead, which is
//      the eyebrow -> serif h2 -> standfirst opening the guide repeats. The
//      D8 colour block that used to tint them by hand is deleted with them:
//      .band-dark already colours all three, for every dark band at once.
//   3. THE CARD TEXT WAS DEAD. The partial styled .primary--bold and
//      .tertiary; since F2 stopped Text renaming its className, the DOM
//      carries text_primary--bold and text_tertiary, so NEITHER rule had
//      applied. Both fell through to --color-panel-text inherited from the
//      band — a DARK-ground tone, on cards that were white and --color-band.
//      That measures about 2:1 and is why the cards read as washed out. The
//      hooks below are named for the elements they style, the way arrowCard__
//      already is, so a later class change cannot silently kill them again.
//
// No content is lost. The extra passes were the same data.map output repeated
// so the loop had something to scroll into.

const ContentDisplaySection: FC<ContentDisplaySectionProps> = ({
  title,
  heading,
  detail,
  data
}) => {
  return (
    <div className='band-dark'>
      <Container className='main'>
        <div className='contentDisplaySection sec'>
          <header>
            <div>
              <Text className='eyebrow'>{title}</Text>
              <h2
                dangerouslySetInnerHTML={{ __html: heading || "" }}
                className='h2'
              ></h2>
              <Text className='lead'>{detail}</Text>
            </div>
          </header>
          <section className='contentDisplayCards'>
            {data.map((el, index) => (
              <div key={index} className='contentCard'>
                <div className='card-content'>
                  <Text className='text_primary--bold contentCard__title'>
                    {el.heading}
                  </Text>
                  <Text className='text_tertiary contentCard__summary'>
                    {el.detail}
                  </Text>
                </div>
              </div>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ContentDisplaySection;
