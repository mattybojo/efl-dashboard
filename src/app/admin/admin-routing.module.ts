import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchSummaryComponent } from '../matches/match-summary/match-summary.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminMatchDetailComponent } from './admin-match-detail/admin-match-detail.component';
import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';

const routes: Routes = [{
  path: 'team-picker',
  component: AdminTeamPickerComponent,
  canActivate: [AdminGuard],
}, {
  path: 'matches/summary',
  component: MatchSummaryComponent,
  canActivate: [AdminGuard],
}, {
  path: 'matches/details',
  component: AdminMatchDetailComponent,
  canActivate: [AdminGuard],
}, {
  path: 'motm-voting',
  component: AdminMotmVotingComponent,
  canActivate: [AdminGuard],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class AdminRoutingModule {}
