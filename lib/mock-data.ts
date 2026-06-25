import { Team, TournamentSchedule } from "./types";

export const mockTeams: Team[] = [
  {
    id: "1",
    name: "Colombo Titans",
    captain: "Kavinda Perera",
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
    id: "2",
    name: "Lion Knights",
    captain: "Ashan Fernando",
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
    id: "3",
    name: "Dragon Eagles",
    captain: "Nipun Silva",
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
    id: "4",
    name: "Kandy Wolves",
    captain: "Dilshan Rajapaksa",
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
    id: "5",
    name: "Galle Gladiators",
    captain: "Ruwan Bandara",
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
