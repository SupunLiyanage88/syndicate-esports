import { z } from "zod";

const playerSchema = z.object({
  ign: z
    .string()
    .min(2, "IGN must be at least 2 characters")
    .max(20, "IGN must be at most 20 characters"),
  mlbbId: z
    .string()
    .regex(/^\d+$/, "MLBB ID must be numeric")
    .min(6, "MLBB ID must be at least 6 digits")
    .max(12, "MLBB ID must be at most 12 digits"),
  role: z.enum(["Jungle", "Roam", "Mid Lane", "Gold Lane", "EXP Lane"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

export const registrationSchema = z.object({
  teamName: z
    .string()
    .min(2, "Team name must be at least 2 characters")
    .max(30, "Team name must be at most 30 characters"),
  captainName: z
    .string()
    .min(2, "Captain name is required")
    .max(50, "Captain name is too long"),
  captainPhone: z
    .string()
    .regex(
      /^\+94\d{9}$/,
      "Phone must be in format +94XXXXXXXXX"
    ),
  captainWhatsApp: z
    .string()
    .regex(
      /^\+94\d{9}$/,
      "WhatsApp must be in format +94XXXXXXXXX"
    ),
  captainDiscord: z
    .string()
    .min(2, "Discord ID is required")
    .max(50, "Discord ID is too long"),
  players: z
    .array(playerSchema)
    .length(5, "Exactly 5 main players are required"),
  substitutes: z.array(playerSchema).max(2, "Maximum 2 substitutes allowed"),
  agreement: z.boolean().refine((v) => v === true, {
    message: "You must agree to the tournament rules",
  }),
});

export const settingsUpdateSchema = z.object({
  registrationDeadline: z.string().optional(),
  groupStageStart: z.string().optional(),
  groupStageEnd: z.string().optional(),
  semiFinals: z.string().optional(),
  grandFinal: z.string().optional(),
  maxTeams: z.number().int().min(2).max(64).optional(),
  championPrize: z.string().max(200).optional(),
  mvpPrize: z.string().max(200).optional(),
});

export const bracketUpdateSchema = z.object({
  isVisible: z.boolean().optional(),
  champion: z.string().optional().nullable(),
  mvp: z.string().optional().nullable(),
});

export const matchUpdateSchema = z.object({
  matchId: z.string().min(1, "matchId is required"),
  team1Score: z.number().int().min(0).optional(),
  team2Score: z.number().int().min(0).optional(),
  winnerId: z.string().optional().nullable(),
  isLive: z.boolean().optional(),
  scheduledTime: z.string().optional().nullable(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
