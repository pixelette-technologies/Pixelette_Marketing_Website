import PublicSectorServiceTemplate from "@/components/ui/publicSector/PublicSectorServiceTemplate";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Digital communications",
  description: "Digital communications.",
  path: "/public-sector/digital-communications"
});

export default function Page() {
  return <PublicSectorServiceTemplate title='Digital communications' />;
}
