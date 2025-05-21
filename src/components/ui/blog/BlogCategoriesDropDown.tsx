"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Text } from "@/components/feature";
import { LuFilter } from "react-icons/lu";

interface BlogCategoriesDropDownDataProps {
  title: string;
}

interface BlogCategoriesDropDownProps {
  data: BlogCategoriesDropDownDataProps[];
  selectedCategory: string;
  onSelectCategory: (title: string) => void;
}

const BlogCategoriesDropDown: React.FC<BlogCategoriesDropDownProps> = ({
  data,
  selectedCategory,
  onSelectCategory
}) => {
  const [active, setActive] = useState(false);

  return (
    <blockquote className='blogCategoriesDropDown'>
      <header onClick={() => setActive(!active)}>
        <section>
          <LuFilter />
          <Text className='secondry'>{selectedCategory}</Text>
        </section>
        <motion.div
          animate={
            active
              ? {
                  rotate: -180
                }
              : { rotate: 0 }
          }
        >
          <IoIosArrowDown />
        </motion.div>
      </header>
      {active && (
        <motion.div
          initial={{ y: "-6rem", opacity: 0 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ opacity: 0 }}
          className='dropdown-content'
        >
          <button
            onClick={() => {
              onSelectCategory("All");
              setActive(!active);
            }}
            className={
              selectedCategory === "All"
                ? "bg_primary color_white"
                : "color_secondary bg_dropdown"
            }
          >
            All
          </button>
          {data.map((el, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectCategory(el.title);
                setActive(!active);
              }}
              className={
                selectedCategory === el.title
                  ? "bg_primary color_white"
                  : "color_secondary  bg_dropdown"
              }
            >
              {el.title}
            </button>
          ))}
        </motion.div>
      )}
    </blockquote>
  );
};

export default BlogCategoriesDropDown;
