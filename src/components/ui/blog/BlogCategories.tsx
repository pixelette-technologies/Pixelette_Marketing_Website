import { Heading } from "@/components/feature";
import blogsData from "@/data/blogs/blogsData";
import Link from "next/link";
import { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface BlogId {
  currentId?: number;
}

const BlogCategories: FC<BlogId> = ({ currentId }) => {
  return (
    <>
      <div
        className='blogCategories bg_white'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <Heading
          className='tertiary font_family_glory'
          animation='fade-up'
          duration='1200'
        >
          Categories
        </Heading>
        <div>
          <IoSearchOutline />
          <input type='text' placeholder='Search' />
        </div>

        <section>
          {blogsData.map((el, index) => (
            <Link
              href={`/blogs/${el.id}`}
              data-aos='fade-up'
              data-aos-duration='1000'
              key={index}
              className={
                currentId === el.id
                  ? "bg_primary color_white"
                  : "color_secondry"
              }
            >
              {el.title}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
};

export default BlogCategories;
