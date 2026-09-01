import { BlogCard } from "@/components/feature";
import Link from "next/link";
import React from "react";

type BlogPost = {
  id: number;
  heading: string;
  image: string;
  description: string;
};

type BlogDataDisplayProps = {
  data?: BlogPost[];
};

const BlogCardGrid: React.FC<BlogDataDisplayProps> = ({ data }) => {
  return (
    <div
      className='blogCardGrid'
    >
      {data?.map((story, index) => (
        <Link
          key={`section-story-${index}`}
          href={`/blog/${story.id}`}
          
        >
          <BlogCard
            icon={false}
            image={story.image}
            title={story.heading}
            summary={
              story.description?.split(" ").slice(0, 7).join(" ") +
              (story.description?.split(" ").length > 7 ? "..." : "")
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default BlogCardGrid;
