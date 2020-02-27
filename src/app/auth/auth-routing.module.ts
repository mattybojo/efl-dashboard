import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlreadyLoggedInGuard } from '../shared/guards/already-logged-in.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [AlreadyLoggedInGuard],
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class AuthRoutingModule {}
