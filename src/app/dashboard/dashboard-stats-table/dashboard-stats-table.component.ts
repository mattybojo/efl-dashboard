import { Component, OnInit } from '@angular/core';
import { PlayerStats } from '../../shared/models/player.model';
import { KeyValue } from '@angular/common';
import { PlayerService } from '../../shared/services/player.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'ngx-dashboard-stats-table',
  templateUrl: './dashboard-stats-table.component.html',
  styleUrls: ['./dashboard-stats-table.component.scss']
})
export class DashboardStatsTableComponent implements OnInit {

  data: PlayerStats[];

  settings: Object;

  defaultSettings: Object = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: false,
    },
  };

  allCols: Object = {
    columns: {
      name: {
        title: 'Name',
      },
      gamesPlayed: {
        title: 'Games Played',
      },
      wins: {
        title: 'Wins',
      },
      captainWins: {
        title: 'Captain Wins',
      },
      winPct: {
        title: 'Win %',
        valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value) },
      },
      goals: {
        title: 'Goals',
      },
      assists: {
        title: 'Assists',
      },
      ownGoals: {
        title: 'Own Goals',
      },
      cleanSheets: {
        title: 'Clean Sheets',
      },
    },
  };

  columns: string[] = [];
  seasonOptions: KeyValue<string, string>[] = [{key: 'Season 2', value: 'season2'}, {key: 'Season 1', value: 'season1'}];
  selectedSeason: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.selectedSeason = 'season2';
    this.getPlayerStatsBySeason();
  }

  getPlayerStatsBySeason() {
    this.playerService.getPlayerStats(this.selectedSeason).subscribe((resp: PlayerStats[]) => {
      let tempObj: Object = {};
      Object.assign(tempObj, this.defaultSettings, this.allCols);

      this.settings = cloneDeep(tempObj);

      if (this.selectedSeason === 'season1') {
        delete this.settings['columns']['assists'];
      }

      this.data = this.calculateWinPct(resp);
    });
  }

  calculateWinPct(stats: PlayerStats[]): PlayerStats[] {
    stats.forEach((stat: PlayerStats) => {
      stat.winPct = (stat.wins / stat.gamesPlayed);
    });
    return stats;
  }
}
