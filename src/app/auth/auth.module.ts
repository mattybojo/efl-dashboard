import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiConfig } from './login/firebaseui.config';
import { ProfileComponent } from './profile/profile.component';
import { NbUserModule, NbActionsModule, NbCardModule } from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsRadarComponent } from './profile/chartjs-radar-comnponent';

const firebaseUiAuthConfig: firebaseui.auth.Config = firebaseUiConfig;

@NgModule({
  declarations: [LoginComponent, ProfileComponent, ChartjsRadarComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FirebaseUIModule.forFeature(firebaseUiAuthConfig),
    NbUserModule,
    NbActionsModule,
    ChartModule,
    NbCardModule,
  ],
})
export class AuthModule { }
