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
      <header>
        {textfloat ? "" : <ArrowLeft />}
        <div>
          <Text className='primary--semiBold color_primary'>{mainHeading}</Text>
          <Text
            className={`primary--semiBold  ${theme ? "color_white" : "color_secondry"} `}
          >
            {subHeading}
          </Text>
        </div>
        {textfloat ? <ArrowRight /> : ""}
        <ArrowRight />
      </header>
      <Text className={`tertiary ${theme ? "color_white" : "color_secondry"} `}>
        {summary}
      </Text>
    </div>
  );
};

export default ArrowCard;
