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
        <Image src={image} alt='profile' height={90} width={90} />
        <Heading className='secondry--boldLight'>{name}</Heading>
        <Text className='secondry--semibold'>{role}</Text>
      </header>
      <Text className='tertiary--light'>{detail}</Text>
    </div>
  );
};

export default TeamCard;
