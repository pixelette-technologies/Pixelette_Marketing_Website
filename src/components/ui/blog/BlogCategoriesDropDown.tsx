"use client";
import React, { useId, useState } from "react";
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

// D5. The toggle was a <header> carrying onClick — no button, no keyboard
// path, no focus state and no aria-expanded, so the category filter was
// unreachable without a mouse on exactly the widths where this control
// replaces the sidebar, which is to say on phones. Third instance of this
// defect after the FAQ accordion and ProcessSection's tabs, and fixed the same
// way.
//
// The four colour utilities go with it. Two of them were `color_secondary`,
// the misspelling of color_secondry that has never applied; the selected state
// is aria-pressed now and the partial styles it.

const BlogCategoriesDropDown: React.FC<BlogCategoriesDropDownProps> = ({
  data,
  selectedCategory,
  onSelectCategory
}) => {
  const [active, setActive] = useState(false);
  const uid = useId();
  const listId = `${uid}-category-list`;

  return (
    <blockquote className='blogCategoriesDropDown'>
      <header>
        <button
          type='button'
          onClick={() => setActive(!active)}
          aria-expanded={active}
          aria-controls={listId}
        >
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
        </button>
      </header>
      {active && (
        <motion.div
          initial={{ y: "-3.75rem", opacity: 0 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ opacity: 0 }}
          className='dropdown-content'
          id={listId}
        >
          <button
            onClick={() => {
              onSelectCategory("All");
              setActive(!active);
            }}
            aria-pressed={selectedCategory === "All"}
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
              aria-pressed={selectedCategory === el.title}
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
