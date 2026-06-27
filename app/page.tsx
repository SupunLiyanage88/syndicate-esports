import { HeroSection } from "@/components/home/HeroSection";
import { TournamentSummaryCards } from "@/components/home/TournamentSummaryCards";
import { PrizeSection } from "@/components/home/PrizeSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TournamentSummaryCards />
      <GoldDivider />
      <PrizeSection />
    </>
  );
}
