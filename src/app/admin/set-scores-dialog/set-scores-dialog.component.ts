import { Component, OnInit } from '@angular/core';
import { Match, AdminPlayerData, Team } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-set-scores-dialog',
  templateUrl: './set-scores-dialog.component.html',
  styleUrls: ['./set-scores-dialog.component.scss']
})
export class SetScoresDialogComponent implements OnInit {

  matchData: Match;
  isSaving: boolean;
  darkTeamData: AdminPlayerData[];
  whiteTeamData: AdminPlayerData[];
  darkTeamScore: number;
  whiteTeamScore: number;

  constructor(private dialogRef: NbDialogRef<SetScoresDialogComponent>, private matchService: MatchService) { }

  ngOnInit() {
    let goals: number;
    let assists: number;

    this.isSaving = false;
    this.darkTeamData = [];
    this.whiteTeamData = [];
    this.whiteTeamScore = 0;
    this.darkTeamScore = 0;

    this.darkTeamData = this.matchData.darkTeam.players.split(',').map((playerName: string) => {
      goals = 0;
      assists = 0;
      this.matchData.darkTeam.goals.split(',').forEach((scorerName: string) => {
        if (scorerName === playerName) {
          goals++;
          this.darkTeamScore++;
        }
      });
      if (this.matchData.darkTeam.assists) {
        this.matchData.darkTeam.assists.split(',').forEach((assistName: string) => {
          if (assistName === playerName) {
            assists++;
          }
        });
      }
      return { name: playerName, goals: goals, assists: assists };
    });

    this.whiteTeamData = this.matchData.whiteTeam.players.split(',').map((playerName: string) => {
      goals = 0;
      assists = 0;
      this.matchData.whiteTeam.goals.split(',').forEach((scorerName: string) => {
        if (scorerName === playerName) {
          goals++;
          this.whiteTeamScore++;
        }
      });
      if (this.matchData.whiteTeam.assists) {
        this.matchData.whiteTeam.assists.split(',').forEach((assistName: string) => {
          if (assistName === playerName) {
            assists++;
          }
        });
      }
      return { name: playerName, goals: goals, assists: assists };
    });
  }

  calculateDarkTeamScore() {
    this.darkTeamScore = this.calculateTeamScore(this.darkTeamData);
  }

  calculateWhiteTeamScore() {
    this.whiteTeamScore = this.calculateTeamScore(this.whiteTeamData);
  }

  calculateTeamScore(data: AdminPlayerData[]): number {
    let score: number = 0;
    data.forEach((entry: AdminPlayerData) => {
      score += entry.goals;
    });
    return score;
  }

  formatTeamData(teamPlayerData: AdminPlayerData[]): Team {
    const teamData: Team = new Team();
    let playerString: string = '';
    let goalString: string = '';
    let assistString: string = '';
    let i: number;
    teamPlayerData.forEach((player: AdminPlayerData) => {
      playerString = playerString.concat(`,${player.name}`);
      for(i = 0; i < player.goals; i++) {
        goalString = goalString.concat(`,${player.name}`);
      }
      for(i = 0; i < player.assists; i++) {
        assistString = assistString.concat(`,${player.name}`);
      }
    });
    teamData.players = playerString.substr(1);
    teamData.goals = goalString.substr(1);
    teamData.assists = assistString.substr(1);
    return teamData;
  }

  onSubmit() {
    this.isSaving = true;
    const self = this;
    this.matchData.darkTeam = this.formatTeamData(this.darkTeamData);
    this.matchData.whiteTeam = this.formatTeamData(this.whiteTeamData);
    this.matchService.getMatchByDate(this.matchData.date).subscribe((match: Match) => {
      self.matchData.id = match.id;
      self.matchService.updateMatch(self.matchData).subscribe(() => {
        self.isSaving = false;
        self.dialogRef.close();
      });
    });
  }
}
