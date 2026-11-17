import HeroSingleBlogPage from "@/components/ui/singleBlog/HeroSingleBlogPage";
import SingleBlogContent from "@/components/ui/singleBlog/SingleBlogContent";
import { ContactSection } from "@/components/common";
import { finalConversionCopy } from "@/data/home";
import RelatedBlogs from "@/components/ui/singleBlog/RelatedBlogs";
import blogsData from "@/data/blogs/blogsData";
import { BLOG_SLUGS, blogIdFromSlug, blogHref } from "@/data/blogs/slugs";
import { pageMetadata, SITE_URL } from "@/data/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE = SITE_URL;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(BLOG_SLUGS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = blogIdFromSlug(slug);
  const blog =
    id == null
      ? undefined
      : blogsData.flatMap(c => c.data).find(item => item.id === id);
  if (!blog) {
    return pageMetadata({
      title: "Insights",
      description:
        "Points of view, practical playbooks and tools for making better marketing decisions.",
      path: `/insights/${slug}`,
      index: false
    });
  }
  const desc =
    typeof blog.description === "string"
      ? blog.description.replace(/<[^>]*>/g, "").trim().slice(0, 160)
      : "";
  return pageMetadata({
    title: blog.heading,
    description:
      desc || `Read "${blog.heading}" in Pixelette Marketing Insights.`,
    path: blogHref(blog.id),
    type: "article"
  });
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const blogId = blogIdFromSlug(slug);
  if (blogId == null) notFound();

  const allBlogs = blogsData.flatMap(category => category.data);
  const blog = allBlogs.find(item => item.id === blogId);
  if (!blog) notFound();

  const path = blogHref(blog.id);
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
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` }
    },
    mainEntityOfPage: `${SITE}${path}`
  };

  return (
    <div className='band-alt' data-reveal='group'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <HeroSingleBlogPage
        image={blog.image}
        imageAlt={blog.imageAlt}
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
      <ContactSection
        heading={finalConversionCopy.heading}
        text={finalConversionCopy.lead}
        closing={finalConversionCopy.closing}
      />
    </div>
  );
}
