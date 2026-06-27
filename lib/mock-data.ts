import { Team, TournamentSchedule } from "./types";

export const mockTeams: Team[] = [
  {
    _id: "1",
    teamName: "Colombo Titans",
    captainName: "Kavinda Perera",
    captainPhone: "+94771234567",
    captainWhatsApp: "+94771234567",
    captainDiscord: "kavinda#1234",
    substitutes: [],
    status: "approved",
    registeredAt: "2026-06-15",
    players: [
      { ign: "TitanSlayer", mlbbId: "12345678", role: "Jungle" },
      { ign: "ShieldWall", mlbbId: "23456789", role: "Roam" },
      { ign: "MagicBurst", mlbbId: "34567890", role: "Mid Lane" },
      { ign: "GoldRush", mlbbId: "45678901", role: "Gold Lane" },
      { ign: "ExpDominator", mlbbId: "56789012", role: "EXP Lane" },
    ],
  },
  {
    _id: "2",
    teamName: "Lion Knights",
    captainName: "Ashan Fernando",
    captainPhone: "+94772345678",
    captainWhatsApp: "+94772345678",
    captainDiscord: "ashan#5678",
    substitutes: [],
    status: "approved",
    registeredAt: "2026-06-16",
    players: [
      { ign: "LionHeart", mlbbId: "87654321", role: "Jungle" },
      { ign: "KnightShield", mlbbId: "76543210", role: "Roam" },
      { ign: "ArcanePower", mlbbId: "65432109", role: "Mid Lane" },
      { ign: "BladeCutter", mlbbId: "54321098", role: "Gold Lane" },
      { ign: "WarriorPath", mlbbId: "43210987", role: "EXP Lane" },
    ],
  },
  {
    _id: "3",
    teamName: "Dragon Eagles",
    captainName: "Nipun Silva",
    captainPhone: "+94773456789",
    captainWhatsApp: "+94773456789",
    captainDiscord: "nipun#9012",
    substitutes: [],
    status: "approved",
    registeredAt: "2026-06-17",
    players: [
      { ign: "DragonFire", mlbbId: "11223344", role: "Jungle" },
      { ign: "EagleEye", mlbbId: "22334455", role: "Roam" },
      { ign: "StormCaller", mlbbId: "33445566", role: "Mid Lane" },
      { ign: "SwiftStrike", mlbbId: "44556677", role: "Gold Lane" },
      { ign: "EarthShaker", mlbbId: "55667788", role: "EXP Lane" },
    ],
  },
  {
    _id: "4",
    teamName: "Kandy Wolves",
    captainName: "Dilshan Rajapaksa",
    captainPhone: "+94774567890",
    captainWhatsApp: "+94774567890",
    captainDiscord: "dilshan#3456",
    substitutes: [],
    status: "pending",
    registeredAt: "2026-06-18",
    players: [
      { ign: "WolfPack", mlbbId: "99887766", role: "Jungle" },
      { ign: "FangStrike", mlbbId: "88776655", role: "Roam" },
      { ign: "MoonBeam", mlbbId: "77665544", role: "Mid Lane" },
      { ign: "SilverArrow", mlbbId: "66554433", role: "Gold Lane" },
      { ign: "IronWill", mlbbId: "55443322", role: "EXP Lane" },
    ],
  },
  {
    _id: "5",
    teamName: "Galle Gladiators",
    captainName: "Ruwan Bandara",
    captainPhone: "+94775678901",
    captainWhatsApp: "+94775678901",
    captainDiscord: "ruwan#7890",
    substitutes: [],
    status: "approved",
    registeredAt: "2026-06-19",
    players: [
      { ign: "GladiatorX", mlbbId: "12121212", role: "Jungle" },
      { ign: "ArenaKing", mlbbId: "23232323", role: "Roam" },
      { ign: "SpellCaster", mlbbId: "34343434", role: "Mid Lane" },
      { ign: "SharpShooter", mlbbId: "45454545", role: "Gold Lane" },
      { ign: "TankMaster", mlbbId: "56565656", role: "EXP Lane" },
    ],
  },
];

export const tournamentSchedule: TournamentSchedule = {
  registrationDeadline: "2026-07-20",
  groupStage: { start: "2026-07-27", end: "2026-08-02" },
  semiFinals: "2026-08-09",
  grandFinal: "2026-08-16",
};

export const prizes = {
  champion: {
    title: "Champion Team",
    description: "5 × MLBB Starlight Memberships",
    icon: "trophy",
  },
  mvp: {
    title: "MVP Player",
    description: "1 × Starlight Premium Membership",
    icon: "star",
  },
};
