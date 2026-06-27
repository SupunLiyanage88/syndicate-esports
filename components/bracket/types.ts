export interface Team {
  id: string;
  name: string;
  logo?: string;
  score?: number;
}

export interface Match {
  id: string;
  round: number;
  position: number;
  team1?: Team;
  team2?: Team;
  winner?: string;
  isLive?: boolean;
  scheduledTime?: string;
}

export interface BracketRound {
  name: string;
  matches: Match[];
}

export interface TournamentBracket {
  rounds: BracketRound[];
}
