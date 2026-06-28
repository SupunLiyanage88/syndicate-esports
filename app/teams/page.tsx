"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, Clock } from "lucide-react";
import { TeamCard } from "@/components/teams/TeamCard";
import { Team } from "@/lib/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [maxSlots, setMaxSlots] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [teamsRes, settingsRes] = await Promise.all([
          fetch("/api/teams"),
          fetch("/api/settings"),
        ]);
        const teamsData = await teamsRes.json();
        const settingsData = await settingsRes.json();

        if (teamsData.success) {
          setTeams(teamsData.teams);
        }
        if (settingsData.success && settingsData.settings?.maxTeams) {
          setMaxSlots(settingsData.settings.maxTeams);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const approvedTeams = teams.filter((t) => t.status === "approved");
  const pendingTeams = teams.filter((t) => t.status === "pending");

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
            Competitors
          </span>
          <h1 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider mb-4">
            Registered Teams
          </h1>
          <p className="font-chakra text-silver max-w-lg mx-auto">
            {approvedTeams.length} of {maxSlots} slots filled. Join the competition.
          </p>
        </motion.div>

        {teams.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center py-16"
          >
            <Users className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="font-chakra text-muted">
              No teams registered yet. Be the first to sign up!
            </p>
          </motion.div>
        ) : (
          <>
            {approvedTeams.length > 0 && (
              <div className="mb-12">
                <h2 className="font-russo text-xl text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  Confirmed Teams
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedTeams.map((team, index) => (
                    <motion.div
                      key={team._id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <TeamCard team={team} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {pendingTeams.length > 0 && (
              <div>
                <h2 className="font-russo text-xl text-silver uppercase tracking-wide mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-silver" />
                  Pending Review
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingTeams.map((team, index) => (
                    <motion.div
                      key={team._id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <TeamCard team={team} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
