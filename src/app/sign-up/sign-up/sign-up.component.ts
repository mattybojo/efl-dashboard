import { CreateGameSignUpDialogComponent } from './../create-game-sign-up-dialog/create-game-sign-up-dialog.component';
import { PlayerService } from './../../shared/services/player.service';
import { UserData } from './../../shared/models/user-data.model';
import { SignUpRecord } from './../../shared/models/sign-up.model';
import { Lookup } from './../../shared/models/lookup.model';
import { LookupService } from './../../shared/services/lookup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignUpService } from '../../shared/services/sign-up.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { orderBy } from 'lodash';
import { isSameDate } from '../../shared/services/db-utils';
import { AuthService } from '../../shared/services/auth.service';
import { faCalendarCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../../shared/models/player.model';
import { NbToastrService, NbGlobalPhysicalPosition, NbDialogService } from '@nebular/theme';
import { take } from 'rxjs/operators';


@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  faCalendarCheck = faCalendarCheck;
  faPlus = faPlus;
  signUps: SignUpRecord[];
  signUpGames: Lookup[] = [];
  subscription$: Subscription;
  signUpsByDate: SignUpRecord[][] = new Array<SignUpRecord[]>();
  user: UserData;
  player: string[] = [];
  playerList: string[] = [];
  filteredPlayerLists: string[][] = new Array<string[]>();

  daysOfTheWeek: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private lookupService: LookupService, private signUpService: SignUpService,
    private authService: AuthService, private playerService: PlayerService,
    private toastrService: NbToastrService, private dialogService: NbDialogService) { }

  ngOnInit() {
    const self = this;
    // TODO: Should subscribe to the subject instead of retrieving the value only once
    this.user = this.authService.getUser();
    const obsArray: Observable<any>[] = [];

    obsArray.push(this.lookupService.getLookupValues('signUpGame'));
    obsArray.push(this.signUpService.getAllSignUps());
    obsArray.push(this.playerService.getPlayers());

    this.subscription$ = combineLatest(obsArray).subscribe((resp: [Lookup[], SignUpRecord[], Player[]]) => {

      self.signUpsByDate = new Array<SignUpRecord[]>();

      // Order the sign ups
      self.signUpGames = resp[0].sort((a,b) => a.value.localeCompare(b.value));
      self.signUps = orderBy(resp[1], (signUp: SignUpRecord) => signUp.date.seconds, 'asc');

      // Construct an array of signups by game
      self.signUpGames.forEach((gameLookup: Lookup) => {
        // Convert date to YYYY-MM-DD for Safari to sort correctly
        const dateParts: string[] = gameLookup.value.split('-');
        gameLookup.dateString = `${dateParts[2]}/${dateParts[0]}/${dateParts[1]}`;
        gameLookup.date = new Date(gameLookup.dateString);
        self.signUpsByDate.push(self.signUps.filter(x => isSameDate(x.gameDate.toDate(), new Date(gameLookup.dateString))));
      });

      // Only populate the autocomplete list the first time and not on subsequent updates to the observables
      if (!self.playerList || (self.playerList && self.playerList.length === 0)) {
        let signedUpPlayerSet: Set<string>;
        const availablePlayerSet: Set<string> = new Set(resp[2].map(x => x.name));
        self.playerList = Array.from(availablePlayerSet).sort();
        self.signUpsByDate.forEach((signUpRecords: SignUpRecord[], index: number) => {
          signedUpPlayerSet = new Set(signUpRecords.map(x => x.user));
          self.filteredPlayerLists[index] = Array.from(new Set([...availablePlayerSet].filter(x => !signedUpPlayerSet.has(x))).values()).sort();
          if (self.user && self.user.displayName) {
            self.player[index] = self.user.displayName;
          }
        });
      }
    });
  }

  onClickRsvp(index: number) {
    const self = this;
    let isSignedUp: boolean;
    let playerName: string;

    if (this.user && this.user.displayName) {
      playerName = this.user.displayName;
    } else {
      playerName = this.player[index];
    }

    // Do not allow user to sign up if they already are signed up for the specific date
    isSignedUp = this.signUpsByDate[index].find(x => x.user === playerName) !== undefined;

    // Make sure the name matches players already in the system
    if (this.playerList.findIndex(x => x === playerName) === -1) {
      this.toastrService.danger('Make sure your name is spelled correctly before submitting again', 'Name not recognized', {
        duration: 3000,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
      });
      return;
    }

    if (!isSignedUp) {
      this.signUpService.saveUserSignUp(playerName, this.signUpGames[index].date).pipe(take(1)).subscribe(resp => {
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
    this.dialogService.open(CreateGameSignUpDialogComponent);
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
