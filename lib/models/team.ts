import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainWhatsApp: string;
  captainDiscord: string;
  players: {
    ign: string;
    mlbbId: string;
    role: string;
  }[];
  substitutes: {
    ign: string;
    mlbbId: string;
    role: string;
  }[];
  status: "pending" | "approved" | "rejected";
  registeredAt: Date;
}

const PlayerSchema = new Schema({
  ign: { type: String, required: true },
  mlbbId: { type: String, required: true },
  role: { type: String, required: true, enum: ["Jungle", "Roam", "Mid Lane", "Gold Lane", "EXP Lane"] },
});

const TeamSchema = new Schema<ITeam>({
  teamName: { type: String, required: true, unique: true },
  captainName: { type: String, required: true },
  captainPhone: { type: String, required: true },
  captainWhatsApp: { type: String, required: true },
  captainDiscord: { type: String, required: true },
  players: { type: [PlayerSchema], required: true, validate: [(v: any[]) => v.length === 5, "Exactly 5 players required"] },
  substitutes: { type: [PlayerSchema], default: [] },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  registeredAt: { type: Date, default: Date.now },
});

export const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
