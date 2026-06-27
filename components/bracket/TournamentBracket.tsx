"use client";

import { motion } from "framer-motion";
import { TournamentBracket } from "./types";
import { BracketRound } from "./BracketRound";

interface TournamentBracketProps {
  bracket: TournamentBracket;
}

export function TournamentBracketDisplay({ bracket }: TournamentBracketProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-start gap-8 min-w-max px-4">
        {bracket.rounds.map((round, index) => (
          <motion.div
            key={round.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex items-start gap-8"
          >
            <BracketRound name={round.name} matches={round.matches} />

            {/* Connector lines (except for last round) */}
            {index < bracket.rounds.length - 1 && (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
