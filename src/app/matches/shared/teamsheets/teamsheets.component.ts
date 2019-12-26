import { CellValueFormatterComponent } from './../cell-value-formatter/cell-value-formatter.component';
import { MatchPlayer, PenaltyTaker, Match } from './../../../shared/models/match.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'efl-teamsheets',
  templateUrl: './teamsheets.component.html',
  styleUrls: ['./teamsheets.component.scss']
})
export class TeamsheetsComponent implements OnInit {

  darkSettings: Object = {
    columns: {
      name: {
        title: 'Name',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'name';
        },
      },
      goals: {
        title: 'Goals',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'goals';
        },
      },
      assists: {
        title: 'Assists',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'assists';
        },
      },
    },
  };

  whiteSettings: Object = {
    columns: {
      assists: {
        title: 'Assists',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'white';
          instance.type = 'assists';
        },
      },
      goals: {
        title: 'Goals',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'white';
          instance.type = 'goals';
        },
      },
      name: {
        title: 'Name',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'white';
          instance.type = 'name';
        },
      },
    },
  };

  darkPenaltySettings: Object = {
    columns: {
      name: {
        title: 'Name',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'value';
        },
      },
      scored: {
        title: 'Scored',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'penalty';
        },
      },
    },
  };

  whitePenaltySettings: Object = {
    columns: {
      scored: {
        title: 'Scored',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'penalty';
        },
      },
      name: {
        title: 'Name',
        type: 'custom',
        filter: false,
        renderComponent: CellValueFormatterComponent,
        onComponentInitFunction: (instance: CellValueFormatterComponent) => {
          instance.team = 'dark';
          instance.type = 'value';
        },
      },
    },
  };

  defaultSettings: Object = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: false,
    },
    defaultStyle: false,
    attr: {
      class: 'table table-bordered table-striped',
    },
  };

  whiteTeamData: MatchPlayer[] = [];
  darkTeamData: MatchPlayer[] = [];

  whiteTeamPenaltyData: PenaltyTaker[] = [];
  darkTeamPenaltyData: PenaltyTaker[] = [];

  darkTeamPenaltyColumns: string[] = ['name', 'scored'];
  whiteTeamPenaltyColumns: string[] = ['scored', 'name'];

  whiteTeamGoals: number = 0;
  darkTeamGoals: number = 0;

  whiteTeamPenalties: number = 0;
  darkTeamPenalties: number = 0;

  @Input() set matchData(data: Match) {
    if (data) {
      let isCaptain: boolean;
      let isMotm: boolean;
      let penaltyData: string[];
      let isPenaltyScored: boolean;

      this.resetMatchData();

      // Parse player data
      data.whiteTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.whiteTeamData.push({ name: player, goals: 0, assists: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      data.darkTeam.players.split(',').forEach((player: string, index: number) => {
        isCaptain = (index === 0) ? true : false;
        isMotm = (player === data.motm) ? true : false;
        this.darkTeamData.push({ name: player, goals: 0, assists: 0, ownGoals: 0, isCaptain: isCaptain, isMotm: isMotm });
      });

      // Parse goal data
      if (data.whiteTeam.goals) {
        data.whiteTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.darkTeamData.find(x => x.name === goal.split(' ')[0]).ownGoals += 1;
          } else {
            this.whiteTeamData.find(x => x.name === goal).goals += 1;
          }
          this.whiteTeamGoals++;
        });
      }

      if (data.darkTeam.goals) {
        data.darkTeam.goals.split(',').forEach((goal: string) => {
          if (goal.includes('OG')) {
            this.whiteTeamData.find(x => x.name === goal.split(' ')[0]).ownGoals += 1;
          } else {
            this.darkTeamData.find(x => x.name === goal).goals += 1;
          }
          this.darkTeamGoals++;
        });
      }

      // Parse assist data
      if (data.whiteTeam.assists) {
        data.whiteTeam.assists.split(',').forEach((assist: string) => {
          this.whiteTeamData.find(x => x.name === assist).assists += 1;
        });
      }

      if (data.darkTeam.assists) {
        data.darkTeam.assists.split(',').forEach((assist: string) => {
          this.darkTeamData.find(x => x.name === assist).assists += 1;
        });
      }

      // Parse penalty data, if exists
      if (data.whiteTeam.penalties && data.darkTeam.penalties) {
        data.whiteTeam.penalties.split(',').forEach((penalty: string) => {
          penaltyData = penalty.split(':');
          isPenaltyScored = (penaltyData[1] === 'Y') ? true : false;
          this.whiteTeamPenalties += (isPenaltyScored) ? 1 : 0;
          this.whiteTeamPenaltyData.push({ name: penaltyData[0], scored: isPenaltyScored });
        });

        data.darkTeam.penalties.split(',').forEach((penalty: string) => {
          penaltyData = penalty.split(':');
          isPenaltyScored = (penaltyData[1] === 'Y') ? true : false;
          this.darkTeamPenalties += (isPenaltyScored) ? 1 : 0;
          this.darkTeamPenaltyData.push({ name: penaltyData[0], scored: isPenaltyScored });
        });
      }
    }
  }

  constructor() { }

  ngOnInit() {
    Object.assign(this.darkSettings, this.defaultSettings);
    Object.assign(this.whiteSettings, this.defaultSettings);
    Object.assign(this.darkPenaltySettings, this.defaultSettings);
    Object.assign(this.whitePenaltySettings, this.defaultSettings);
  }

  resetMatchData() {
    this.whiteTeamData = [];
    this.darkTeamData = [];

    this.whiteTeamGoals = 0;
    this.darkTeamGoals = 0;

    this.whiteTeamPenalties = 0;
    this.darkTeamPenalties = 0;

    this.whiteTeamPenaltyData = [];
    this.darkTeamPenaltyData = [];
  }
}
