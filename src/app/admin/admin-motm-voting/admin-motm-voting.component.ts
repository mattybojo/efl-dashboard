import { combineLatest, Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { MotmVote, MotmVotesList } from '../../shared/models/team-picker.model';
import { AuthService } from '../../shared/services/auth.service';
import { TeamPickerService } from '../../shared/services/team-picker.service';
import {
  ViewMotmVotesDialogComponent,
} from '../view-motm-votes-dialog/view-motm-votes-dialog.component';

@Component({
  selector: 'efl-admin-motm-voting',
  templateUrl: './admin-motm-voting.component.html',
  styleUrls: ['./admin-motm-voting.component.scss'],
})
export class AdminMotmVotingComponent implements OnInit, OnDestroy {

  darkTeamPlayers: string[];
  whiteTeamPlayers: string[];
  selectedPlayer: string;
  isSaving: boolean = false;
  motmVotesList: MotmVotesList;
  faSearchPlus = faSearchPlus;

  subscription$: Subscription;

  constructor(private teamPickerService: TeamPickerService, private toastrService: NbToastrService,
    private authService: AuthService, private dialogService: NbDialogService) { }

  ngOnInit() {
    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const motmVotesList$ = this.teamPickerService.getMotmVotes();

    obsArray.push(teamData$);
    obsArray.push(motmVotesList$);

    this.subscription$ = combineLatest(obsArray).subscribe(obs => {
      const pickerData = obs[0][0];
      this.motmVotesList = obs[1];

      this.darkTeamPlayers = pickerData.darkTeam.split(',');
      this.whiteTeamPlayers = pickerData.whiteTeam.split(',');
    });
  }

  selectPlayer(player: string) {
    if (this.selectedPlayer === player) {
      this.selectedPlayer = null;
    } else {
      this.selectedPlayer = player;
    }
  }

  onViewVotes() {
    let motmVotes: MotmVote[] = null;
    if (this.motmVotesList.votes && this.motmVotesList.votes.length > 0) {
      motmVotes = [];
      // Process votes
      this.motmVotesList.votes.split(',').forEach((vote: string) => {
        const tokens = vote.split(':');
        motmVotes.push({ user: tokens[0], vote: tokens[1] });
      });
    }

    this.dialogService.open(ViewMotmVotesDialogComponent, {
      context: {
        data: motmVotes,
      },
    });
  }

  submitVote() {
    const self = this;

    let userName: string = this.authService.getUser().name;
    if (userName) {
      userName = userName.split(' ')[0];
    }

    if (this.motmVotesList.votes === '') {
      this.motmVotesList.votes = `${userName}:${this.selectedPlayer}`;
    } else {
      this.motmVotesList.votes = this.motmVotesList.votes.concat(`,${userName}:${this.selectedPlayer}`);
    }

    this.teamPickerService.submitMotmVote(this.motmVotesList).subscribe(() => {
      self.selectedPlayer = null;
      self.toastrService.success('Thanks for voting!', 'Success!', {
        duration: 3000,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
      });
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
