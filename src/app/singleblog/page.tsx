import HeroSingleBlogPage from "@/components/ui/singleBlog/HeroSingleBlogPage";
import SingleBlogContent from "@/components/ui/singleBlog/SingleBlogContent";
import { singleDataContent } from "@/data/blogs/singleDataContent";
import { ContactUsHero } from "@/components/ui/contactUs";
import RelatedBlogs from "@/components/ui/singleBlog/RelatedBlogs";

export default function SingleBlogPage() {
  return (
    <div className='bg_tertiary'>
      <HeroSingleBlogPage
        image={singleDataContent.image}
        profile={singleDataContent.authorProfile}
        name={singleDataContent.authorName}
        lastUpdateDate={singleDataContent.updateDate}
      />
      <SingleBlogContent
        heading={singleDataContent.heading}
        description={singleDataContent.description}
        data={singleDataContent.dataContent}
      />
      <RelatedBlogs data={singleDataContent.relatedBlogs} />
      <ContactUsHero />
    </div>
  );
}
