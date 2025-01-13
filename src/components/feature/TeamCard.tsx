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
}

const TeamCard: FC<TeamCardProps> = ({ image, name, role, detail }) => {
  return (
    <div className='teamCard'>
      <header>
        <div>
          <Image src={image} alt='profile' height={90} width={90} />
          <Heading className='medium'>{name}</Heading>
          <Text className='small color_gray'>{role}</Text>
        </div>
        <div>
          <BrownCollan />
          <WhiteCollan />
        </div>
      </header>
      <Text>{detail}</Text>
    </div>
  );
};

export default TeamCard;
