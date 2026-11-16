import PublicSectorServiceTemplate from "@/components/ui/publicSector/PublicSectorServiceTemplate";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Campaigns and public awareness",
  description: "Campaigns and public awareness.",
  path: "/public-sector/campaigns-and-public-awareness"
});

export default function Page() {
  return (
    <PublicSectorServiceTemplate title='Campaigns and public awareness' />
  );
}
