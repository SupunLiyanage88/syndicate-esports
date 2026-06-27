"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { CyberpunkTitle } from "@/components/ui/CyberpunkTitle";
import { tournamentSchedule as fallback } from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export function HeroSection() {
  const [deadline, setDeadline] = useState(fallback.registrationDeadline);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.registrationDeadline) {
          setDeadline(data.settings.registrationDeadline);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,57,70,0.12)_0%,transparent_60%)]" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ x: `${10 + Math.random() * 80}%`, y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear",
            }}
          />
        ))}
        {/* Cyan particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cyan-${i}`}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
            initial={{ x: `${10 + Math.random() * 80}%`, y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16"
      >
        {/* Tournament Logos */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Image
                src="/images/Ascendant_logo.png"
                alt="Ascendant League Logo"
                width={120}
                height={120}
                className="relative drop-shadow-[0_0_30px_rgba(230,57,70,0.5)]"
                priority
              />
            </motion.div>
            <motion.span
              className="font-russo text-4xl md:text-5xl text-primary neon-text"
              animate={{
                textShadow: [
                  "0 0 5px #E63946, 0 0 10px #E63946",
                  "0 0 20px #E63946, 0 0 40px #E63946, 0 0 60px #00D4FF",
                  "0 0 5px #E63946, 0 0 10px #E63946",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              VS
            </motion.span>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Image
                src="/images/mlbb_logo.png"
                alt="Mobile Legends Bang Bang Logo"
                width={120}
                height={120}
                className="relative drop-shadow-[0_0_30px_rgba(230,57,70,0.4)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Season Badge */}
        <motion.div variants={fadeInUp} className="mb-6">
          <motion.span
            className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-chakra uppercase tracking-widest"
            animate={{
              boxShadow: [
                "0 0 10px rgba(230, 57, 70, 0.2)",
                "0 0 25px rgba(230, 57, 70, 0.5), inset 0 0 15px rgba(230, 57, 70, 0.1)",
                "0 0 10px rgba(230, 57, 70, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Season 1 Grand Tournament
          </motion.span>
        </motion.div>

        {/* Cyberpunk Title */}
        <motion.div variants={fadeInUp} className="mb-6">
          <CyberpunkTitle line1="ASCENDANT" line2="LEAGUE" />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="font-chakra font-medium text-xl md:text-2xl text-silver uppercase tracking-widest mb-6"
        >
          MLBB 5v5 Championship
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="font-chakra text-muted max-w-lg mx-auto mb-10 text-base leading-relaxed"
        >
          Sri Lanka&apos;s premier team-based Mobile Legends competition. Register now. Prove your worth.
          Only the best will ascend.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(230, 57, 70, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="default" size="lg" asChild>
              <Link href="/register">Register Your Team</Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(230, 57, 70, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="secondary" size="lg" asChild>
              <Link href="/tournament">View Tournament Info</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={fadeInUp}>
          <CountdownTimer targetDate={deadline} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
