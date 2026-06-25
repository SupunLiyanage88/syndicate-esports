"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  XCircle,
  Search,
  Shield,
  User,
  Phone,
  MessageCircle,
  Hash,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Team } from "@/lib/types";

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const res = await fetch("/api/admin/teams");
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (err) {
      console.error("Failed to load teams", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "pending" | "approved" | "rejected") => {
    const res = await fetch("/api/admin/teams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      setTeams((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    }
  };

  const deleteTeam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return;
    const res = await fetch(`/api/admin/teams?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setTeams((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const filteredTeams = teams
    .filter((t) => filter === "all" || t.status === filter)
    .filter(
      (t) =>
        t.teamName.toLowerCase().includes(search.toLowerCase()) ||
        t.captainName.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-rajdhani font-bold text-3xl text-gold uppercase tracking-wider">
          Team Management
        </h1>
        <p className="font-inter text-muted mt-1">
          Review, approve, or reject team registrations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams or captains..."
            className="w-full bg-surface border border-border rounded-inputs pl-10 pr-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-buttons text-sm font-rajdhani uppercase tracking-wider transition-all duration-200 ${
                filter === f
                  ? "bg-gold text-background"
                  : "bg-surface text-silver border border-border hover:border-glow"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Teams */}
      {filteredTeams.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="font-inter text-muted">No teams found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  expandedTeam === team._id ? "border-glow" : ""
                }`}
                onClick={() =>
                  setExpandedTeam(expandedTeam === team._id ? null : team._id)
                }
              >
                {/* Summary row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Shield className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-rajdhani font-semibold text-lg text-white uppercase tracking-wider">
                        {team.teamName}
                      </h3>
                      <p className="font-inter text-muted text-sm flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {team.captainName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={team.status}>{team.status}</Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedTeam(
                          expandedTeam === team._id ? null : team._id
                        );
                      }}
                      className="p-2 text-muted hover:text-gold-light transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedTeam === team._id && (
                  <div className="mt-6 pt-6 border-t border-border space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gold" />
                        <span className="font-inter text-silver text-sm">
                          {team.captainPhone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gold" />
                        <span className="font-inter text-silver text-sm">
                          {team.captainWhatsApp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gold" />
                        <span className="font-inter text-silver text-sm">
                          {team.captainDiscord}
                        </span>
                      </div>
                    </div>

                    {/* Players */}
                    <div>
                      <h4 className="font-rajdhani text-xs text-silver uppercase tracking-widest mb-3">
                        Main Roster
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {team.players.map((player) => (
                          <div
                            key={player.ign}
                            className="bg-surface-high rounded-md px-3 py-2 border border-border"
                          >
                            <p className="font-inter text-white text-sm truncate">
                              {player.ign}
                            </p>
                            <p className="font-inter text-muted text-xs">
                              {player.mlbbId} · {player.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Substitutes */}
                    {team.substitutes && team.substitutes.length > 0 && (
                      <div>
                        <h4 className="font-rajdhani text-xs text-silver uppercase tracking-widest mb-3">
                          Substitutes
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {team.substitutes.map((player) => (
                            <div
                              key={player.ign}
                              className="bg-surface-high rounded-md px-3 py-2 border border-dashed border-border"
                            >
                              <p className="font-inter text-white text-sm truncate">
                                {player.ign}
                              </p>
                              <p className="font-inter text-muted text-xs">
                                {player.mlbbId} · {player.role}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      {team.status === "pending" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(team._id, "approved");
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-success/20 text-success border border-success/30 rounded-buttons text-sm font-rajdhani uppercase tracking-wider hover:bg-success/30 transition-all"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(team._id, "rejected");
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-danger/20 text-danger border border-danger/30 rounded-buttons text-sm font-rajdhani uppercase tracking-wider hover:bg-danger/30 transition-all"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      {team.status !== "pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(team._id, "pending");
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-buttons text-sm font-rajdhani uppercase tracking-wider hover:bg-yellow-500/30 transition-all"
                        >
                          Reset to Pending
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTeam(team._id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-muted hover:text-danger rounded-buttons text-sm font-rajdhani uppercase tracking-wider transition-all ml-auto"
                      >
                        <XCircle size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
