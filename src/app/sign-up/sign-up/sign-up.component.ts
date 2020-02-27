import { orderBy } from 'lodash';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faCalendarCheck, faCalendarTimes, faEdit, faFileExport, faPlus, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import {
  ConfirmDialogComponent,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { FieldLocation, Lookup } from '../../shared/models/lookup.model';
import { Player } from '../../shared/models/player.model';
import { SignUpRecord } from '../../shared/models/sign-up.model';
import { TeamPicker } from '../../shared/models/team-picker.model';
import { UserData } from '../../shared/models/user-data.model';
import { AuthService } from '../../shared/services/auth.service';
import { createDateFromString, isSameDate } from '../../shared/services/db-utils';
import { LookupService } from '../../shared/services/lookup.service';
import { PlayerService } from '../../shared/services/player.service';
import { SignUpService } from '../../shared/services/sign-up.service';
import { TeamPickerService } from '../../shared/services/team-picker.service';
import {
  CreateGameSignUpDialogComponent,
} from '../create-game-sign-up-dialog/create-game-sign-up-dialog.component';

@Component({
  selector: 'efl-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCalendarTimes = faCalendarTimes;
  faCalendarCheck = faCalendarCheck;
  faPlus = faPlus;
  faFileExport = faFileExport;
  signUps: SignUpRecord[];
  signUpGames: Lookup[] = [];
  subscription$: Subscription;
  deleteSubscription$: Subscription;
  signUpsByDate: SignUpRecord[][] = new Array<SignUpRecord[]>();
  user: UserData;
  player: string[] = [];
  playerList: string[] = [];
  fieldList: FieldLocation[];

  constructor(private lookupService: LookupService, private signUpService: SignUpService,
    private authService: AuthService, private playerService: PlayerService,
    private toastrService: NbToastrService, private dialogService: NbDialogService,
    private teamPickerService: TeamPickerService) { }

  ngOnInit() {
    const self = this;
    // TODO: Should subscribe to the subject instead of retrieving the value only once
    this.user = this.authService.getUser();
    const obsArray: Observable<any>[] = [];

    obsArray.push(this.lookupService.getLookupValues('signUpGame'));
    obsArray.push(this.signUpService.getAllSignUps());
    obsArray.push(this.playerService.getPlayers());
    obsArray.push(this.lookupService.getLookupValues('fieldLocation'));

    this.subscription$ = combineLatest(obsArray).subscribe((resp: [Lookup[], SignUpRecord[], Player[], Lookup[]]) => {

      self.signUpsByDate = new Array<SignUpRecord[]>();
      self.fieldList = [];

      resp[3].sort((a, b) => a.value.localeCompare(b.value)).forEach((fieldLocation: Lookup) => {
        const fieldParts: string[] = fieldLocation.value.split(';');
        self.fieldList.push({ name: fieldParts[0], address: fieldParts[1] });
      });

      // Order the sign ups
      self.signUpGames = resp[0].sort((a, b) => a.value.localeCompare(b.value));
      self.signUps = orderBy(resp[1], (signUp: SignUpRecord) => signUp.date, 'asc');

      // Construct an array of signups by game
      self.signUpGames.forEach((gameLookup: Lookup) => {
        const valueParts: string[] = gameLookup.value.split(';');
        let parts: string[] = valueParts[0].split(/[^0-9]/);
        const newDate: Date = new Date(+parts[0], +parts[1] - 1, +parts[2], +parts[3], +parts[4], +parts[5]);
        gameLookup.date = newDate;
        gameLookup.field = { name: valueParts[1], address: self.fieldList.find(x => x.name === valueParts[1]).address };
        self.signUpsByDate.push(self.signUps.filter(x => {
          parts = x.gameDate.split(/[^0-9]/);
          const newGameDate: Date = new Date(+parts[0], +parts[1] - 1, +parts[2], +parts[3], +parts[4], +parts[5]);
          return isSameDate(newGameDate, gameLookup.date);
        }));
      });

      // Only populate the autocomplete list the first time and not on subsequent updates to the observables
      if (!self.playerList || (self.playerList && self.playerList.length === 0)) {
        self.playerList = resp[2].map(x => x.name).sort();
        self.updateSignUpDropdowns();
      }
    });
  }

  openUrl(address: string) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
  }

  updateSignUpDropdowns() {
    this.signUpsByDate.forEach((signUpRecords: SignUpRecord[], index: number) => {
      if (this.user && this.user.displayName) {
        this.player[index] = this.user.displayName;
      }
    });
  }

  onClickRsvp(index: number, isPlaying: boolean) {
    const self = this;
    let isSignedUp: boolean = false;
    let recordId: string;

    // Do not allow user to sign up if they already are signed up for the specific date
    const signUpRecord: SignUpRecord = this.signUpsByDate[index].find(x => x.user === this.player[index]);
    if (signUpRecord) {
      recordId = signUpRecord.id;
      isSignedUp = (signUpRecord.isPlaying === isPlaying);
    }

    if (!isSignedUp) {
      this.signUpService.saveUserSignUp(this.player[index], this.signUpGames[index].value.split(';')[0], isPlaying, recordId).pipe(take(1)).subscribe(resp => {
        self.toastrService.success('Successfully signed up!', 'Success', {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
      });
    } else {
      // Show toast saying already signed in
      this.toastrService.primary('You have already signed up for this game!', 'Already signed up', {
        duration: 3000,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
      });
    }
  }

  createGameSignUp() {
    this.dialogService.open(CreateGameSignUpDialogComponent, {
      context : {
        fieldList: this.fieldList,
      },
    });
  }

  onClickEdit(index: number) {
    this.dialogService.open(CreateGameSignUpDialogComponent, {
      context: {
        isoDateString: this.signUpGames[index].value,
        id: this.signUpGames[index].id,
        selectedField: this.signUpGames[index].field,
        fieldList: this.fieldList,
      },
    });
  }

  onClickDelete(index: number) {
    const self = this;
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        dialogTitle: 'Delete this sign-up?',
        confirmMessage: 'Are you sure you want to delete this match?',
      },
    }).onClose.pipe(take(1)).subscribe((resp: boolean) => {
      if (resp) {
        const obsArray: Observable<any>[] = [];
        obsArray.push(self.signUpService.deleteSignUpsByDate(createDateFromString(this.signUpGames[index].value)));
        obsArray.push(self.lookupService.deleteLookupValue(self.signUpGames[index].id));

        self.deleteSubscription$ = combineLatest(obsArray).pipe(take(1)).subscribe(resp => {
          self.toastrService.success('Successfully deleted the game and sign-ups!', 'Success', {
            duration: 3000,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          });
        });
      }
    });
  }

  onClickMoveToTeamPicker(index: number) {
    const self = this;
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        dialogTitle: 'Copy to Team Picker?',
        confirmMessage: 'Moving this data will overwrite any existing data in the Team Picker.',
      },
    }).onClose.pipe(take(1)).subscribe((onCloseResp: boolean) => {
      if (onCloseResp) {
        self.teamPickerService.getTeamData().pipe(take(1)).subscribe((teamDataResp: TeamPicker[]) => {
          const tpData: TeamPicker = teamDataResp[0];
          tpData.darkTeam = tpData.whiteTeam = '';

          let isPlayingList: string[] = self.signUpsByDate[index].filter(x => x.isPlaying).map(x => x.user);
          if (isPlayingList.length > 22) {
            isPlayingList = isPlayingList.slice(0, 22);
          }

          tpData.availablePlayers = isPlayingList.join(',');

          self.teamPickerService.saveTeamData(tpData).pipe(take(1)).subscribe(() => {
            self.toastrService.success('Successfully moved the sign-ups to the Team Picker!', 'Success', {
              duration: 3000,
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
            });
          });
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
    if (this.deleteSubscription$) {
      this.deleteSubscription$.unsubscribe();
    }
  }
}
