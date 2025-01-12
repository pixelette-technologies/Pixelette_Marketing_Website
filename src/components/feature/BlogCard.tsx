import { FC } from "react";
import Component from "..";
import { IoIosArrowForward } from "react-icons/io";

interface BlogCardProps {
  image: string;
  date: string;
  author: string;
  name: string;
  detail: string;
  link?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  image,
  date,
  author,
  name,
  detail,
  link,
}) => {
  return (
    <div className="blogCard">
      <img src={image} alt="blogProfile" />
      <section>
        <div>
          <Component.Feature.Text className="medium color_gray">
            {date}
          </Component.Feature.Text>
          <Component.Feature.Text className="medium color_gray">
            By {author}
          </Component.Feature.Text>
        </div>
        <Component.Feature.Heading className="small">
          {name}
        </Component.Feature.Heading>
        <Component.Feature.Text className="small color_gray">
          {detail}
        </Component.Feature.Text>
        <a className="color_red" href={link}>
          read more <IoIosArrowForward />
        </a>
      </section>
    </div>
  );
};

export default BlogCard;
