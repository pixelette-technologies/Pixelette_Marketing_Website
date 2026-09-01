import { BlogCard } from "@/components/feature";
import Link from "next/link";

interface StoriesCardGridDataProps {
  title: string;
  summary: string;
  image: string;
  id: number;
}

interface StoriesCardGridProps {
  data?: StoriesCardGridDataProps[];
}

const StoriesCardGrid: React.FC<StoriesCardGridProps> = ({ data }) => {
  const headerData = data?.slice(0, 2);
  const sectionData = data?.slice(2);
  return (
    <div className='storiesCardGrid'>
      <header data-reveal='stagger'>
        {headerData?.map((story, index) => (
          <Link
            key={`section-story-${index}`}
            href={`/story/${story.id}`}
            
          >
            <BlogCard
              icon={false}
              image={story.image}
              title={story.title}
              summary={
                story.summary?.split(" ").slice(0, 7).join(" ") +
                (story.summary?.split(" ").length > 7 ? "..." : "")
              }
            />
          </Link>
        ))}
      </header>
      <section data-reveal='stagger'>
        {sectionData?.map((story, index) => (
          <Link
            key={`section-story-${index}`}
            href={`/story/${story.id}`}
            
          >
            <BlogCard
              icon={false}
              image={story.image}
              title={story.title}
              summary={
                story.summary?.split(" ").slice(0, 7).join(" ") +
                (story.summary?.split(" ").length > 7 ? "..." : "")
              }
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default StoriesCardGrid;
