"use client";

import { motion } from "framer-motion";
import { TournamentBracket, Match } from "./types";
import { BracketRound } from "./BracketRound";

interface TournamentBracketProps {
  bracket: TournamentBracket;
}

export function TournamentBracketDisplay({ bracket }: TournamentBracketProps) {
  // Transform API data to component format
  const transformBracket = (): TournamentBracket => {
    return {
      ...bracket,
      rounds: bracket.rounds.map((round, roundIndex) => ({
        name: round.name,
        roundNumber: round.roundNumber || roundIndex + 1,
        matches: round.matches.map((match): Match => ({
          id: match.matchId || match.id || `R${roundIndex + 1}-M${match.position + 1}`,
          round: roundIndex,
          position: match.position,
          team1: match.team1
            ? {
                id: match.team1.id || match.team1.teamId || "",
                name: match.team1.name || match.team1.teamName || "Unknown",
                score: match.team1.score,
                logo: match.team1.logo,
              }
            : undefined,
          team2: match.team2
            ? {
                id: match.team2.id || match.team2.teamId || "",
                name: match.team2.name || match.team2.teamName || "Unknown",
                score: match.team2.score,
                logo: match.team2.logo,
              }
            : undefined,
          winner: match.winner || undefined,
          isLive: match.isLive,
          isCompleted: match.isCompleted,
          scheduledTime: match.scheduledTime || undefined,
        })),
      })),
    };
  };

  const transformedBracket = transformBracket();

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-start gap-8 min-w-max px-4">
        {transformedBracket.rounds.map((round, index) => (
          <motion.div
            key={round.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex items-start gap-8"
          >
            <BracketRound name={round.name} matches={round.matches} />

            {/* Connector lines (except for last round) */}
            {index < transformedBracket.rounds.length - 1 && (
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
