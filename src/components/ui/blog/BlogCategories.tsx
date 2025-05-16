import { Heading } from "@/components/feature";
import { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface BlogCategoriesDataProps {
  title: string;
}

interface BlogCategoriesProps {
  data: BlogCategoriesDataProps[];
  selectedCategory: string;
  onSelectCategory: (title: string) => void;
}

const BlogCategories: FC<BlogCategoriesProps> = ({
  data,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section
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

      <div className='searchBar'>
        <IoSearchOutline />
        <input type='text' placeholder='Search' />
      </div>

      <section>
        <button
          onClick={() => onSelectCategory("All")}
          className={
            selectedCategory === "All"
              ? "bg_primary color_white"
              : "color_secondary"
          }
        >
          All
        </button>

        {data.map((el, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(el.title)}
            className={
              selectedCategory === el.title
                ? "bg_primary color_white"
                : "color_secondary"
            }
          >
            {el.title}
          </button>
        ))}
      </section>
    </section>
  );
};

export default BlogCategories;
