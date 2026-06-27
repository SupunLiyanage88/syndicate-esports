"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Swords, Clock, AlertTriangle, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { tournamentSchedule as fallbackSchedule } from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    icon: Swords,
    title: "Format",
    content: "5v5 Mobile Legends: Bang Bang — Single Elimination bracket. All matches played on mobile or emulator.",
  },
  {
    icon: Users,
    title: "Teams",
    content: "Maximum 8 teams. Registration closes when slots fill or the deadline is reached.",
  },
  {
    icon: Clock,
    title: "Match Rules",
    content: "Matches played on an agreed schedule via in-game custom rooms. Results submitted by team captain via Discord within 30 minutes of match end. No-show after 15 minutes = forfeit.",
  },
];

export default function TournamentPage() {
  const [schedule, setSchedule] = useState(fallbackSchedule);
  const [maxTeams, setMaxTeams] = useState(8);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSchedule({
            registrationDeadline: data.settings.registrationDeadline,
            groupStage: {
              start: data.settings.groupStageStart,
              end: data.settings.groupStageEnd,
            },
            semiFinals: data.settings.semiFinals,
            grandFinal: data.settings.grandFinal,
          });
          setMaxTeams(data.settings.maxTeams || 8);
        }
      } catch {
        // Fallback to mock
      }
    }
    loadSettings();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-rajdhani font-bold text-4xl md:text-5xl text-gold text-center uppercase tracking-wider mb-12"
        >
          Tournament Info
        </motion.h1>

        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-lg">
                    <section.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-rajdhani font-semibold text-xl text-white uppercase tracking-wider mb-3">
                      {section.title}
                    </h2>
                    <p className="font-inter text-silver leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <GoldDivider />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-rajdhani font-semibold text-2xl text-gold uppercase tracking-wider mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            Schedule
          </h2>
          <Card>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-rajdhani font-medium text-white uppercase tracking-wider min-w-[200px]">
                  Registration Deadline:
                </span>
                <span className="font-inter text-gold-light">
                  {formatDate(schedule.registrationDeadline)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-rajdhani font-medium text-white uppercase tracking-wider min-w-[200px]">
                  Group Stage:
                </span>
                <span className="font-inter text-silver">
                  {formatShortDate(schedule.groupStage.start)} — {formatDate(schedule.groupStage.end)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-rajdhani font-medium text-white uppercase tracking-wider min-w-[200px]">
                  Semi-Finals:
                </span>
                <span className="font-inter text-silver">
                  {formatDate(schedule.semiFinals)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-rajdhani font-medium text-white uppercase tracking-wider min-w-[200px]">
                  Grand Final:
                </span>
                <span className="font-inter text-gold-light font-medium">
                  {formatDate(schedule.grandFinal)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-2 border-gold bg-gold/5">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-gold flex-shrink-0" />
              <div>
                <h3 className="font-rajdhani font-semibold text-xl text-gold uppercase tracking-wider mb-2">
                  Registration Closes {formatDate(schedule.registrationDeadline)}
                </h3>
                <p className="font-inter text-silver">
                  Limited to {maxTeams} teams. Secure your spot now.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="font-inter text-muted mb-4">Have questions?</p>
          <Button variant="secondary" asChild>
            <Link href="/contact">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
