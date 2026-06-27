"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, Clock, XCircle, Calendar, Trophy, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface DashboardData {
  totalTeams: number;
  pendingTeams: number;
  approvedTeams: number;
  rejectedTeams: number;
  slotsFilled: number;
  maxSlots: number;
  daysUntilDeadline: number;
  recentTeams: Array<{
    _id: string;
    teamName: string;
    captainName: string;
    status: string;
    registeredAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/teams"),
        fetch("/api/admin/settings"),
      ]);

      const teamsData = await teamsRes.json();
      const settingsData = await settingsRes.json();

      if (teamsData.success && settingsData.success) {
        const teams = teamsData.teams;
        const settings = settingsData.settings;

        const now = new Date();
        const deadline = new Date(settings.registrationDeadline);
        const daysUntilDeadline = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

        setData({
          totalTeams: teams.length,
          pendingTeams: teams.filter((t: any) => t.status === "pending").length,
          approvedTeams: teams.filter((t: any) => t.status === "approved").length,
          rejectedTeams: teams.filter((t: any) => t.status === "rejected").length,
          slotsFilled: teams.filter((t: any) => t.status === "approved").length,
          maxSlots: settings.maxTeams || 8,
          daysUntilDeadline,
          recentTeams: teams.slice(0, 5),
        });
      }
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16">
        <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-4" />
        <p className="font-inter text-muted">{error || "Failed to load data"}</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Teams", value: data.totalTeams, icon: Users, color: "text-gold-light" },
    { label: "Approved", value: data.approvedTeams, icon: CheckCircle, color: "text-success" },
    { label: "Pending", value: data.pendingTeams, icon: Clock, color: "text-yellow-400" },
    { label: "Rejected", value: data.rejectedTeams, icon: XCircle, color: "text-danger" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-rajdhani font-bold text-3xl text-gold uppercase tracking-wider">
          Dashboard
        </h1>
        <p className="font-inter text-muted mt-1">
          Ascendant League Season 1 — Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <p className={`font-rajdhani font-bold text-3xl ${stat.color}`}>
                {stat.value}
              </p>
              <p className="font-inter text-muted text-sm mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Slot usage & Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-gold" />
            <h2 className="font-rajdhani font-semibold text-lg text-white uppercase tracking-wider">
              Slot Usage
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-silver">
                {data.slotsFilled} / {data.maxSlots} slots filled
              </span>
              <span className="text-gold-light">
                {Math.round((data.slotsFilled / data.maxSlots) * 100)}%
              </span>
            </div>
            <div className="w-full bg-surface-high rounded-full h-3 overflow-hidden">
              <div
                className="bg-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${(data.slotsFilled / data.maxSlots) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-gold" />
            <h2 className="font-rajdhani font-semibold text-lg text-white uppercase tracking-wider">
              Registration Deadline
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-gold/30" />
            <div>
              <p className="font-rajdhani font-bold text-2xl text-gold-light">
                {data.daysUntilDeadline} days
              </p>
              <p className="font-inter text-muted text-sm">remaining to register</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Teams */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-gold" />
          <h2 className="font-rajdhani font-semibold text-lg text-white uppercase tracking-wider">
            Recent Registrations
          </h2>
        </div>
        {data.recentTeams.length === 0 ? (
          <p className="font-inter text-muted text-center py-8">No teams registered yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-rajdhani text-xs text-silver uppercase tracking-wider pb-3 pr-4">
                    Team
                  </th>
                  <th className="font-rajdhani text-xs text-silver uppercase tracking-wider pb-3 pr-4">
                    Captain
                  </th>
                  <th className="font-rajdhani text-xs text-silver uppercase tracking-wider pb-3 pr-4">
                    Status
                  </th>
                  <th className="font-rajdhani text-xs text-silver uppercase tracking-wider pb-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentTeams.map((team) => (
                  <tr key={team._id} className="border-b border-border/50 hover:bg-surface-high transition-colors">
                    <td className="py-3 pr-4 font-inter text-white text-sm">{team.teamName}</td>
                    <td className="py-3 pr-4 font-inter text-silver text-sm">{team.captainName}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-rajdhani uppercase tracking-wider ${
                          team.status === "approved"
                            ? "bg-success/20 text-success"
                            : team.status === "rejected"
                            ? "bg-danger/20 text-danger"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {team.status}
                      </span>
                    </td>
                    <td className="py-3 font-inter text-muted text-sm">
                      {new Date(team.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
