"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Swords,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface BracketTeam {
  id: string;
  name: string;
  score: number;
}

interface BracketMatch {
  matchId: string;
  position: number;
  team1: BracketTeam | null;
  team2: BracketTeam | null;
  winner: string | null;
  isLive: boolean;
  isCompleted: boolean;
  scheduledTime: string | null;
}

interface BracketRound {
  name: string;
  roundNumber: number;
  matches: BracketMatch[];
}

interface Bracket {
  _id: string;
  tournamentName: string;
  isVisible: boolean;
  isGenerated: boolean;
  rounds: BracketRound[];
  champion: string | null;
  mvp: string | null;
}

export default function AdminBracketPage() {
  const [bracket, setBracket] = useState<Bracket | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Edit form state
  const [editForm, setEditForm] = useState({
    team1Score: 0,
    team2Score: 0,
    winnerId: "",
    isLive: false,
    scheduledTime: "",
  });

  useEffect(() => {
    fetchBracket();
  }, []);

  const fetchBracket = async () => {
    try {
      const res = await fetch("/api/admin/bracket");
      const data = await res.json();
      if (data.success) {
        setBracket(data.bracket);
        if (data.bracket?.rounds?.length) {
          setExpandedRound(0);
        }
      }
    } catch (err) {
      console.error("Failed to fetch bracket:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateBracket = async () => {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bracket", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchBracket();
      } else {
        setError(data.error || "Failed to generate bracket");
      }
    } catch (err) {
      setError("Failed to generate bracket");
    } finally {
      setGenerating(false);
    }
  };

  const toggleVisibility = async () => {
    if (!bracket) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bracket", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: !bracket.isVisible }),
      });
      const data = await res.json();
      if (data.success) {
        setBracket({ ...bracket, isVisible: !bracket.isVisible });
      }
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteBracket = async () => {
    if (!confirm("Are you sure you want to delete the bracket? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/bracket", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBracket(null);
      }
    } catch (err) {
      console.error("Failed to delete bracket:", err);
    }
  };

  const startEditing = (match: BracketMatch) => {
    setEditingMatch(match.matchId);
    setEditForm({
      team1Score: match.team1?.score || 0,
      team2Score: match.team2?.score || 0,
      winnerId: match.winner || "",
      isLive: match.isLive,
      scheduledTime: match.scheduledTime || "",
    });
  };

  const saveMatch = async () => {
    if (!editingMatch) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bracket/matches", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: editingMatch,
          team1Score: editForm.team1Score,
          team2Score: editForm.team2Score,
          winnerId: editForm.winnerId || null,
          isLive: editForm.isLive,
          scheduledTime: editForm.scheduledTime || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingMatch(null);
        await fetchBracket();
      }
    } catch (err) {
      console.error("Failed to save match:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-russo text-2xl text-white uppercase tracking-wide">
            Tournament Bracket
          </h1>
          <p className="font-chakra text-sm text-muted mt-1">
            Manage the tournament bracket and match results
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {!bracket?.isGenerated ? (
            <Button
              variant="default"
              onClick={generateBracket}
              disabled={generating}
            >
              <Swords className="w-4 h-4 mr-2" />
              {generating ? "Generating..." : "Generate Bracket"}
            </Button>
          ) : (
            <>
              <Button
                variant={bracket?.isVisible ? "success" : "secondary"}
                onClick={toggleVisibility}
                disabled={saving}
              >
                {bracket?.isVisible ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hidden
                  </>
                )}
              </Button>
              <Button
                variant="danger"
                onClick={deleteBracket}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-danger/50 bg-danger/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-danger" />
            <p className="font-chakra text-sm text-danger">{error}</p>
          </div>
        </Card>
      )}

      {/* No bracket state */}
      {!bracket?.isGenerated && (
        <Card className="py-12">
          <div className="text-center">
            <Swords className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="font-russo text-lg text-white uppercase tracking-wide mb-2">
              No Bracket Generated
            </h3>
            <p className="font-chakra text-sm text-muted mb-6 max-w-md mx-auto">
              Generate a bracket from your approved teams. Make sure you have at least 2 approved teams before generating.
            </p>
            <Button
              variant="default"
              onClick={generateBracket}
              disabled={generating}
            >
              <Swords className="w-4 h-4 mr-2" />
              {generating ? "Generating..." : "Generate Bracket"}
            </Button>
          </div>
        </Card>
      )}

      {/* Bracket Display */}
      {bracket?.isGenerated && (
        <>
          {/* Status Bar */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-chakra text-sm text-muted">Status:</span>
                  <Badge variant={bracket.isVisible ? "approved" : "pending"}>
                    {bracket.isVisible ? "Public" : "Hidden"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-chakra text-sm text-muted">Rounds:</span>
                  <span className="font-chakra text-sm text-white">{bracket.rounds.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-chakra text-sm text-muted">Matches:</span>
                  <span className="font-chakra text-sm text-white">
                    {bracket.rounds.reduce((acc, r) => acc + r.matches.length, 0)}
                  </span>
                </div>
              </div>
              {bracket.champion && (
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="font-chakra text-sm text-gold">Champion set!</span>
                </div>
              )}
            </div>
          </Card>

          {/* Rounds */}
          <div className="space-y-4">
            {bracket.rounds.map((round, roundIndex) => (
              <Card key={round.name}>
                <button
                  onClick={() =>
                    setExpandedRound(expandedRound === roundIndex ? null : roundIndex)
                  }
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-russo text-lg text-white uppercase tracking-wide">
                      {round.name}
                    </h3>
                    <Badge variant="default">
                      {round.matches.filter((m) => m.isCompleted).length}/{round.matches.length}
                    </Badge>
                  </div>
                  {expandedRound === roundIndex ? (
                    <ChevronUp className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted" />
                  )}
                </button>

                {expandedRound === roundIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {round.matches.map((match) => (
                      <div
                        key={match.matchId}
                        className="bg-surface-high rounded-buttons p-4 border border-border"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs text-muted">
                            {match.matchId}
                          </span>
                          <div className="flex items-center gap-2">
                            {match.isLive && (
                              <Badge variant="live">Live</Badge>
                            )}
                            {match.isCompleted && (
                              <Badge variant="approved">Completed</Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(match)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Team 1 */}
                          <div
                            className={`p-3 rounded-buttons border ${
                              match.winner === match.team1?.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                          >
                            <p className="font-chakra text-sm text-white truncate">
                              {match.team1?.name || "TBD"}
                            </p>
                            <p className="font-mono text-lg text-primary">
                              {match.team1?.score ?? "-"}
                            </p>
                          </div>

                          {/* Team 2 */}
                          <div
                            className={`p-3 rounded-buttons border ${
                              match.winner === match.team2?.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            }`}
                          >
                            <p className="font-chakra text-sm text-white truncate">
                              {match.team2?.name || "TBD"}
                            </p>
                            <p className="font-mono text-lg text-primary">
                              {match.team2?.score ?? "-"}
                            </p>
                          </div>
                        </div>

                        {match.scheduledTime && (
                          <div className="flex items-center gap-2 mt-3 text-muted">
                            <Clock className="w-3 h-3" />
                            <span className="font-chakra text-xs">
                              {match.scheduledTime}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Edit Match Modal */}
      {editingMatch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader>
                <CardTitle>Edit Match: {editingMatch}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Team 1 Score */}
                  <div>
                    <label className="font-chakra text-sm text-muted block mb-1">
                      Team 1 Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.team1Score}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          team1Score: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-surface-high border border-border rounded-buttons px-4 py-2 font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Team 2 Score */}
                  <div>
                    <label className="font-chakra text-sm text-muted block mb-1">
                      Team 2 Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.team2Score}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          team2Score: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-surface-high border border-border rounded-buttons px-4 py-2 font-mono text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Winner */}
                  <div>
                    <label className="font-chakra text-sm text-muted block mb-1">
                      Winner
                    </label>
                    <select
                      value={editForm.winnerId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, winnerId: e.target.value })
                      }
                      className="w-full bg-surface-high border border-border rounded-buttons px-4 py-2 font-chakra text-white focus:border-primary focus:outline-none"
                    >
                      <option value="">No winner yet</option>
                      {bracket?.rounds
                        .find((r) =>
                          r.matches.some((m) => m.matchId === editingMatch)
                        )
                        ?.matches.find((m) => m.matchId === editingMatch)
                        ?.team1 && (
                          <option
                            value={
                              bracket.rounds
                                .find((r) =>
                                  r.matches.some((m) => m.matchId === editingMatch)
                                )
                                ?.matches.find(
                                  (m) => m.matchId === editingMatch
                                )?.team1?.id || ""
                            }
                          >
                            {
                              bracket.rounds
                                .find((r) =>
                                  r.matches.some((m) => m.matchId === editingMatch)
                                )
                                ?.matches.find(
                                  (m) => m.matchId === editingMatch
                                )?.team1?.name
                            }
                          </option>
                        )}
                      {bracket?.rounds
                        .find((r) =>
                          r.matches.some((m) => m.matchId === editingMatch)
                        )
                        ?.matches.find((m) => m.matchId === editingMatch)
                        ?.team2 && (
                          <option
                            value={
                              bracket.rounds
                                .find((r) =>
                                  r.matches.some((m) => m.matchId === editingMatch)
                                )
                                ?.matches.find(
                                  (m) => m.matchId === editingMatch
                                )?.team2?.id || ""
                            }
                          >
                            {
                              bracket.rounds
                                .find((r) =>
                                  r.matches.some((m) => m.matchId === editingMatch)
                                )
                                ?.matches.find(
                                  (m) => m.matchId === editingMatch
                                )?.team2?.name
                            }
                          </option>
                        )}
                    </select>
                  </div>

                  {/* Live Toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isLive"
                      checked={editForm.isLive}
                      onChange={(e) =>
                        setEditForm({ ...editForm, isLive: e.target.checked })
                      }
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="isLive" className="font-chakra text-sm text-white">
                      Mark as Live
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setEditingMatch(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={saveMatch}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
