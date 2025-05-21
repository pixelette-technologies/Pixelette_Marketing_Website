import HeroSingleBlogPage from "@/components/ui/singleBlog/HeroSingleBlogPage";
import SingleBlogContent from "@/components/ui/singleBlog/SingleBlogContent";
import { ContactUsHero } from "@/components/ui/contactUs";
import RelatedBlogs from "@/components/ui/singleBlog/RelatedBlogs";
import blogsData from "@/data/blogs/blogsData";

interface PageProps {
  params: {
    id: string;
  };
}

export default function SingleBlogPage({ params }: PageProps) {
  const blogId = parseInt(params.id, 10);
  const allBlogs = blogsData.flatMap(category => category.data);
  const blog = allBlogs.find(item => item.id === blogId);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='bg_tertiary'>
      <HeroSingleBlogPage
        image={blog.image}
        profile={blog.authorProfile}
        name={blog.authorName}
        lastUpdateDate={blog.updateDate}
      />
      <SingleBlogContent
        heading={blog.heading}
        description={blog.description}
        data={blog.dataContent}
      />
      <RelatedBlogs data={blog.relatedBlogs} />
      <ContactUsHero />
    </div>
  );
}
