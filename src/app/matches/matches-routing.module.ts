import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';

const routes: Routes = [{
  path: 'summary',
  component: MatchSummaryComponent,
}, {
  path: 'details',
  component: MatchDetailComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class MatchesRoutingModule {}
