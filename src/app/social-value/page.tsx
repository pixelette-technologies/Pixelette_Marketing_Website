import { SocialValuePage } from "@/components/ui/socialValue";
import { socialValueContent } from "@/data/socialValue";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Social value",
    description: socialValueContent.hero.paragraphs[0],
    path: "/social-value"
  });
}

export default function Page() {
  return <SocialValuePage />;
}
