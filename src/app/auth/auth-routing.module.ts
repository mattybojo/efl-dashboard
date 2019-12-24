import { AlreadyLoggedInGuard } from './../shared/guards/already-logged-in.guard';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [AlreadyLoggedInGuard],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule {}
