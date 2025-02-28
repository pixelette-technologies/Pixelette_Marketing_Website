import React from "react";
import { Container } from "@/components/common";
import StoriesCardGrid from "./StoriesCardGrid";
import blogsData from "@/data/blogs/blogsData";
import Link from "next/link";

type BlogPost = {
  title?: string;
  summary?: string;
};

type BlogDataDisplayProps = {
  id?: number;
  data?: BlogPost[];
};

const StoriesDataDisplay: React.FC<BlogDataDisplayProps> = ({ data, id }) => {
  return (
    <Container className='main'>
      <div
        className='storiesDataDisplay'
        data-aos='fade-up'
        data-aos-duration='1200'
      >
        <header>
          <div>
            {blogsData.map((el, index) => (
              <Link
                href={`/success_stories/${el.id}`}
                data-aos='fade-up'
                data-aos-duration='1000'
                key={index}
                className={
                  id === el.id ? "bg_primary color_white" : "color_secondry"
                }
              >
                {el.title}
              </Link>
            ))}
          </div>
        </header>
        <section>
          <StoriesCardGrid data={data} />
        </section>
      </div>
    </Container>
  );
};

export default StoriesDataDisplay;
