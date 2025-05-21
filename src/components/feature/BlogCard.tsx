import { LogoBlack } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";
import Image from "next/image";

interface BlogCardProps {
  icon: boolean;
  title: string;
  summary: string;
  image: string;
}

const BlogCard: FC<BlogCardProps> = ({ icon, title, summary, image }) => {
  return (
    <div className='blogCard'>
      {icon && <LogoBlack />}
      <Image src={image} alt={title} height={160} width={200} />
      <Text className='primary color_secondry'>{title}</Text>
      <Text className='tertiary color_gray--light'>{summary}</Text>
    </div>
  );
};

export default BlogCard;
