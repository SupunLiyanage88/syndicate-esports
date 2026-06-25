export interface Player {
  ign: string;
  mlbbId: string;
  role: "Jungle" | "Roam" | "Mid Lane" | "Gold Lane" | "EXP Lane";
}

export interface RegistrationFormData {
  teamName: string;
  teamLogo?: FileList;
  captainName: string;
  captainPhone: string;
  captainWhatsApp: string;
  captainDiscord: string;
  players: Player[];
  substitutes: Player[];
  agreement: boolean;
}

export interface Team {
  _id: string;
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainWhatsApp: string;
  captainDiscord: string;
  players: Player[];
  substitutes: Player[];
  status: "pending" | "approved" | "rejected";
  registeredAt: string;
}

export interface TournamentSchedule {
  registrationDeadline: string;
  groupStage: { start: string; end: string };
  semiFinals: string;
  grandFinal: string;
}

export interface TournamentSettings {
  registrationDeadline: string;
  groupStageStart: string;
  groupStageEnd: string;
  semiFinals: string;
  grandFinal: string;
  maxTeams: number;
  championPrize: string;
  mvpPrize: string;
}

export interface Prize {
  title: string;
  description: string;
  icon: string;
}

export type NavLink = {
  label: string;
  href: string;
};

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface DashboardStats {
  totalTeams: number;
  pendingTeams: number;
  approvedTeams: number;
  rejectedTeams: number;
  slotsFilled: number;
  maxSlots: number;
  daysUntilDeadline: number;
}
