import { TrustedBrands } from "@/components/common";
import { HomeHero } from "@/components/ui/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBrands header='Trusted by' heading='Leading Brands' />
    </>
  );
}
