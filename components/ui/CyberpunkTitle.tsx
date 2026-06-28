"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CyberpunkTitleProps {
  line1: string;
  line2: string;
}

export function CyberpunkTitle({ line1, line2 }: CyberpunkTitleProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerGlitch();
      }
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Line 1 */}
      <div className="relative">
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider relative z-10"
          animate={{
            x: glitchActive ? [0, -3, 3, -2, 0] : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {line1}
        </motion.h1>

        {/* Cyan ghost */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #00D4FF",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, 4, -2, 0] : 0,
            opacity: glitchActive ? 0.7 : 0,
          }}
          transition={{ duration: 0.12 }}
        >
          {line1}
        </motion.h1>

        {/* Red ghost */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #E63946",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, -4, 2, 0] : 0,
            opacity: glitchActive ? 0.7 : 0,
          }}
          transition={{ duration: 0.12 }}
        >
          {line1}
        </motion.h1>
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
            x: glitchActive ? [0, 3, -3, 1, 0] : 0,
            filter: [
              "drop-shadow(0 0 8px rgba(230, 57, 70, 0.4))",
              "drop-shadow(0 0 20px rgba(230, 57, 70, 0.8))",
              "drop-shadow(0 0 8px rgba(230, 57, 70, 0.4))",
            ],
          }}
          transition={{
            x: { duration: 0.15 },
            filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {line2}
        </motion.h1>

        {/* Cyan ghost */}
        <motion.h1
          className="font-russo text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider absolute inset-0 z-20 pointer-events-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #00D4FF",
            mixBlendMode: "screen",
          }}
          animate={{
            x: glitchActive ? [0, -3, 2, 0] : 0,
            opacity: glitchActive ? 0.6 : 0,
          }}
          transition={{ duration: 0.12 }}
        >
          {line2}
        </motion.h1>
      </div>
    </div>
  );
}
