import { AuthService } from './../../shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { ChangelogService } from './../../shared/services/changelog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { groupBy, orderBy } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Changelog } from '../../shared/models/changelog.model';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit, OnDestroy {

  formattedLogs: any[];
  logs$: Observable<Changelog[]>;
  objectKeys: any;
  updatedStatsDate: string;

  subscription$: Subscription;

  constructor(private changelogService: ChangelogService, private authService: AuthService) { }

  ngOnInit() {
    const self = this;
    this.logs$ = this.changelogService.getLogs().pipe(
      tap((logs: Changelog[]) => {
        this.objectKeys = Object.keys;
        this.subscription$ = this.authService.isAdmin().subscribe((isAdmin: boolean) => {
          const filteredLogs: Changelog[] = logs.filter((log: Changelog) => {
            return log.type === 'all' || (isAdmin && log.type === 'admin');
          });
          const sortedLogs = orderBy(filteredLogs, ['date'], 'desc');
          self.formattedLogs = groupBy(sortedLogs, (log: Changelog) => {
            return log.date.toDate().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/[/]/gi, '-');
          });
           this.updatedStatsDate = logs.find(x => x.type === 'statsUpdate').date.toDate().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/[/]/gi, '-');
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
