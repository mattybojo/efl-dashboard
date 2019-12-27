export class Match {
  id?: string;
  date: string;
  whiteTeam: Team;
  darkTeam: Team;
  motm: string;
}

export class Team {
  players: string;
  goals: string;
  assists?: string;
  penalties?: string;
}

export class MatchPlayer {
  name: string;
  goals: number;
  assists: number;
  ownGoals: number;
  isCaptain: boolean;
  isMotm: boolean;
}

export class PenaltyTaker {
  name: string;
  scored: boolean;
}

export class AdminPlayerData {
  name: string;
  goals: number;
  assists: number;
}

export class MatchSummary {
  date: string;
  darkTeam: string;
  whiteTeam: string;
  motm: string;
}
