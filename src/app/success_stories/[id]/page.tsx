import {
  StoriesDataDisplay,
  StoriesHeroSection
} from "@/components/ui/stories";

import blogsData from "@/data/blogs/blogsData";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const currentId = Number(id);

  const blogListData = blogsData.find(item => item.id === currentId);

  const dataList = blogListData?.data;
  const dataId = blogListData?.id;

  return (
    <div className=''>
      <StoriesHeroSection />
      <StoriesDataDisplay data={dataList} id={dataId} />
    </div>
  );
}
