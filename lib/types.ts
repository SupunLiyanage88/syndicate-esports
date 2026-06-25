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
  id: string;
  name: string;
  captain: string;
  players: Player[];
  status: "pending" | "approved" | "rejected";
  registeredAt: string;
}

export interface TournamentSchedule {
  registrationDeadline: string;
  groupStage: { start: string; end: string };
  semiFinals: string;
  grandFinal: string;
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
