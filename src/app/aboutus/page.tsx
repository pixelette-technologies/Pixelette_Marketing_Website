import { redirect } from "next/navigation";

// Plan §9.5 / §8 — /aboutus permanently moves to /about.
export default function AboutUsRedirect() {
  redirect("/about");
}
