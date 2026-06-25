"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { tournamentSchedule } from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
      
      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <Image
            src="/images/Ascendant_logo.png"
            alt="Syndicate Esports Logo"
            width={180}
            height={180}
            className="mx-auto drop-shadow-[0_0_30px_rgba(201,162,39,0.4)]"
            priority
          />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="font-rajdhani font-bold text-5xl md:text-7xl text-gold-light uppercase tracking-[0.15em] mb-4"
        >
          Ascendant League
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="font-rajdhani font-medium text-xl text-silver uppercase tracking-widest mb-6"
        >
          Season 1 — MLBB 5v5 Tournament
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="font-inter text-muted max-w-lg mx-auto mb-10 text-base leading-relaxed"
        >
          Sri Lanka&apos;s premier team-based Mobile Legends competition. Register now. Prove your worth.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="default" size="lg" asChild>
            <Link href="/register">Register Your Team</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/tournament">View Tournament Info</Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <CountdownTimer targetDate={tournamentSchedule.registrationDeadline} />
        </motion.div>
      </motion.div>
    </section>
  );
}
