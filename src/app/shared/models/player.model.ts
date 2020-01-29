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
  assists?: number;
}

export class Player {
  id?: string;
  name: string;
}

export class GraphData {
  labels: string[];
  data?: number[];
  datasets?: any[];
}

export class Season {
  name: string;
}
