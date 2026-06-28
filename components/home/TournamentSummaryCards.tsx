"use client";

import { motion } from "framer-motion";
import { Trophy, Swords, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

const cards = [
  {
    icon: Trophy,
    title: "Prize Pool",
    description: "5 × Starlight Memberships + MVP Starlight Premium",
    accent: "gold",
  },
  {
    icon: Swords,
    title: "Format",
    description: "5v5 · 8 Teams Max · Single Elimination",
    accent: "primary",
  },
  {
    icon: UserCheck,
    title: "Entry",
    description: "Free Entry · Sri Lanka Teams Only",
    accent: "primary",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function TournamentSummaryCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                className={`h-full border-l-4 ${
                  card.accent === "gold" ? "border-l-gold" : "border-l-primary"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-buttons ${
                      card.accent === "gold" ? "bg-gold/10" : "bg-primary/10"
                    }`}
                  >
                    <card.icon
                      className={`w-6 h-6 ${
                        card.accent === "gold" ? "text-gold" : "text-primary"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-russo text-lg text-white uppercase tracking-wide mb-2">
                      {card.title}
                    </h3>
                    <p className="font-chakra text-silver text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
