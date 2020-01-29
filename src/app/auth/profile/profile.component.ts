import { PlayerService } from './../../shared/services/player.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../../shared/models/user-data.model';
import { GraphData, Season, PlayerStats } from '../../shared/models/player.model';
import { take } from 'rxjs/operators';
import { Observable, forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserData;
  userGraphData: GraphData = new GraphData();
  seasons: string[];

  constructor(private authService: AuthService, private playerService: PlayerService) {}

  ngOnInit() {
    const self = this;
    this.user = this.authService.getUser();
    this.playerService.getSeasonsList().subscribe((seasonList: Season) => {
      let seasonArray: string[] = [];
      let seasonStatsObs: Observable<PlayerStats>[] = [];
      const graphLabels: string[] = ['Wins', 'Goals', 'Assists', 'Own Goals', 'Clean Sheets', 'Games Played'];
      let datasets: any[] = [];
      self.seasons = seasonList.name.split(',');
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
