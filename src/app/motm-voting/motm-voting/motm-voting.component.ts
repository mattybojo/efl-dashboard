import { combineLatest, Observable, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import {
  SavePlayerNameDialogComponent,
} from '../../admin/save-player-name-dialog/save-player-name-dialog.component';
import { MotmVotesList, TeamPicker } from '../../shared/models/team-picker.model';
import { UserData } from '../../shared/models/user-data.model';
import { AuthService } from '../../shared/services/auth.service';
import { TeamPickerService } from '../../shared/services/team-picker.service';

@Component({
  selector: 'efl-motm-voting',
  templateUrl: './motm-voting.component.html',
  styleUrls: ['./motm-voting.component.scss'],
})
export class MotmVotingComponent implements OnInit, OnDestroy {

  darkTeamPlayers: string[];
  whiteTeamPlayers: string[];
  selectedPlayer: string;
  isSaving: boolean = false;
  teamData$: Observable<TeamPicker[]>;
  motmVotesList: MotmVotesList;

  subscription$: Subscription[] = [];

  constructor(private teamPickerService: TeamPickerService, private toastrService: NbToastrService,
    private authService: AuthService, private dialogService: NbDialogService) { }

  ngOnInit() {
    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const MotmVotesList$ = this.teamPickerService.getMotmVotes();

    obsArray.push(teamData$);
    obsArray.push(MotmVotesList$);

    this.subscription$.push(
      combineLatest(obsArray).subscribe(obs => {
        const pickerData = obs[0][0];
        this.motmVotesList = obs[1];

        this.darkTeamPlayers = pickerData.darkTeam.split(',');
        this.whiteTeamPlayers = pickerData.whiteTeam.split(',');
      }),
    );
  }

  selectPlayer(player: string) {
    if (this.selectedPlayer === player) {
      this.selectedPlayer = null;
    } else {
      this.selectedPlayer = player;
    }
  }

  submitVote() {
    const self = this;

    let userName: string;
    const userData: UserData = this.authService.getUser();
    if (userData) {
      userName = userData.name.split(' ')[0];
      this.saveVote(userName);
    } else {
      this.subscription$.push(
        this.dialogService.open(SavePlayerNameDialogComponent, {
          context: {
            dialogTitle: 'Verify Your Vote',
            dialogInputLabel: 'Enter your name',
          },
        }).onClose.subscribe(name => name ? self.saveVote(name.trim()) : null),
      );
    }
  }

  saveVote(userName: string) {
    const self = this;
    if (this.motmVotesList.votes === '') {
      this.motmVotesList.votes = `${userName}:${this.selectedPlayer}`;
    } else {
      this.motmVotesList.votes = this.motmVotesList.votes.concat(`,${userName}:${this.selectedPlayer}`);
    }

    this.subscription$.push(
      this.teamPickerService.submitMotmVote(this.motmVotesList).subscribe(() => {
        self.selectedPlayer = null;
        self.toastrService.success('Thanks for voting!', 'Success!', {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
