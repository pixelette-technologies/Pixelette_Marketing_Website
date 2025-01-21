import { storiesData } from "@/data/storiesData/storiesData";
import { BlogCard } from "@/components/feature";

const BlogCardGrid = () => {
  return (
    <div className='blogCardGrid bg_white'>
      {storiesData.map((story, index) => (
        <BlogCard
          key={`section-story-${index}`}
          icon={false}
          title={story.title}
          summary={story.summary}
        />
      ))}
    </div>
  );
};

export default BlogCardGrid;
