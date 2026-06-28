"use client";

import { cn } from "@/lib/utils";
import { Match } from "./types";
import { TeamSlot } from "./TeamSlot";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export function MatchCard({ match, className }: MatchCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-cards p-3 min-w-[220px] transition-all duration-300 hover:border-border-active",
        match.isLive && "border-primary/50 shadow-red-glow",
        className
      )}
    >
      {/* Match Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="font-mono text-xs text-muted uppercase tracking-wider">
          {match.isLive && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              LIVE
            </span>
          )}
          {!match.isLive && match.scheduledTime && (
            match.scheduledTime
          )}
        </span>
        <span className="font-mono text-xs text-muted">
          Match {match.id}
        </span>
      </div>

      {/* Teams */}
      <div className="space-y-2">
        <TeamSlot
          team={match.team1}
          isWinner={match.winner === match.team1?.id}
          isLive={match.isLive}
        />
        <TeamSlot
          team={match.team2}
          isWinner={match.winner === match.team2?.id}
          isLive={match.isLive}
        />
      </div>
    </div>
  );
}
