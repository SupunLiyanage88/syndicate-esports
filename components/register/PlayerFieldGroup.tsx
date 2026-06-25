"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegistrationInput } from "@/lib/validation";

interface PlayerFieldGroupProps {
  index: number;
  register: UseFormRegister<RegistrationInput>;
  errors: FieldErrors<RegistrationInput>;
  label: string;
  isSubstitute?: boolean;
}

const roles = ["Jungle", "Roam", "Mid Lane", "Gold Lane", "EXP Lane"] as const;

export function PlayerFieldGroup({
  index,
  register,
  errors,
  label,
  isSubstitute = false,
}: PlayerFieldGroupProps) {
  const prefix = isSubstitute ? `substitutes.${index}` : `players.${index}`;

  return (
    <div className="bg-surface-high rounded-cards p-4 border border-border">
      <h4 className="font-rajdhani font-medium text-sm text-gold uppercase tracking-widest mb-4">
        {label}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* IGN */}
        <div>
          <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
            IGN / In-Game Name
          </label>
          <input
            type="text"
            {...register(`${prefix}.ign` as const)}
            className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
            placeholder="Enter IGN"
          />
          {errors.players?.[index]?.ign && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.players?.[index]?.ign?.message}
            </p>
          )}
          {isSubstitute && errors.substitutes?.[index]?.ign && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.substitutes?.[index]?.ign?.message}
            </p>
          )}
        </div>

        {/* MLBB ID */}
        <div>
          <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
            MLBB Player ID
          </label>
          <input
            type="text"
            {...register(`${prefix}.mlbbId` as const)}
            className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white placeholder:text-muted focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
            placeholder="Numeric ID"
          />
          {errors.players?.[index]?.mlbbId && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.players?.[index]?.mlbbId?.message}
            </p>
          )}
          {isSubstitute && errors.substitutes?.[index]?.mlbbId && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.substitutes?.[index]?.mlbbId?.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block font-rajdhani text-xs text-silver uppercase tracking-wider mb-2">
            Role
          </label>
          <select
            {...register(`${prefix}.role` as const)}
            className="w-full bg-surface border border-border rounded-inputs px-4 py-3 font-inter text-white focus:outline-none focus:border-glow focus:shadow-gold-glow transition-all duration-200"
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.players?.[index]?.role && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.players?.[index]?.role?.message}
            </p>
          )}
          {isSubstitute && errors.substitutes?.[index]?.role && (
            <p className="text-danger text-xs mt-1 font-inter">
              {errors.substitutes?.[index]?.role?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
