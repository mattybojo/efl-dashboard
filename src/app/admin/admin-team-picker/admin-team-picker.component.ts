import { SavePlayerNameDialogComponent } from './../save-player-name-dialog/save-player-name-dialog.component';
import { PlayerService } from './../../shared/services/player.service';
import { TeamPicker, TeamType, TeamData } from './../../shared/models/team-picker.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { ChatComponent } from './../../team-picker/shared/chat/chat.component';
import { Player } from './../../shared/models/player.model';
import { TeamPickerService } from './../../shared/services/team-picker.service';
import { faUserCheck, faUserMinus, faUser, faExclamationTriangle, faSave, faUserFriends, faPlus } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';
import { SaveMatchDialogComponent } from '../save-match-dialog/save-match-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-admin-team-picker',
  templateUrl: './admin-team-picker.component.html',
  styleUrls: ['./admin-team-picker.component.scss']
})
export class AdminTeamPickerComponent implements OnInit, OnDestroy {

  @ViewChild('chat', { static: false }) chat: ChatComponent;

  TeamType: TeamType;
  pickerData: TeamPicker;
  teamsData: [TeamData, TeamData, TeamData, TeamData] = [new TeamData(), new TeamData(), new TeamData(), new TeamData()];
  team: string;
  playerCounts: [number, number, number, number] = [0, 0, 0, 0];
  faUserCheck = faUserCheck;
  faUserMinus = faUserMinus;
  faUser = faUser;
  faExclamationTriangle = faExclamationTriangle;
  faSave = faSave;
  faUserFriends = faUserFriends;
  faPlus = faPlus;

  subscription$: Subscription[] = [];

  disableCaptainPicker: boolean = true;

  constructor(private teamPickerService: TeamPickerService, private playerService: PlayerService,
    private dialogService: NbDialogService) {}

  ngOnInit() {
    const self = this;
    let playerList: string[];
    let availableCount: number;
    let darkTeamCount: number;
    let whiteTeamCount: number;
    let playerIndex: number;
    let playersInPool: string[];
    let remainingPlayers: Player[];

    const obsArray: Observable<any>[] = [];

    const teamData$ = this.teamPickerService.getTeamData();
    const players$ = this.playerService.getPlayers();

    obsArray.push(teamData$);
    obsArray.push(players$);

    this.subscription$.push(
      combineLatest(obsArray).subscribe(obs => {
        self.pickerData = obs[0][0];
        remainingPlayers = cloneDeep(obs[1]);
        let teamCaptain: string;

        playerList = self.pickerData.availablePlayers.split(',');
        playerList = (playerList && playerList.length > 0 && playerList[0].length > 0) ? playerList.sort() : null;
        self.teamsData[TeamType.AVAILABLE] = { players: playerList, captain: null, label: 'Available'};
        availableCount = (playerList) ? playerList.length : 0;

        playerList = playerList == null ? [] : playerList;
        playersInPool = playerList.concat(self.pickerData.darkTeam.split(',')).concat(self.pickerData.whiteTeam.split(','));

        playersInPool.forEach((playerName: string) => {
          playerIndex = remainingPlayers.findIndex(player => player.name === playerName);
          if (playerIndex > -1) {
            remainingPlayers.splice(playerIndex, 1);
          }
        });

        self.teamsData[TeamType.REMAINING] = { players: remainingPlayers.map(x => x.name).sort(), captain: null, label: 'Out'};

        playerList = self.pickerData.darkTeam.split(',');
        playerList = (playerList && playerList.length > 0 && playerList[0].length > 0) ? playerList : null;
        teamCaptain = (playerList && playerList[0]) ? playerList[0] : null;
        self.teamsData[TeamType.DARK_TEAM] = { players: playerList, captain: teamCaptain, label: 'Dark Team'};
        darkTeamCount = (playerList) ? playerList.length : 0;

        playerList = self.pickerData.whiteTeam.split(',');
        playerList = (playerList && playerList.length > 0 && playerList[0].length > 0) ? playerList : null;
        teamCaptain = (playerList && playerList[0]) ? playerList[0] : null;
        self.teamsData[TeamType.WHITE_TEAM] = { players: playerList, captain: teamCaptain, label: 'White Team'};
        whiteTeamCount = (playerList) ? playerList.length : 0;

        self.playerCounts = [availableCount, darkTeamCount, whiteTeamCount, remainingPlayers.length];

        if (availableCount >= 2 && (darkTeamCount === 0 && whiteTeamCount === 0)) {
          self.disableCaptainPicker = false;
        } else {
          self.disableCaptainPicker = true;
        }
      }),
    );
  }

