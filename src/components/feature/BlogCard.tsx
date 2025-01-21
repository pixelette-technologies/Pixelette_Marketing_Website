import { LogoBlack } from "@/assets/common";
import { FC } from "react";
import Text from "./Text";

interface BlogCardProps {
  icon?: boolean;
  title?: string;
  summary?: string;
}

const BlogCard: FC<BlogCardProps> = ({ icon, title, summary }) => {
  return (
    <div className='blogCard bg_gray--lightness'>
      {icon && <LogoBlack />}

      <div></div>
      <Text className='primary '>{title}</Text>
      <Text className='tertiary color_gray--light'>{summary}</Text>
    </div>
  );
};

export default BlogCard;
