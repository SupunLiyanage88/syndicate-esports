"use client";

import { motion } from "framer-motion";
import { RegistrationForm } from "@/components/register/RegistrationForm";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl text-gold uppercase tracking-wider mb-4">
            Register Your Team
          </h1>
          <p className="font-inter text-silver max-w-lg mx-auto">
            Complete all fields below. Your registration is reviewed before being listed publicly.
          </p>
        </motion.div>

        <RegistrationForm />
      </div>
    </div>
  );
}
