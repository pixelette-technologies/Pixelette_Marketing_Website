import PublicSectorServiceTemplate from "@/components/ui/publicSector/PublicSectorServiceTemplate";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Community engagement",
  description: "Community engagement.",
  path: "/public-sector/community-engagement"
});

export default function Page() {
  return <PublicSectorServiceTemplate title='Community engagement' />;
}
