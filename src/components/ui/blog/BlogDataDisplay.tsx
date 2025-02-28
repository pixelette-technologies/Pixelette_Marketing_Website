import { Container } from "@/components/common";
import BlogCategories from "./BlogCategories";
import BlogCardGrid from "./BlogCardGrid";
import React from "react";

type BlogPost = {
  title?: string;
  summary?: string;
};

type BlogDataDisplayProps = {
  id?: number;
  data?: BlogPost[];
};

const BlogDataDisplay: React.FC<BlogDataDisplayProps> = ({ data, id }) => {
  return (
    <Container className='main'>
      <div className='blogDataDisplay'>
        <BlogCategories currentId={id} />
        <BlogCardGrid data={data} />
      </div>
    </Container>
  );
};

export default BlogDataDisplay;
