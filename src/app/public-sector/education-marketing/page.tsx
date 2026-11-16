import PublicSectorServiceTemplate from "@/components/ui/publicSector/PublicSectorServiceTemplate";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Education marketing",
  description: "Education marketing.",
  path: "/public-sector/education-marketing"
});

export default function Page() {
  return <PublicSectorServiceTemplate title='Education marketing' />;
}
