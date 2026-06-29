"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Champion Prize */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-2 border-gold/50 hover:border-gold hover:shadow-gold-glow transition-all duration-300 h-full relative overflow-hidden">
                <div className="relative p-6 flex flex-col items-center">
                  <div className="relative w-full h-[280px] flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-gold/5 rounded-lg" />
                    <Image
                      src="/images/starlight_card.png"
                      alt="Starlight Membership"
                      width={280}
                      height={280}
                      className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(201,162,39,0.3)]"
                    />
                  </div>
                  <h3 className="font-russo text-2xl text-gold uppercase tracking-wide mb-2 text-center">
                    Champion Team
                  </h3>
                  <p className="font-chakra text-silver text-lg text-center">
                    5 × MLBB Starlight Memberships
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* MVP Prize */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-2 border-primary/50 hover:border-primary hover:shadow-red-glow transition-all duration-300 h-full relative overflow-hidden">
                <div className="relative p-6 flex flex-col items-center">
                  <div className="relative w-full h-[280px] flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-primary/5 rounded-lg" />
                    <Image
                      src="/images/starlight_card_premium.png"
                      alt="Starlight Premium Membership"
                      width={280}
                      height={280}
                      className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(230,57,70,0.3)]"
                    />
                  </div>
                  <h3 className="font-russo text-2xl text-primary uppercase tracking-wide mb-2 text-center">
                    MVP Player
                  </h3>
                  <p className="font-chakra text-silver text-lg text-center">
                    1 × Starlight Premium Membership
                  </p>
                </div>
              </Card>
            </motion.div>
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
