"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CyberpunkTitleProps {
  line1: string;
  line2: string;
}

export function CyberpunkTitle({ line1, line2 }: CyberpunkTitleProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch bursts
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Main title */}
      <div className="relative">
        {/* Layer 1: Base text */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider relative z-10"
          animate={{
            x: glitchActive ? [0, -3, 3, -2, 0] : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {line1}
        </motion.h1>

        {/* Layer 2: Cyan ghost (chromatic aberration) */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #00D4FF",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, 4, -2, 3, 0] : [0, 1, -1, 0],
            opacity: glitchActive ? 0.8 : 0.15,
          }}
          transition={{ duration: glitchActive ? 0.1 : 3, repeat: glitchActive ? 0 : Infinity }}
        >
          {line1}
        </motion.h1>

        {/* Layer 3: Red ghost (chromatic aberration) */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #E63946",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, -4, 2, -3, 0] : [0, -1, 1, 0],
            opacity: glitchActive ? 0.8 : 0.15,
          }}
          transition={{ duration: glitchActive ? 0.1 : 3, repeat: glitchActive ? 0 : Infinity }}
        >
          {line1}
        </motion.h1>

        {/* Glitch slice 1 */}
        {glitchActive && (
          <div
            className="absolute inset-0 z-30 overflow-hidden pointer-events-none"
            style={{
              clipPath: `polygon(0 ${20 + Math.random() * 30}%, 100% ${20 + Math.random() * 30}%, 100% ${50 + Math.random() * 20}%, 0 ${50 + Math.random() * 20}%)`,
            }}
          >
            <h1 className="font-russo text-5xl md:text-7xl lg:text-8xl text-primary uppercase tracking-wider">
              {line1}
            </h1>
          </div>
        )}
      </div>

      {/* Line 2 with gradient */}
      <div className="relative">
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider relative z-10"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #E63946 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            x: glitchActive ? [0, 2, -3, 1, 0] : 0,
            filter: [
              "drop-shadow(0 0 10px rgba(230, 57, 70, 0.5))",
              "drop-shadow(0 0 30px rgba(230, 57, 70, 0.9))",
              "drop-shadow(0 0 10px rgba(230, 57, 70, 0.5))",
            ],
          }}
          transition={{
            x: { duration: 0.15 },
            filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {line2}
        </motion.h1>

        {/* Layer 2: Cyan ghost */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #00D4FF",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, -3, 2, -1, 0] : [0, -1, 1, 0],
            opacity: glitchActive ? 0.7 : 0.1,
          }}
          transition={{ duration: glitchActive ? 0.1 : 4, repeat: glitchActive ? 0 : Infinity }}
        >
          {line2}
        </motion.h1>

        {/* Glitch slice 2 */}
        {glitchActive && (
          <div
            className="absolute inset-0 z-30 overflow-hidden pointer-events-none"
            style={{
              clipPath: `polygon(0 ${40 + Math.random() * 20}%, 100% ${40 + Math.random() * 20}%, 100% ${70 + Math.random() * 20}%, 0 ${70 + Math.random() * 20}%)`,
            }}
          >
            <h1
              className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider"
              style={{
                background: "linear-gradient(180deg, #00D4FF 0%, #E63946 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {line2}
            </h1>
          </div>
        )}
      </div>

      {/* Scan line overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
        animate={{ opacity: glitchActive ? 0.4 : 0.05 }}
        transition={{ duration: 0.1 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 212, 255, 0.1) 2px,
              rgba(0, 212, 255, 0.1) 4px
            )`,
          }}
        />
      </motion.div>

      {/* Flicker overlay */}
      {glitchActive && (
        <motion.div
          className="absolute inset-0 bg-primary/10 pointer-events-none z-50"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
}
