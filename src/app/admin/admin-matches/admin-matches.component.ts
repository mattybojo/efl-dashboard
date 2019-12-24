import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SetScoresDialogComponent } from '../set-scores-dialog/set-scores-dialog.component';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'app-admin-matches',
  templateUrl: './admin-matches.component.html',
  styleUrls: ['./admin-matches.component.scss']
})
export class AdminMatchesComponent implements OnInit {

  match$: Observable<Match[]>;
  match: Match;
  matches: Match[];
  params: ParamMap;
  dateOptions: string[] = [];
  selectedMatch: string;
  faSave = faSave;

  constructor(private route: ActivatedRoute, private router: Router,
              private matchService: MatchService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.params = params;
        return this.matchService.getMatches();
      })
    ).subscribe((matches: Match[]) => {
      this.matches = matches;
      this.createDateOptions();
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
      this.selectedMatch = this.match.date;
    });
  }

  createDateOptions() {
    this.matches.forEach((match: Match) => {
      this.dateOptions.push(match.date);
    });
  }

  onSelectionChange($event) {
    this.match = this.matches.find(x => x.date === $event);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { date: $event },
      queryParamsHandling: 'merge',
    });
  }

  setScores() {
    this.dialogService.open(SetScoresDialogComponent, {
      context: {
        matchData: this.match,
      }
    });
  }
}
