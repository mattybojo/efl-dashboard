export class TeamPicker {
  id?: string;
  availablePlayers: string;
  whiteTeam: string;
  darkTeam: string;
}

export class TeamData {
  players: string[];
  label: string;
  captain: string;
}

export enum TeamType {
  AVAILABLE = 0,
  MY_TEAM = 1,
  OPP_TEAM = 2,
  DARK_TEAM = 1,
  WHITE_TEAM = 2,
  REMAINING = 3,
}

export class MotmVotesList {
  id?: string;
  votes: string;
}

export class MotmVote {
  id?: string;
  user: string;
  vote: string;
}

export class ResetTeamPickerOptions {
  fieldsetTeamPicker: boolean = true;
  fieldsetChat: boolean = true;
  fieldsetMotm: boolean = true;
  radioMovePlayers: string = 'available';
}

export class MotmVoteTally {
  user: string;
  count: number;
}
