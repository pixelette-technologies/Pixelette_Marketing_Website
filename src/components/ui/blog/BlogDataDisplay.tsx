import { Container } from "@/components/common";
import BlogCategories from "./BlogCategories";
import BlogCardGrid from "./BlogCardGrid";

const BlogDataDisplay = () => {
  return (
    <Container className='main'>
      <div className='blogDataDisplay'>
        <BlogCategories />
        <BlogCardGrid />
      </div>
    </Container>
  );
};

export default BlogDataDisplay;
