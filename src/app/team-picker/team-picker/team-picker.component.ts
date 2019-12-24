import { ChatComponent } from './../shared/chat/chat.component';
import { TeamPickerService } from '../../shared/services/team-picker.service';
import { TeamPicker, TeamData, TeamType } from './../../shared/models/team-picker.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.scss']
})
export class TeamPickerComponent implements OnInit {

  @ViewChild('chat', { static: false }) chat: ChatComponent;

  TeamType: TeamType;
  pickerData: TeamPicker;
  teamsData: [TeamData, TeamData, TeamData] = [new TeamData(), new TeamData(), new TeamData()];
  isConfirmDisabled: boolean = true;
  team: string;
  teamData$: Observable<TeamPicker[]>;
  playerCounts: [number, number, number];
  showConfirmBtn: boolean = false;

  constructor(private teamPickerService: TeamPickerService) {}

  ngOnInit() {
    const url: string = window.location.href;
    let myTeam: string;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      myTeam = httpParams.get('team');
      this.team = (myTeam === 'white' || myTeam === 'dark') ? myTeam : null;
    }
    this.processTeamPickerResponse();
  }

  processTeamPickerResponse(): void {
    let playerList: string[];
    let availableCount: number;
    let myTeamCount: number;
    let oppTeamCount: number;

    this.teamData$ = this.teamPickerService.getTeamData()
      .pipe(
        tap((teamPicker: TeamPicker[]) => {
          this.pickerData = teamPicker[0];

          playerList = this.pickerData.availablePlayers.split(',');
          playerList = (playerList && playerList.length > 0 && playerList[0].length > 0) ? playerList : null;
          this.teamsData[TeamType.AVAILABLE] = { players: playerList, captain: null, label: 'Available'};
          availableCount = (playerList) ? playerList.length : 0;

          if (this.team === 'white') {
            playerList = this.pickerData.whiteTeam.split(',');
            this.teamsData[TeamType.MY_TEAM] = { players: playerList, captain: playerList[0], label: 'White Team'};
            myTeamCount = playerList.length;
            playerList = this.pickerData.darkTeam.split(',');
            this.teamsData[TeamType.OPP_TEAM] = { players: playerList, captain: playerList[0], label: 'Dark Team'};
            oppTeamCount = playerList.length;

          } else if (this.team === 'dark' || !this.team) {
            playerList = this.pickerData.darkTeam.split(',');
            this.teamsData[TeamType.MY_TEAM] = { players: playerList, captain: playerList[0], label: 'Dark Team'};
            myTeamCount = playerList.length;
            playerList = this.pickerData.whiteTeam.split(',');
            this.teamsData[TeamType.OPP_TEAM] = { players: playerList, captain: playerList[0], label: 'White Team'};
            oppTeamCount = playerList.length;
          }

          this.playerCounts = [availableCount, myTeamCount, oppTeamCount];

          if (this.team === 'white' || this.team === 'dark') {
            this.showConfirmBtn = true;
            this.isConfirmDisabled = this.isPickDisabled();
          }
        })
      );
  }

  private isPickDisabled(): boolean {
    // Dark team picks first -- dark will always have the same or more players
    let isDisabled: boolean = true;
    if (this.team === 'white' && this.playerCounts[TeamType.MY_TEAM] < this.playerCounts[TeamType.OPP_TEAM]) {
      isDisabled = false;
    }
    if (this.team === 'dark' && this.playerCounts[TeamType.MY_TEAM] === this.playerCounts[TeamType.OPP_TEAM]) {
      isDisabled = false;
    }

    // TODO: Handle goalie picks -- available players == 2
    // Disable goalies from selection unless they are the only ones left

    return isDisabled;
  }

  onSubmit(player: string): void {
    // Disable button
    this.isConfirmDisabled = true;

    const self = this;

    let availablePlayerList: string = this.pickerData.availablePlayers;

    if (this.team === 'white') {
      this.pickerData.whiteTeam = this.pickerData.whiteTeam.concat(`,${player}`);
    } else if (this.team === 'dark') {
      this.pickerData.darkTeam = this.pickerData.darkTeam.concat(`,${player}`);
    }

    availablePlayerList = availablePlayerList.replace(`${player}`, '');
    availablePlayerList = availablePlayerList.replace(',,', ',');
    if (availablePlayerList.startsWith(',')) {
      availablePlayerList = availablePlayerList.substr(1);
    } else if (availablePlayerList.endsWith(',')) {
      availablePlayerList = availablePlayerList.substr(0, availablePlayerList.length - 1);
    }
    this.pickerData.availablePlayers = availablePlayerList;

    // Save to firebase
    if (!this.isPickDisabled()) {
      this.teamPickerService.saveTeamData(this.pickerData).subscribe(() => {
        self.chat.sendMessage('system', `${self.teamsData[TeamType.MY_TEAM].captain} selected ${player}`);
      });
    }
  }
}
