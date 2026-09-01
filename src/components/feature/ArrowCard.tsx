import { ArrowLeft, ArrowRight } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";
import Link from "next/link";

interface ArrowCardProps {
  mainHeading?: string;
  subHeading: string;
  summary: string;
  theme: boolean;
  textfloat: boolean;
  className?: string;
  to?: string;
}

// D4. Three things were wrong here and all three were live on the home page.
//
// The two inline style objects that carried textAlign and justifyContent are
// now the .arrowCard--float modifier, and the colour utilities the theme flag
// used to switch — color_white, color_secondry, color_gray, color_primary —
// are gone. Colour is contextual and comes from the partial, because the two
// grounds this card sits on need different tones rather than the same tone
// switched by a boolean. See _arrowCard.scss for the contrast figures.
//
// The "View More" link was display: none until hover, which meant it could not
// be reached by keyboard and did not exist at all on touch. It is always
// rendered now. No new copy: the label was already in the markup.

const ArrowCard: FC<ArrowCardProps> = ({
  mainHeading,
  subHeading,
  summary,
  theme,
  textfloat,
  className,
  to
}) => {
  const classes = [
    "arrowCard",
    theme ? "arrowCard--dark" : "",
    textfloat ? "arrowCard--float" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <section>
        {textfloat ? (
          ""
        ) : (
          <div>
            <ArrowLeft />
          </div>
        )}
        <header>
          <section>
            {to && (
              <>{textfloat ? <Link href={to || "/"}> View More</Link> : ""}</>
            )}

            <header>
              <Text className='primary--semiBold arrowCard__main'>
                {mainHeading}
              </Text>
              <Text className='primary--semiBold arrowCard__sub'>
                {subHeading}
              </Text>
            </header>
            {to && (
              <>{textfloat ? "" : <Link href={to || "/"}> View More</Link>}</>
            )}
          </section>

          <Text className='tertiary arrowCard__summary'>{summary}</Text>
        </header>

        {textfloat ? (
          <div>
            <ArrowRight />
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default ArrowCard;
