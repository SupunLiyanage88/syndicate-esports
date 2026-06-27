"use client";

import { motion } from "framer-motion";
import { ScrollText, Shield, Clock, AlertTriangle, Users, Trophy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RedDivider } from "@/components/ui/RedDivider";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const rules = [
  {
    icon: Shield,
    title: "General Rules",
    items: [
      "All participants must be residents of Sri Lanka.",
      "Participants must be between 16 and 28 years of age.",
      "Each team must have exactly 5 main players.",
      "Up to 2 substitutes are allowed per team.",
      "All player information must be accurate and verifiable.",
    ],
  },
  {
    icon: Users,
    title: "Team Composition",
    items: [
      "Teams must have a designated captain responsible for all communications.",
      "Captain must be available on Discord throughout the tournament.",
      "Player rosters are locked after the registration deadline.",
      "Substitute players must be registered before the tournament begins.",
    ],
  },
  {
    icon: ScrollText,
    title: "Match Rules",
    items: [
      "All matches are 5v5 Mobile Legends: Bang Bang.",
      "Matches are played in Single Elimination format.",
      "Games are conducted via in-game custom rooms.",
      "Match schedules are agreed upon by team captains.",
      "Results must be submitted by team captains via Discord within 30 minutes of match end.",
    ],
  },
  {
    icon: Clock,
    title: "Schedule & Attendance",
    items: [
      "Teams must be ready to play at the scheduled time.",
      "A 15-minute grace period is allowed for late arrivals.",
      "No-show after 15 minutes results in automatic forfeit.",
      "Rescheduling requests must be made at least 24 hours in advance.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Fair Play",
    items: [
      "No use of cheats, hacks, or third-party software.",
      "No stream sniping or obtaining unfair advantages.",
      "Toxic behavior, harassment, or discrimination results in disqualification.",
      "Decisions by tournament organizers are final.",
    ],
  },
  {
    icon: Trophy,
    title: "Prizes & Rewards",
    items: [
      "Champion team receives 5 × MLBB Starlight Memberships.",
      "MVP player receives 1 × Starlight Premium Membership.",
      "All prizes are delivered digitally within 7 days of the final match.",
      "Prizes are non-transferable and have no cash value.",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest mb-4">
            Official Guidelines
          </span>
          <h1 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider mb-4">
            Tournament Rules
          </h1>
          <p className="font-chakra text-silver max-w-lg mx-auto">
            Please read all rules carefully. By registering, you agree to comply with these regulations.
          </p>
        </motion.div>

        <div className="space-y-6">
          {rules.map((section, index) => (
            <motion.div
              key={section.title}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-buttons border border-primary/20 flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-russo text-xl text-white uppercase tracking-wide mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 font-chakra text-silver text-sm leading-relaxed"
                        >
                          <span className="text-primary mt-1">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
              {index < rules.length - 1 && <RedDivider className="py-2" />}
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="border-2 border-primary/50 bg-primary/5">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-russo text-xl text-primary uppercase tracking-wide mb-2">
                Important Notice
              </h3>
              <p className="font-chakra text-silver max-w-xl mx-auto">
                These rules are subject to change. Any updates will be announced on our Discord server.
                It is your responsibility to stay informed about rule changes.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
