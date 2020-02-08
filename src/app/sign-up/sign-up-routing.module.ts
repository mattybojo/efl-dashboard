import { SignUpComponent } from './sign-up/sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  component: SignUpComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SignUpRoutingModule {}
