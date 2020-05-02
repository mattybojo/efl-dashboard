import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { AdminPlayerData, Match, Team } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'efl-set-scores-dialog',
  templateUrl: './set-scores-dialog.component.html',
  styleUrls: ['./set-scores-dialog.component.scss'],
})
export class SetScoresDialogComponent implements OnInit, OnDestroy {

  matchData: Match;
  isSaving: boolean;
  darkTeamData: AdminPlayerData[];
  whiteTeamData: AdminPlayerData[];
  darkTeamScore: number;
  whiteTeamScore: number;

  subscription$: Subscription[] = [];

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
      return { name: playerName, goals: goals, assists: assists, ownGoals: 0 };
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
      return { name: playerName, goals: goals, assists: assists, ownGoals: 0 };
    });

    // Populate the form with ownGoals
    this.matchData.darkTeam.goals.split(',').filter(x => x.includes('(OG)')).forEach((scorerName: string) => {
      scorerName = scorerName.substring(0, scorerName.length - 5);
      this.whiteTeamData.find(x => x.name === scorerName).ownGoals++;
      this.darkTeamScore++;
    });

    this.matchData.whiteTeam.goals.split(',').filter(x => x.includes('(OG)')).forEach((scorerName: string) => {
      scorerName = scorerName.substring(0, scorerName.length - 5);
      this.darkTeamData.find(x => x.name === scorerName).ownGoals++;
      this.whiteTeamScore++;
    });
  }

  calculateDarkTeamScore() {
    this.darkTeamScore = this.calculateTeamScore(this.darkTeamData, this.whiteTeamData);
  }

  calculateWhiteTeamScore() {
    this.whiteTeamScore = this.calculateTeamScore(this.whiteTeamData, this.darkTeamData);
  }

  calculateTeamScore(teamData: AdminPlayerData[], oppTeamData: AdminPlayerData[]): number {
    let score: number = 0;
    teamData.forEach((entry: AdminPlayerData) => {
      score += entry.goals;
    });
    oppTeamData.forEach((entry: AdminPlayerData) => {
      score += entry.ownGoals;
    });
    return score;
  }

  formatTeamData(teamPlayerData: AdminPlayerData[], oppTeamPlayerData: AdminPlayerData[]): Team {
    const teamData: Team = new Team();
    let playerString: string = '';
    let goalString: string = '';
    let assistString: string = '';
    let i: number;
    teamPlayerData.forEach((player: AdminPlayerData) => {
      playerString = playerString.concat(`,${player.name}`);
      for (i = 0; i < player.goals; i++) {
        goalString = goalString.concat(`,${player.name}`);
      }
      for (i = 0; i < player.assists; i++) {
        assistString = assistString.concat(`,${player.name}`);
      }
    });
    oppTeamPlayerData.forEach((player: AdminPlayerData) => {
      for (i = 0; i < player.ownGoals; i++) {
        goalString = goalString.concat(`,${player.name} (OG)`);
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
    this.matchData.darkTeam = this.formatTeamData(this.darkTeamData, this.whiteTeamData);
    this.matchData.whiteTeam = this.formatTeamData(this.whiteTeamData, this.darkTeamData);
    this.subscription$.push(
      this.matchService.getMatchByDate(this.matchData.date).subscribe((match: Match) => {
        self.matchData.id = match.id;
        this.subscription$.push(
          self.matchService.updateMatch(self.matchData).subscribe(() => {
            self.isSaving = false;
            self.dialogRef.close();
          }),
        );
      }),
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
