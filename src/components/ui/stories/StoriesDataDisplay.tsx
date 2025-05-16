"use client";

import React, { useState } from "react";
import { Container } from "@/components/common";
import StoriesCardGrid from "./StoriesCardGrid";
import { storiesData } from "@/data/storiesData/storiesData";

const StoriesDataDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const matchedData =
    selectedCategory === "All"
      ? storiesData.flatMap(category => category.data)
      : storiesData.find(category => category.title === selectedCategory)
          ?.data || [];

  const chunkedData = Array.from({
    length: Math.ceil(matchedData.length / 5)
  }).map((_, index) => matchedData.slice(index * 5, index * 5 + 5));

  return (
    <Container className='main'>
      <div
        className='storiesDataDisplay'
        data-aos='fade-up'
        data-aos-duration='1200'
      >
        <header>
          <div>
            <button
              onClick={() => setSelectedCategory("All")}
              className={
                selectedCategory === "All"
                  ? "bg_primary color_white"
                  : "color_secondary"
              }
            >
              All
            </button>
            {storiesData.map((el, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(el.title)}
                className={
                  selectedCategory === el.title
                    ? "bg_primary color_white"
                    : "color_secondary"
                }
              >
                {el.title}
              </button>
            ))}
          </div>
        </header>
        <section>
          {chunkedData.map((chunk, index) => (
            <StoriesCardGrid key={index} data={chunk} />
          ))}
        </section>
      </div>
    </Container>
  );
};

export default StoriesDataDisplay;
