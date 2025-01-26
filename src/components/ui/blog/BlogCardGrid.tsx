import { storiesData } from "@/data/storiesData/storiesData";
import { BlogCard } from "@/components/feature";

const BlogCardGrid = () => {
  return (
    <div
      className='blogCardGrid bg_white'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      {storiesData.map((story, index) => (
        <BlogCard
          key={`section-story-${index}`}
          icon={false}
          title={story.title}
          summary={story.summary}
          animation='fade-up'
          duration={`${1000 + index * 200}`}
        />
      ))}
    </div>
  );
};

export default BlogCardGrid;
