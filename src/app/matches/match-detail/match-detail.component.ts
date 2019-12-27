import { MatchService } from './../../shared/services/match.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Match } from '../../shared/models/match.model';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ngx-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  match: Match;
  params: ParamMap;

  faLongArrowAltLeft = faLongArrowAltLeft;

  constructor(private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(
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

}
