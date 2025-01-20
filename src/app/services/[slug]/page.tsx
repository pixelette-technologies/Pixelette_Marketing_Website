import { ServicesHero } from "@/components/ui/services";
import { servicesData } from "@/data/services/servicesData";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;

  const pageData = servicesData.find(item => item.route === slug);

  return (
    <>
      <ServicesHero
        mainHeading={pageData?.mainHeading}
        subHeading={pageData?.subHeading}
        text={pageData?.summary}
        image={pageData?.image}
      />
    </>
  );
}
