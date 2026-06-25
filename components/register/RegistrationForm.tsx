"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { UserPlus, Plus, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { registrationSchema, RegistrationInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlayerFieldGroup } from "./PlayerFieldGroup";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [substituteCount, setSubstituteCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      players: Array(5).fill({ ign: "", mlbbId: "", role: undefined }),
      substitutes: [],
      agreement: false,
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
        <h2 className="font-rajdhani font-bold text-3xl text-gold uppercase tracking-wider mb-4">
          Registration Submitted
        </h2>
        <p className="font-inter text-silver max-w-md mx-auto">
          Your team registration has been received. We will review your submission and get back to you via Discord within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Section A: Team Details */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Card>
          <h3 className="font-rajdhani font-semibold text-xl text-gold uppercase tracking-wider mb-6 flex items-center gap-3">
            <UserPlus className="w-5 h-5" />
            Team Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Name */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Team Name *
              </label>
              <input
                type="text"
                {...register("teamName")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="Enter team name"
              />
              {errors.teamName && (
                <p className="text-danger text-xs mt-1 font-inter">
                  {errors.teamName.message}
                </p>
              )}
            </div>

            {/* Team Logo */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Team Logo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("teamLogo")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white file:mr-4 file:py-2 file:px-4 file:rounded-buttons file:border-0 file:bg-gold file:text-background file:font-rajdhani file:font-semibold file:uppercase file:text-sm file:cursor-pointer hover:file:bg-gold-light transition-all duration-200"
              />
            </div>

            {/* Captain Name */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Captain Name *
              </label>
              <input
                type="text"
                {...register("captainName")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="Enter captain name"
              />
              {errors.captainName && (
                <p className="text-danger text-xs mt-1 font-inter">
                  {errors.captainName.message}
                </p>
              )}
            </div>

            {/* Captain Phone */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Captain Phone Number *
              </label>
              <input
                type="text"
                {...register("captainPhone")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="+94XXXXXXXXX"
              />
              {errors.captainPhone && (
                <p className="text-danger text-xs mt-1 font-inter">
                  {errors.captainPhone.message}
                </p>
              )}
            </div>

            {/* Captain WhatsApp */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Captain WhatsApp *
              </label>
              <input
                type="text"
                {...register("captainWhatsApp")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="+94XXXXXXXXX"
              />
              {errors.captainWhatsApp && (
                <p className="text-danger text-xs mt-1 font-inter">
                  {errors.captainWhatsApp.message}
                </p>
              )}
            </div>

            {/* Captain Discord */}
            <div>
              <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
                Captain Discord ID *
              </label>
              <input
                type="text"
                {...register("captainDiscord")}
                className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
                placeholder="username#0000"
              />
              {errors.captainDiscord && (
                <p className="text-danger text-xs mt-1 font-inter">
                  {errors.captainDiscord.message}
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section B: Main Roster */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
        <div className="mb-4">
          <h3 className="font-rajdhani font-semibold text-xl text-gold uppercase tracking-wider">
            Main Roster (5 Players)
          </h3>
          <p className="font-inter text-muted text-sm mt-1">
            All 5 players are required for registration.
          </p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <PlayerFieldGroup
              key={`player-${index}`}
              index={index}
              register={register}
              errors={errors}
              label={`Player ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Section C: Substitutes */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-rajdhani font-semibold text-xl text-gold uppercase tracking-wider">
              Substitutes (Optional)
            </h3>
            <p className="font-inter text-muted text-sm mt-1">
              Up to 2 substitute players allowed.
            </p>
          </div>
          {substituteCount < 2 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSubstituteCount((prev) => prev + 1)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Substitute
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {Array.from({ length: substituteCount }).map((_, index) => (
            <div key={`substitute-${index}`} className="relative">
              <PlayerFieldGroup
                index={index}
                register={register}
                errors={errors}
                label={`Substitute ${index + 1}`}
                isSubstitute
              />
              <button
                type="button"
                onClick={() => setSubstituteCount((prev) => prev - 1)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-danger transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section D: Agreement */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <Card>
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              {...register("agreement")}
              id="agreement"
              className="mt-1 w-5 h-5 bg-surface border border-border rounded focus:outline-none focus:border-glow focus:shadow-gold-glow cursor-pointer"
            />
            <label htmlFor="agreement" className="font-inter text-silver cursor-pointer">
              I confirm all player information is accurate and I agree to the{" "}
              <a href="/rules" className="text-gold hover:text-gold-light underline">
                tournament rules
              </a>
              .
            </label>
          </div>
          {errors.agreement && (
            <p className="text-danger text-xs mt-2 font-inter ml-9">
              {errors.agreement.message}
            </p>
          )}
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Registration"
          )}
        </Button>
      </motion.div>
    </form>
  );
}
