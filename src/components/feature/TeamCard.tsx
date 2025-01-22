"use client";

import { FC, useState } from "react";
import Heading from "./Heading";
import Text from "./Text";
import Image from "next/image";
import { BrownCollan, WhiteCollan } from "@/assets/common";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  detail: string;
}

const TeamCard: FC<TeamCardProps> = ({ image, name, role, detail }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='teamCard bg_white'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{isHovered ? <WhiteCollan /> : <BrownCollan />}</div>
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
