import { BlogDataDisplay, BlogHeroSection } from "@/components/ui/blog";
import blogsData from "@/data/blogs/blogsData";

type PageProps = {
  params: {
    id: string; // Ensure it's a string since URL params are usually strings
  };
};

export default function Page({ params }: PageProps) {
  const id = Number(params.id); // Convert it to a number

  const blogListData = blogsData.find(item => item.id === id);

  const dataList = blogListData?.data;
  const dataId = blogListData?.id;

  return (
    <>
      <BlogHeroSection />
      <BlogDataDisplay data={dataList} id={id} />
    </>
  );
}
