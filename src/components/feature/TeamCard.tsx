import { FC } from "react";
import Component from "..";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  facebook?: string;
  x?: string;
  insta?: string;
  github?: string;
}

const TeamCard: FC<TeamCardProps> = ({
  image,
  name,
  role,
  facebook,
  x,
  insta,
  github,
}) => {
  return (
    <div className="teamCard">
      <img src={image} alt="profile" />
      <Component.Feature.Heading className="medium">
        {name}
      </Component.Feature.Heading>
      <Component.Feature.Text className="small color_gray">
        {role}
      </Component.Feature.Text>
      <section>
        <a href={facebook}>
          <FaFacebookF />
        </a>
        <a href={x}>
          <FaXTwitter />
        </a>
        <a href={insta}>
          <FaInstagram />
        </a>
        <a href={github}>
          <FaGithub />
        </a>
      </section>
    </div>
  );
};

export default TeamCard;
