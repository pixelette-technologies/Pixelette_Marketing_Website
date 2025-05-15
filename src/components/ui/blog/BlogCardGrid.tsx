import { BlogCard } from "@/components/feature";
import Link from "next/link";
import React from "react";

type BlogPost = {
  title?: string;
  summary?: string;
};

type BlogDataDisplayProps = {
  data?: BlogPost[];
};

const BlogCardGrid: React.FC<BlogDataDisplayProps> = ({ data }) => {
  return (
    <div
      className='blogCardGrid bg_white'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      {data?.map((story, index) => (
        <Link key={`section-story-${index}`} href='/singleblog'>
          <BlogCard
            icon={false}
            title={story.title}
            summary={story.summary}
            animation='fade-up'
            duration={`${1000 + index * 200}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default BlogCardGrid;
