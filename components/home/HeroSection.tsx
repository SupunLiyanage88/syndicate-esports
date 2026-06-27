"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { tournamentSchedule as fallback } from "@/lib/mock-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <Image
              src="/images/Ascendant_logo.png"
              alt="Ascendant League Logo"
              width={140}
              height={140}
              className="drop-shadow-[0_0_30px_rgba(201,162,39,0.4)]"
              priority
            />
            <span className="font-rajdhani font-bold text-4xl md:text-6xl text-gold">X</span>
            <Image
              src="/images/mlbb_logo.png"
              alt="Mobile Legends Bang Bang Logo"
              width={140}
              height={140}
              className="drop-shadow-[0_0_30px_rgba(201,162,39,0.3)]"
              priority
            />
          </div>
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
          <CountdownTimer targetDate={deadline} />
        </motion.div>
      </motion.div>
    </section>
  );
}
