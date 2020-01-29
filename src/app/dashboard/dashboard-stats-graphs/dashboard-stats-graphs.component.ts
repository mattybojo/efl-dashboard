import { GraphData } from './../../shared/models/player.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import { PlayerStats } from '../../shared/models/player.model';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-dashboard-stats-graphs',
  templateUrl: './dashboard-stats-graphs.component.html',
  styleUrls: ['./dashboard-stats-graphs.component.scss']
})
export class DashboardStatsGraphsComponent implements OnInit, OnDestroy {

  seasonOptions: KeyValue<string, string>[] = [{key: 'Season 2', value: 'season2'}, {key: 'Season 1', value: 'season1'}];
  selectedSeason: string;
  goalGraphData: GraphData;
  assistGraphData: GraphData;

  subscription$: Subscription[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.selectedSeason = 'season2';
    this.getPlayerStatsBySeason();
  }

  getPlayerStatsBySeason() {
    this.subscription$.push(
      this.playerService.getAllPlayerStats(this.selectedSeason).subscribe((resp: PlayerStats[]) => {
        let temp: any[] = [];
        this.goalGraphData = new GraphData();
        this.assistGraphData = new GraphData();

        temp = resp.filter(x => x.goals > 0).map(player => ({ name: player.name, goals: player.goals}));
        this.goalGraphData.data = temp.map(x => x.goals);
        this.goalGraphData.labels = temp.map(x => x.name);

        if (this.selectedSeason === 'season2') {
          temp = resp.filter(x => x.assists > 0).map(player => ({ name: player.name, assists: player.assists}));
          this.assistGraphData.data = temp.map(x => x.assists);
          this.assistGraphData.labels = temp.map(x => x.name);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
