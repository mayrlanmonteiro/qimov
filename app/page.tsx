import { HeroSequence } from "@/components/hero/HeroSequence";
import { Showcase } from "@/components/sections/Showcase";
import { Catalog } from "@/components/catalog/Catalog";
import { Comparator } from "@/components/sections/Comparator";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Showroom } from "@/components/sections/Showroom";

export default function Home() {
  return (
    <>
      <HeroSequence />
      <Showcase />
      <Catalog />
      <Comparator />
      <SavingsCalculator />
      <Showroom />
    </>
  );
}
