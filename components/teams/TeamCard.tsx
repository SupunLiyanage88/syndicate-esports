"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Team } from "@/lib/types";
import { Shield, User } from "lucide-react";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gold/10 rounded-lg">
            <Shield className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-rajdhani font-semibold text-lg text-white uppercase tracking-wider">
              {team.name}
            </h3>
            <p className="font-inter text-muted text-sm flex items-center gap-1">
              <User className="w-3 h-3" />
              {team.captain}
            </p>
          </div>
        </div>
        <Badge variant={team.status}>{team.status}</Badge>
      </div>

      <div className="mt-4">
        <h4 className="font-rajdhani text-xs text-silver uppercase tracking-widest mb-2">
          Roster
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {team.players.map((player) => (
            <div
              key={player.ign}
              className="bg-surface rounded-md px-3 py-2 border border-border"
            >
              <p className="font-inter text-white text-sm truncate">{player.ign}</p>
              <p className="font-inter text-muted text-xs">{player.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="font-inter text-muted text-xs">
          Registered:{" "}
          {new Date(team.registeredAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}
