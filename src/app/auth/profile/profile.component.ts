import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { Lookup } from '../../shared/models/lookup.model';
import { GraphData, PlayerStats } from '../../shared/models/player.model';
import { UserData } from '../../shared/models/user-data.model';
import { AuthService } from '../../shared/services/auth.service';
import { LookupService } from '../../shared/services/lookup.service';
import { PlayerService } from '../../shared/services/player.service';

@Component({
  selector: 'efl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: UserData;
  userGraphData: GraphData = new GraphData();
  seasons: string[];

  constructor(private authService: AuthService, private playerService: PlayerService,
    private lookupService: LookupService) {}

  ngOnInit() {
    const self = this;
    this.user = this.authService.getUser();
    this.lookupService.getLookupValue('seasonList').subscribe((lookupResp: Lookup) => {
      const seasonArray: string[] = [];
      const seasonStatsObs: Observable<PlayerStats>[] = [];
      const graphLabels: string[] = ['Wins', 'Goals', 'Assists', 'Own Goals', 'Clean Sheets', 'Games Played'];
      const datasets: any[] = [];
      self.seasons = lookupResp.value.split(',');
      self.seasons.forEach((season: string) => {
        seasonStatsObs.push(self.playerService.getPlayerStats(season, this.user.displayName).pipe(take(1)));
        seasonArray.push(`Season ${season.substr(6)}`);
      });

      forkJoin(seasonStatsObs).subscribe((resp: PlayerStats[]) => {
        resp.forEach((stats: PlayerStats, index: number) => {
          if (stats) {
            datasets.push({
              data: [stats.wins, stats.goals, (stats.assists ? stats.assists : 0), stats.ownGoals, stats.cleanSheets, stats.gamesPlayed],
              label: `${seasonArray[index]}`,
            });
          }
        });

        self.userGraphData = { labels: graphLabels, datasets: datasets };
      });
    });
  }
}
