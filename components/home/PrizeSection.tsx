"use client";

import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PrizeSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-rajdhani font-bold text-4xl text-gold text-center uppercase tracking-wider mb-12"
        >
          Prizes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Card className="border-2 border-gold/50 hover:border-gold transition-colors duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gold/10 rounded-lg">
                  <Trophy className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-rajdhani font-semibold text-xl text-gold-light uppercase tracking-wider mb-2">
                    Champion Team
                  </h3>
                  <p className="font-inter text-silver text-lg leading-relaxed">
                    5 × MLBB Starlight Memberships
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Card className="border-2 border-silver/50 hover:border-silver transition-colors duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-silver/10 rounded-lg">
                  <Star className="w-8 h-8 text-silver" />
                </div>
                <div>
                  <h3 className="font-rajdhani font-semibold text-xl text-silver uppercase tracking-wider mb-2">
                    MVP Player
                  </h3>
                  <p className="font-inter text-silver text-lg leading-relaxed">
                    1 × Starlight Premium Membership
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-muted text-sm font-inter mt-8"
        >
          All prizes delivered digitally within 7 days of the final match.
        </motion.p>
      </div>
    </section>
  );
}
