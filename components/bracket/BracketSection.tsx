"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TournamentBracketDisplay } from "./TournamentBracket";
import { TournamentBracket } from "./types";

const sampleBracket: TournamentBracket = {
  rounds: [
    {
      name: "Quarter Finals",
      matches: [
        {
          id: "QF1",
          round: 0,
          position: 0,
          team1: { id: "t1", name: "Colombo Titans", score: 2 },
          team2: { id: "t2", name: "Lion Knights", score: 1 },
          winner: "t1",
        },
        {
          id: "QF2",
          round: 0,
          position: 1,
          team1: { id: "t3", name: "Dragon Eagles", score: 0 },
          team2: { id: "t4", name: "Kandy Wolves", score: 2 },
          winner: "t4",
        },
        {
          id: "QF3",
          round: 0,
          position: 2,
          team1: { id: "t5", name: "Galle Gladiators", score: 2 },
          team2: { id: "t6", name: "Jaffna Kings", score: 0 },
          winner: "t5",
        },
        {
          id: "QF4",
          round: 0,
          position: 3,
          team1: { id: "t7", name: "Negombo Sharks", score: 1 },
          team2: { id: "t8", name: "Matara Hawks", score: 2 },
          winner: "t8",
          isLive: false,
        },
      ],
    },
    {
      name: "Semi Finals",
      matches: [
        {
          id: "SF1",
          round: 1,
          position: 0,
          team1: { id: "t1", name: "Colombo Titans", score: 2 },
          team2: { id: "t4", name: "Kandy Wolves", score: 1 },
          winner: "t1",
        },
        {
          id: "SF2",
          round: 1,
          position: 1,
          team1: { id: "t5", name: "Galle Gladiators" },
          team2: { id: "t8", name: "Matara Hawks" },
          isLive: true,
        },
      ],
    },
    {
      name: "Grand Final",
      matches: [
        {
          id: "GF",
          round: 2,
          position: 0,
          team1: { id: "t1", name: "Colombo Titans" },
          team2: { id: "t5", name: "Galle Gladiators" },
        },
      ],
    },
  ],
};

export function BracketSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
            Live Bracket
          </span>
          <h2 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider">
            Tournament Bracket
          </h2>
        </motion.div>

        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ascendant League Season 1</CardTitle>
              <span className="flex items-center gap-2 text-primary text-sm font-chakra">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Live
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <TournamentBracketDisplay bracket={sampleBracket} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
