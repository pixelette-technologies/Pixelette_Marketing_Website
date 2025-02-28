import { BlogCard } from "@/components/feature";

type BlogPost = {
  title?: string;
  summary?: string;
};

type BlogDataDisplayProps = {
  data?: BlogPost[];
};

const StoriesCardGrid: React.FC<BlogDataDisplayProps> = ({ data }) => {
  const headerData = data?.slice(0, 2);
  const sectionData = data?.slice(2);
  return (
    <div className='storiesCardGrid  bg_white'>
      <header>
        {headerData?.map((story, index) => (
          <BlogCard
            key={`header-story-${index}`}
            icon={true}
            title={story.title}
            summary={story.summary}
            animation='fade-up'
            duration={`${1000 + index * 300}`}
          />
        ))}
      </header>
      <section>
        {sectionData?.map((story, index) => (
          <BlogCard
            key={`section-story-${index}`}
            icon={true}
            title={story.title}
            summary={story.summary}
            animation='fade-up'
            duration={`${1000 + index * 300}`}
          />
        ))}
      </section>
    </div>
  );
};

export default StoriesCardGrid;
