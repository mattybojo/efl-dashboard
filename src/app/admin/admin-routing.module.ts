import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { AdminGuard } from './../shared/guards/admin.guard';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminMatchesComponent } from './admin-matches/admin-matches.component';

const routes: Routes = [{
  path: 'team-picker',
  component: AdminTeamPickerComponent,
  canActivate: [AdminGuard]
}, {
  path: 'matches',
  component: AdminMatchesComponent,
  canActivate: [AdminGuard]
}, {
  path: 'motm-voting',
  component: AdminMotmVotingComponent,
  canActivate: [AdminGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule {}
