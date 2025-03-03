import { BlogDataDisplay, BlogHeroSection } from "@/components/ui/blog";
import blogsData from "@/data/blogs/blogsData";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const currentId = Number(id);

  const blogListData = blogsData.find(item => item.id === currentId);

  const dataList = blogListData?.data;
  const dataId = blogListData?.id;

  return (
    <>
      <BlogHeroSection />
      <BlogDataDisplay data={dataList} id={dataId} />
    </>
  );
}
