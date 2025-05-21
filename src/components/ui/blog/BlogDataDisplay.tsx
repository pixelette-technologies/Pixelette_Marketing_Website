"use client";

import { Container } from "@/components/common";
import BlogCategories from "./BlogCategories";
import BlogCardGrid from "./BlogCardGrid";
import React, { useState } from "react";
import blogsData from "@/data/blogs/blogsData";
import BlogCategoriesDropDown from "./BlogCategoriesDropDown";

const BlogDataDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const matchedData =
    selectedCategory === "All"
      ? blogsData.flatMap(category => category.data)
      : blogsData.find(category => category.title === selectedCategory)?.data ||
        [];

  return (
    <Container className='main'>
      <div className='blogDataDisplay'>
        <BlogCategories
          data={blogsData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <BlogCategoriesDropDown
          data={blogsData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <BlogCardGrid data={matchedData} />
      </div>
    </Container>
  );
};

export default BlogDataDisplay;
