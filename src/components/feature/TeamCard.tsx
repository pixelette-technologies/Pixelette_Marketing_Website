import { FC } from "react";
import Heading from "./Heading";
import Text from "./Text";
import Image from "next/image";
import { BrownCollan } from "@/assets/common";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  detail: string;
}

// D5. The card used to fill solid crimson on hover over a 0.9s transition and
// swap its quote mark for a white one to survive the new ground. The register
// is flat and hover changes border colour only, so the fill, the transition
// and the swap all go — and with the swap gone the WhiteCollan mark has no
// call site left anywhere and is deleted.
//
// The name still renders as an h2, which puts three h2s inside a section that
// already has one. That is a heading-hierarchy fault, it is logged, and it
// stays: changing the level is a structural DOM change and out of scope here.

const TeamCard: FC<TeamCardProps> = ({ image, name, role, detail }) => {
  return (
    <div className='teamCard'>
      <section>
        <BrownCollan />
      </section>
      <header>
        <Image src={image} alt='profile' height={90} width={90} />
        <Heading className='heading_secondry--boldLight'>{name}</Heading>
        <Text className='text_secondry--semibold'>{role}</Text>
      </header>
      <Text className='text_tertiary--light'>{detail}</Text>
    </div>
  );
};

export default TeamCard;
