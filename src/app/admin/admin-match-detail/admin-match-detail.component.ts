import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faLongArrowAltLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService } from '@nebular/theme';

import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';
import { SetScoresDialogComponent } from '../set-scores-dialog/set-scores-dialog.component';

@Component({
  selector: 'efl-admin-match-detail',
  templateUrl: './admin-match-detail.component.html',
  styleUrls: ['./admin-match-detail.component.scss'],
})
export class AdminMatchDetailComponent implements OnInit, OnDestroy {

  match$: Observable<Match[]>;
  match: Match;
  params: ParamMap;
  selectedMatch: string;
  faSave = faSave;
  faLongArrowAltLeft = faLongArrowAltLeft;

  subscription$: Subscription;

  constructor(private route: ActivatedRoute, private matchService: MatchService,
    private dialogService: NbDialogService) {}

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

  setScores() {
    this.dialogService.open(SetScoresDialogComponent, {
      context: {
        matchData: this.match,
      },
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
