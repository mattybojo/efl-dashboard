import { MotmVotesList, MotmVoteTally, TeamPicker } from './../../shared/models/team-picker.model';
import { TeamPickerService } from './../../shared/services/team-picker.service';
import { ChatService } from './../../shared/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ResetTeamPickerOptions } from '../../shared/models/team-picker.model';
import { take } from 'rxjs/operators';
import { orderBy } from 'lodash';
import { Observable, forkJoin } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'ngx-reset-team-picker-dialog',
  templateUrl: './reset-team-picker-dialog.component.html',
  styleUrls: ['./reset-team-picker-dialog.component.scss']
})
export class ResetTeamPickerDialogComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  resetOptions: ResetTeamPickerOptions = new ResetTeamPickerOptions();
  motmWinners: string = 'N/A';
  voteCount: number;
  pickerData: TeamPicker;
  motmVotesId: string;

  constructor(private dialogRef: NbDialogRef<ResetTeamPickerDialogComponent>,
    private chatService: ChatService, private teamPickerService: TeamPickerService) {}

  ngOnInit() {
    this.teamPickerService.getMotmVotes().pipe(take(1)).subscribe((resp: MotmVotesList) => {
      let voteCountArray: MotmVoteTally[] = [];
      let vote: MotmVoteTally;
      let index: number;
      let name: string;
      let temp: MotmVoteTally;

      // Count the votes
      if (resp.votes.length > 0) {
        resp.votes.split(',').forEach((voteKV: string) => {
          name = voteKV.split(':')[1];

          index = voteCountArray.findIndex(x => x.user === name);

          if (index > -1) {
            vote = voteCountArray[index];
            vote.count++;
            voteCountArray.splice(index, 1, vote);
          } else {
            voteCountArray.push({ user: name, count: 1 });
          }
        });

        if (voteCountArray.length > 0) {
          voteCountArray = orderBy(voteCountArray, ['count'], 'desc');

          vote = voteCountArray[0];
          this.motmWinners = vote.user;
          this.voteCount = vote.count;

          // Find all first place players
          for(index = 1; index < voteCountArray.length; index++) {
            temp = voteCountArray[index];
            if (vote.count === temp.count) {
              this.motmWinners = this.motmWinners.concat(`, ${temp.user}`);
            } else {
              break;
            }
          }
        }
      }
    });
  }

  onClickReset() {
    this.blockUI.start('Clearing data...');

    const obsArray: Observable<any>[] = [];

    // Team Picker segment
    if (this.resetOptions.fieldsetTeamPicker) {
      if (this.resetOptions.radioMovePlayers === 'available') {
        let temp: string = this.pickerData.availablePlayers.concat(',');
        const index: number = this.pickerData.availablePlayers ? 0 : 1;
        if (this.pickerData.darkTeam) {
          temp = temp.concat(`${this.pickerData.darkTeam},`);
        }
        if (this.pickerData.whiteTeam) {
          temp = temp.concat(`${this.pickerData.whiteTeam},`);
        }
        this.pickerData.availablePlayers = temp.substring(index, temp.length - 1);
        this.pickerData.darkTeam = this.pickerData.whiteTeam = '';
      } else {
        // Out
        this.pickerData.availablePlayers = this.pickerData.darkTeam = this.pickerData.whiteTeam = '';
      }
      obsArray.push(this.teamPickerService.saveTeamData(this.pickerData));
    }

    // MOTM
    if (this.resetOptions.fieldsetMotm) {
      obsArray.push(this.teamPickerService.deleteAllMotmVotes());
    }

    // Chat
    if (this.resetOptions.fieldsetChat) {
      obsArray.push(this.chatService.deleteAllChatMessages());
    }

    if (obsArray.length > 0) {
      forkJoin(obsArray).pipe(take(1)).subscribe(() => {
        this.blockUI.stop();
        this.dialogRef.close();
      });
    } else {
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
