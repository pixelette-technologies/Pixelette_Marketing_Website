import {
  StoriesDataDisplay,
  StoriesHeroSection
} from "@/components/ui/stories";

import blogsData from "@/data/blogs/blogsData";

type PageProps = {
  params: {
    id: string;
  };
};

export default function page({ params }: PageProps) {

  const id = Number(params.id);

  const blogListData = blogsData.find(item => item.id === id);

  const dataList = blogListData?.data;
  const dataId = blogListData?.id;


  return (
    <div className=''>
      <StoriesHeroSection />
      <StoriesDataDisplay data={dataList} id={dataId}   />
    </div>
  );
}
