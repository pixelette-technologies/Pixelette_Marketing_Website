import { BlogCard } from "@/components/feature";
import { storiesData } from "@/data/storiesData/storiesData";

const StoriesCardGrid = () => {
  const headerData = storiesData.slice(0, 2);
  const sectionData = storiesData.slice(2);
  return (
    <div className='storiesCardGrid  bg_white'>
      <header>
        {headerData.map((story, index) => (
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
        {sectionData.map((story, index) => (
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
