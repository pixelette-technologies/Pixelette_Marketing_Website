import Image from "next/image";
import { FC } from "react";
import Text from "./Text";

interface Web3MarketingCardProps {
  image?: string;
  heading?: string;
  summary?: string;
  animation?: string;
  duration?: string;
}

const Web3MarketingCard: FC<Web3MarketingCardProps> = ({
  image,
  heading,
  summary,
  animation,
  duration
}) => {
  return (
    <div
      className='web3marketingCard  bg_white'
      data-aos={animation}
      data-aos-duration={duration}
    >
      <Image
        src={image || "/industries/mq_1.webp"}
        alt='Card Profile'
        width={324}
        height={175}
      />
      <h6
        className='text_secondry--semibold'
        dangerouslySetInnerHTML={{ __html: heading || "" }}
      />
      <Text className='tertiary color_gray--light'>{summary}</Text>
    </div>
  );
};

export default Web3MarketingCard;
