import { MatchSummaryLinkComponent } from './../match-summary-link/match-summary-link.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchService } from '../../shared/services/match.service';
import { MatchSummary, Match } from '../../shared/models/match.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.scss']
})
export class MatchSummaryComponent implements OnInit, OnDestroy {

  data: MatchSummary[];

  settings: Object = {
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
    columns: {
      date: {
        title: 'Date',
        type: 'custom',
        renderComponent: MatchSummaryLinkComponent
      },
      darkTeam: {
        title: 'Dark Team',
      },
      whiteTeam: {
        title: 'White Team',
      },
      motm: {
        title: 'MOTM',
      },
    },
  };

  subscription$: Subscription;

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.subscription$ = this.matchService.getMatches().subscribe((matches: Match[]) => {
      let tempData: MatchSummary[] = [];
      matches.forEach((match: Match) => {
        const darkCaptain: string = (match.darkTeam && match.darkTeam.players) ? match.darkTeam.players.split(',')[0] : 'Dark';
        const whiteCaptain: string = (match.whiteTeam && match.whiteTeam.players) ? match.whiteTeam.players.split(',')[0] : 'White';
        const darkGoals: number = (match.darkTeam && match.darkTeam.goals) ? match.darkTeam.goals.split(',').length : 0;
        const whiteGoals: number = (match.whiteTeam && match.whiteTeam.goals) ? match.whiteTeam.goals.split(',').length : 0;
        tempData.push({date: match.date, darkTeam: `${darkGoals} (${darkCaptain})`, whiteTeam: `${whiteGoals} (${whiteCaptain})`, motm: match.motm});
      });
      this.data = tempData;
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
