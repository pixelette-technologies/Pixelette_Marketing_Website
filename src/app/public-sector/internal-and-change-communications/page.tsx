import PublicSectorServiceTemplate from "@/components/ui/publicSector/PublicSectorServiceTemplate";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Internal and change communications",
  description: "Internal and change communications.",
  path: "/public-sector/internal-and-change-communications"
});

export default function Page() {
  return (
    <PublicSectorServiceTemplate title='Internal and change communications' />
  );
}
