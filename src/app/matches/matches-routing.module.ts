import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';


const routes: Routes = [{
  path: 'summary',
  component: MatchSummaryComponent,
}, {
  path: 'details',
  component: MatchDetailComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MatchesRoutingModule {}
