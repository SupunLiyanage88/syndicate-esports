import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  registrationDeadline: string;
  groupStageStart: string;
  groupStageEnd: string;
  semiFinals: string;
  grandFinal: string;
  maxTeams: number;
  championPrize: string;
  mvpPrize: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
  registrationDeadline: { type: String, required: true },
  groupStageStart: { type: String, required: true },
  groupStageEnd: { type: String, required: true },
  semiFinals: { type: String, required: true },
  grandFinal: { type: String, required: true },
  maxTeams: { type: Number, default: 8 },
  championPrize: { type: String, default: "5 × MLBB Starlight Memberships" },
  mvpPrize: { type: String, default: "1 × Starlight Premium Membership" },
  updatedAt: { type: Date, default: Date.now },
});

export const Settings =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
