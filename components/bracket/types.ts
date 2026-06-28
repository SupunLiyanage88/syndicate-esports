export interface Team {
  id?: string;
  teamId?: string;
  name?: string;
  teamName?: string;
  logo?: string;
  score?: number;
}

export interface Match {
  id?: string;
  matchId?: string;
  round: number;
  position: number;
  team1?: Team;
  team2?: Team;
  winner?: string;
  isLive?: boolean;
  isCompleted?: boolean;
  scheduledTime?: string;
}

export interface BracketRound {
  name: string;
  roundNumber?: number;
  matches: Match[];
}

export interface TournamentBracket {
  _id?: string;
  tournamentName?: string;
  isVisible?: boolean;
  isGenerated?: boolean;
  rounds: BracketRound[];
  champion?: string | null;
  mvp?: string | null;
}
