import { ArrowLeft, ArrowRight } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";

interface ArrowCardProps {
  mainHeading: string;
  subHeading: string;
  summary: string;
  theme: boolean;
  textfloat: boolean;
}

const ArrowCard: FC<ArrowCardProps> = ({
  mainHeading,
  subHeading,
  summary,
  theme,
  textfloat
}) => {
  return (
    <div
      className='arrowCard'
      style={{ textAlign: textfloat ? "right" : "left" }}
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
            <Text className='primary--semiBold color_primary'>
              {mainHeading}
            </Text>
            <Text
              className={`primary--semiBold  ${theme ? "color_white" : "color_secondry"} `}
            >
              {subHeading}
            </Text>
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
