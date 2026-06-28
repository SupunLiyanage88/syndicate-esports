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
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-chakra uppercase tracking-widest mb-4">
            Rewards
          </span>
          <h2 className="font-russo text-4xl md:text-5xl text-white uppercase tracking-wider">
            Prizes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champion Prize */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Card className="border-2 border-gold/50 hover:border-gold hover:shadow-gold-glow transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gold/10 rounded-buttons border border-gold/20">
                    <Trophy className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-russo text-xl text-gold uppercase tracking-wide mb-2">
                      Champion Team
                    </h3>
                    <p className="font-chakra text-silver text-lg leading-relaxed">
                      5 × MLBB Starlight Memberships
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* MVP Prize */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Card className="border-2 border-primary/50 hover:border-primary hover:shadow-red-glow transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-buttons border border-primary/20">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-russo text-xl text-primary uppercase tracking-wide mb-2">
                      MVP Player
                    </h3>
                    <p className="font-chakra text-silver text-lg leading-relaxed">
                      1 × Starlight Premium Membership
                    </p>
                  </div>
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
          className="text-center text-muted text-sm font-chakra mt-8"
        >
          All prizes delivered digitally within 7 days of the final match.
        </motion.p>
      </div>
    </section>
  );
}
