import { FC } from "react";
import Heading from "./Heading";
import Text from "./Text";
import Image from "next/image";
import { BrownCollan, WhiteCollan } from "@/assets/common";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  detail: string;
  animation?: string;
  duration?: string;
}

const TeamCard: FC<TeamCardProps> = ({
  image,
  name,
  role,
  detail,
  animation,
  duration
}) => {
  return (
    <div
      className='teamCard bg_white'
      data-aos={animation}
      data-aos-duration={duration}
    >
      <div>
        <WhiteCollan />
      </div>
      <section>
        <BrownCollan />
      </section>
      <header>
        <Image
          src={image}
          alt='profile'
          height={90}
          width={90}
          data-aos='fade-up'
          data-aos-duration='1700'
        />
        <Heading
          className='secondry--boldLight'
          animation='fade-up'
          duration='1800'
        >
          {name}
        </Heading>
        <Text
          className='secondry--semibold'
          animation='fade-up'
          duration='1900'
        >
          {role}
        </Text>
      </header>
      <Text className='tertiary--light' animation='fade-up' duration='2000'>
        {detail}
      </Text>
    </div>
  );
};

export default TeamCard;
