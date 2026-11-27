import { redirect } from "next/navigation";

// Mock-up keeps the baseline URL. /insights is the later rename.
export default function InsightsRedirect() {
  redirect("/blog-list");
}
