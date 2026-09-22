import { LogoBlack } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";
import Image from "next/image";

interface BlogCardProps {
  icon: boolean;
  title: string;
  /** Optional so the stories grid, which shares this card, is unchanged.
   *  Falls back to the title, which is the behaviour it had before. */
  imageAlt?: string;
  summary: string;
  image: string;
}

const BlogCard: FC<BlogCardProps> = ({
  icon,
  title,
  imageAlt,
  summary,
  image
}) => {
  return (
    <div className='blogCard'>
      {icon && <LogoBlack />}
      <Image src={image} alt={imageAlt ?? title} height={160} width={200} />
      <Text className='text_primary'>{title}</Text>
      <Text className='text_tertiary'>{summary}</Text>
    </div>
  );
};

export default BlogCard;
