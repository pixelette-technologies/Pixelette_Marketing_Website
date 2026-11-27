import { redirect } from "next/navigation";

// Mock-up keeps the baseline URL. /about is the later rename.
export default function AboutRedirect() {
  redirect("/aboutus");
}
