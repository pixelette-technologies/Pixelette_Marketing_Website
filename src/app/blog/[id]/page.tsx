import HeroSingleBlogPage from "@/components/ui/singleBlog/HeroSingleBlogPage";
import SingleBlogContent from "@/components/ui/singleBlog/SingleBlogContent";
import { ContactUsHero } from "@/components/ui/contactUs";
import RelatedBlogs from "@/components/ui/singleBlog/RelatedBlogs";
import blogsData from "@/data/blogs/blogsData";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const SITE = "https://www.pixelettemarketing.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = blogsData.flatMap(c => c.data).find(item => item.id === parseInt(id, 10));
  if (!blog) {
    return {
      title: "Blog | Pixelette Marketing",
      alternates: { canonical: `${SITE}/blog/${id}` }
    };
  }
  const desc =
    typeof blog.description === "string"
      ? blog.description.replace(/<[^>]*>/g, "").trim().slice(0, 160)
      : "";
  return {
    title: `${blog.heading} | Pixelette Marketing`,
    description: desc || `Read "${blog.heading}" on the Pixelette Marketing blog.`,
    alternates: { canonical: `${SITE}/blog/${id}` },
    openGraph: {
      title: `${blog.heading}`,
      description: desc || undefined,
      url: `${SITE}/blog/${id}`,
      type: "article"
    }
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { id } = await params;
  const blogId = parseInt(id, 10);
  const allBlogs = blogsData.flatMap(category => category.data);
  const blog = allBlogs.find(item => item.id === blogId);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const blogDesc =
    typeof blog.description === "string"
      ? blog.description.replace(/<[^>]*>/g, "").trim().slice(0, 200)
      : "";
  const blogImg =
    typeof blog.image === "string"
      ? blog.image.startsWith("http")
        ? blog.image
        : `${SITE}${blog.image}`
      : undefined;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.heading,
    description: blogDesc || undefined,
    image: blogImg,
    author: { "@type": "Organization", name: "Pixelette Marketing", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Pixelette Marketing",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` }
    },
    mainEntityOfPage: `${SITE}/blog/${id}`
  };

  return (
    <div className='bg_tertiary'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
