import { LogoBlack } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";

interface BlogCardProps {
  icon?: boolean;
  title?: string;
  summary?: string;
  animation?: string;
  duration?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  icon,
  title,
  summary,
  animation,
  duration
}) => {
  return (
    <div
      className='blogCard bg_gray--lightness'
      data-aos={animation}
      data-aos-duration={duration}
    >
      {icon && <LogoBlack />}

      <div></div>
      <Text className='primary '>{title}</Text>
      <Text className='tertiary color_gray--light'>{summary}</Text>
    </div>
  );
};

export default BlogCard;
