import HeroSingleIndustriesPage from "@/components/ui/singleIndustriesPage/HeroSingleIndustriesPage";
import { singleIndustriesData } from "@/data/industries/singleIndustriesData";

export default function SingleIndustriesPage() {
  return (
    <>
      <HeroSingleIndustriesPage
        heading={singleIndustriesData.heroSection.mainHeading}
        description={singleIndustriesData.heroSection.description}
        data={singleIndustriesData.heroSection.data}
      />
    </>
  );
}
