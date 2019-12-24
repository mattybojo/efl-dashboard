export class PlayerStats {
  id?: string;
  name: string;
  wins: number;
  captainWins: number;
  goals: number;
  ownGoals: number;
  gamesPlayed: number;
  cleanSheets: number;
  winPct?: number;
}

export class Player {
  id?: string;
  name: string;
}
