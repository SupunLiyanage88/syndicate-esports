"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { TournamentSummaryCards } from "@/components/home/TournamentSummaryCards";
import { PrizeSection } from "@/components/home/PrizeSection";
import { BracketSection } from "@/components/bracket/BracketSection";
import { RedDivider } from "@/components/ui/RedDivider";

export function HomeClient() {
  return (
    <>
      <HeroSection />
      <TournamentSummaryCards />
      <RedDivider />
      <BracketSection />
      <RedDivider />
      <PrizeSection />
    </>
  );
}
