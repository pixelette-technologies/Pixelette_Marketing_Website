import { ArrowLeft, ArrowRight } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";
import Link from "next/link";

interface ArrowCardProps {
  mainHeading: string;
  subHeading: string;
  summary: string;
  theme: boolean;
  textfloat: boolean;
  className?: string;
  to?: string;
  animation?: string;
  duration?: string;
}

const ArrowCard: FC<ArrowCardProps> = ({
  mainHeading,
  subHeading,
  summary,
  theme,
  textfloat,
  className,
  to,
  animation,
  duration
}) => {
  return (
    <div
      className={`arrowCard ${className}  `}
      style={{ textAlign: textfloat ? "right" : "left" }}
      data-aos={animation}
      data-aos-duration={duration}
    >
      <section
        style={{ justifyContent: textfloat ? "flex-end" : "flex-start" }}
      >
        {textfloat ? (
          ""
        ) : (
          <div>
            <ArrowLeft />
          </div>
        )}

        <header>
          <section>
            {textfloat ? <Link href={to || "/"}> View More</Link> : ""}
            <header
              style={{ alignItems: textfloat ? "flex-end" : "flex-start" }}
            >
              <Text className='primary--semiBold color_primary'>
                {mainHeading}
              </Text>
              <Text
                className={`primary--semiBold  ${theme ? "color_white" : "color_secondry"} `}
              >
                {subHeading}
              </Text>
            </header>
            {textfloat ? "" : <Link href={to || "/"}> View More</Link>}
          </section>

          <Text
            className={`tertiary ${theme ? "color_gray" : "color_secondry"} `}
          >
            {summary}
          </Text>
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
