import MarketBServicePage from "@/components/ui/publicSector/MarketBServicePage";
import { marketBServiceLines } from "@/data/publicSector/serviceLines";
import { pageMetadata } from "@/data/site";

const line = marketBServiceLines[4]!;

export const metadata = pageMetadata({
  title: line.title,
  description: line.h1,
  path: line.path
});

export default function Page() {
  return <MarketBServicePage line={line} />;
}
