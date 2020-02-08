import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'matches',
    loadChildren: './matches/matches.module#MatchesModule',
  }, {
    path: 'team-picker',
    loadChildren: './team-picker/team-picker.module#TeamPickerModule',
  }, {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  }, {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  }, {
    path: 'changelog',
    loadChildren: './changelog/changelog.module#ChangelogModule',
  }, {
    path: 'motm-voting',
    loadChildren: './motm-voting/motm-voting.module#MotmVotingModule',
  }, {
    path: 'sign-up',
    loadChildren: './sign-up/sign-up.module#SignUpModule',
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
