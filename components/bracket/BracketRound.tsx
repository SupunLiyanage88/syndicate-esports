"use client";

import { Match } from "./types";
import { MatchCard } from "./MatchCard";

interface BracketRoundProps {
  name: string;
  matches: Match[];
}

export function BracketRound({ name, matches }: BracketRoundProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Round Header */}
      <div className="text-center mb-2">
        <span className="font-russo text-sm text-primary uppercase tracking-widest">
          {name}
        </span>
      </div>

      {/* Matches */}
      <div className="flex flex-col gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
