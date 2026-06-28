"use client";

import { cn } from "@/lib/utils";
import { Team } from "./types";

interface TeamSlotProps {
  team?: Team;
  isWinner?: boolean;
  isLive?: boolean;
}

export function TeamSlot({ team, isWinner, isLive }: TeamSlotProps) {
  if (!team) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-surface-high/50 border border-border/50 rounded-buttons opacity-50">
        <span className="font-chakra text-sm text-muted uppercase tracking-wider">TBD</span>
        <span className="font-mono text-sm text-muted">-</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border rounded-buttons transition-all duration-300",
        isWinner
          ? "bg-primary/10 border-primary/50"
          : "bg-surface-high border-border hover:border-border-active",
        isLive && "animate-glow-pulse"
      )}
    >
      <div className="flex items-center gap-3">
        {team.logo && (
          <img
            src={team.logo}
            alt={team.name}
            className="w-6 h-6 object-contain"
          />
        )}
        <span
          className={cn(
            "font-chakra text-sm font-medium uppercase tracking-wider",
            isWinner ? "text-primary" : "text-white"
          )}
        >
          {team.name}
        </span>
      </div>
      <span
        className={cn(
          "font-mono text-lg font-bold",
          isWinner ? "text-primary" : "text-silver"
        )}
      >
        {team.score !== undefined ? team.score : "-"}
      </span>
    </div>
  );
}