  addPlayerToTeam(team: string, player: string): string {
    let newTeam: string;

    if (team && team.length > 0) {
      newTeam = team.concat(`,${player}`);
    } else {
      newTeam = player;
    }

    return newTeam;
  }

  removePlayerFromTeam(team: string, player: string): string {
    let newTeam: string;

    newTeam = team.replace(`${player}`, '');
    newTeam = newTeam.replace(',,', ',');
    if (newTeam.startsWith(',')) {
      newTeam = newTeam.substr(1);
    } else if (newTeam.endsWith(',')) {
      newTeam = newTeam.substr(0, newTeam.length - 1);
    }

    return newTeam;
  }

  onAddPlayer() {
    const self = this;

    this.subscription$.push(
      this.dialogService.open(SavePlayerNameDialogComponent, {
        context: {
          dialogTitle: 'Create New Player',
          dialogInputLabel: 'Enter the new player\'s name'
        }
      }).onClose.subscribe(name => name ? self.playerService.createPlayer(name) : null),
    );
  }

  onPickCaptains() {
    const index1: number = Math.round(Math.random() * (this.playerCounts[0] - 1));
    let index2: number = Math.round(Math.random() * (this.playerCounts[0] - 1));
    while (index1 === index2) {
      index2 = Math.round(Math.random() * (this.playerCounts[0] - 1));
    }
    const player1: string = this.teamsData[0].players[index1];
    const player2: string = this.teamsData[0].players[index2];

    this.pickerData.availablePlayers = this.removePlayerFromTeam(this.pickerData.availablePlayers, player1);
    this.pickerData.availablePlayers = this.removePlayerFromTeam(this.pickerData.availablePlayers, player2);

    this.pickerData.darkTeam = this.addPlayerToTeam(this.pickerData.darkTeam, player1);
    this.pickerData.whiteTeam = this.addPlayerToTeam(this.pickerData.whiteTeam, player2);

    this.teamPickerService.saveTeamData(this.pickerData);
  }

  onResetTeamPicker() {
    this.pickerData.availablePlayers = '';
    this.pickerData.darkTeam = '';
    this.pickerData.whiteTeam = '';

    this.teamPickerService.saveTeamData(this.pickerData);
  }

  onSaveMatch() {
    this.dialogService.open(SaveMatchDialogComponent, {
      context: {
        whiteTeam: this.pickerData.whiteTeam,
        darkTeam: this.pickerData.darkTeam,
      }
    });
  }

  onClick(player: string, fromTeam: TeamType, toTeam: TeamType): void {

    // As long as they're on a "team", remove them from the appropriate place
    switch (fromTeam) {
      case TeamType.AVAILABLE:
        this.pickerData.availablePlayers = this.removePlayerFromTeam(this.pickerData.availablePlayers, player);
        break;
      case TeamType.DARK_TEAM:
        this.pickerData.darkTeam = this.removePlayerFromTeam(this.pickerData.darkTeam, player);
        break;
      case TeamType.WHITE_TEAM:
        this.pickerData.whiteTeam = this.removePlayerFromTeam(this.pickerData.whiteTeam, player);
        break;
    }

    // As long as they're still on a "team", add them to the appropriate place
    switch (toTeam) {
      case TeamType.AVAILABLE:
        this.pickerData.availablePlayers = this.addPlayerToTeam(this.pickerData.availablePlayers, player);
        break;
      case TeamType.DARK_TEAM:
        this.pickerData.darkTeam = this.addPlayerToTeam(this.pickerData.darkTeam, player);
        break;
      case TeamType.WHITE_TEAM:
        this.pickerData.whiteTeam = this.addPlayerToTeam(this.pickerData.whiteTeam, player);
        break;
    }

    // Save to firebase
    this.teamPickerService.saveTeamData(this.pickerData);
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
