import mongoose, { Schema, Document } from "mongoose";

export interface IBracketTeam {
  teamId: mongoose.Types.ObjectId;
  score: number;
}

export interface IMatch {
  matchId: string;
  position: number;
  team1: IBracketTeam | null;
  team2: IBracketTeam | null;
  winner: mongoose.Types.ObjectId | null;
  isLive: boolean;
  isCompleted: boolean;
  scheduledTime: string | null;
}

export interface IRound {
  name: string;
  roundNumber: number;
  matches: IMatch[];
}

export interface IBracket extends Document {
  tournamentName: string;
  isVisible: boolean;
  isGenerated: boolean;
  rounds: IRound[];
  champion: mongoose.Types.ObjectId | null;
  mvp: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const BracketTeamSchema = new Schema<IBracketTeam>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    score: { type: Number, default: 0 },
  },
  { _id: false }
);

const MatchSchema = new Schema<IMatch>(
  {
    matchId: { type: String, required: true },
    position: { type: Number, required: true },
    team1: { type: BracketTeamSchema, default: null },
    team2: { type: BracketTeamSchema, default: null },
    winner: { type: Schema.Types.ObjectId, ref: "Team", default: null },
    isLive: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    scheduledTime: { type: String, default: null },
  },
  { _id: false }
);

const RoundSchema = new Schema<IRound>(
  {
    name: { type: String, required: true },
    roundNumber: { type: Number, required: true },
    matches: { type: [MatchSchema], required: true },
  },
  { _id: false }
);

const BracketSchema = new Schema<IBracket>(
  {
    tournamentName: { type: String, required: true },
    isVisible: { type: Boolean, default: false },
    isGenerated: { type: Boolean, default: false },
    rounds: { type: [RoundSchema], default: [] },
    champion: { type: Schema.Types.ObjectId, ref: "Team", default: null },
    mvp: { type: Schema.Types.ObjectId, ref: "Team", default: null },
  },
  { timestamps: true }
);

export const Bracket =
  mongoose.models.Bracket || mongoose.model<IBracket>("Bracket", BracketSchema);
