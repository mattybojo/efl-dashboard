import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'efl-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit, OnDestroy {

  match: Match;
  params: ParamMap;

  faLongArrowAltLeft = faLongArrowAltLeft;

  subscription$: Subscription;

  constructor(private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    this.subscription$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.params = params;
        return this.matchService.getMatches();
      }),
    ).subscribe((matches: Match[]) => {
      const date: string = this.params.get('date');
      let foundMatch: Match;
      if (date && date !== 'latest') {
        foundMatch = matches.find(x => x.date === date);
        if (foundMatch) {
          this.match = foundMatch;
        } else {
          this.match = matches[0];
        }
      } else {
        this.match = matches[0];
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
