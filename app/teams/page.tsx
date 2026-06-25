"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { TeamCard } from "@/components/teams/TeamCard";
import { mockTeams } from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TeamsPage() {
  const approvedTeams = mockTeams.filter((t) => t.status === "approved");
  const pendingTeams = mockTeams.filter((t) => t.status === "pending");

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl text-gold uppercase tracking-wider mb-4">
            Registered Teams
          </h1>
          <p className="font-inter text-silver max-w-lg mx-auto">
            {approvedTeams.length} of 8 slots filled. Join the competition.
          </p>
        </motion.div>

        {/* Approved Teams */}
        {approvedTeams.length > 0 && (
          <div className="mb-12">
            <h2 className="font-rajdhani font-semibold text-xl text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <Users className="w-5 h-5 text-gold" />
              Confirmed Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedTeams.map((team, index) => (
                <motion.div
                  key={team.id}
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

        {/* Pending Teams */}
        {pendingTeams.length > 0 && (
          <div>
            <h2 className="font-rajdhani font-semibold text-xl text-silver uppercase tracking-wider mb-6">
              Pending Review
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingTeams.map((team, index) => (
                <motion.div
                  key={team.id}
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

        {mockTeams.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center py-16"
          >
            <Users className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="font-inter text-muted">
              No teams registered yet. Be the first to sign up!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
