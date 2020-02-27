import { ChartModule } from 'angular2-chartjs';
import { FirebaseUIModule } from 'firebaseui-angular';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbUserModule } from '@nebular/theme';

import { AuthRoutingModule } from './auth-routing.module';
import { firebaseUiConfig } from './login/firebaseui.config';
import { LoginComponent } from './login/login.component';
import { ChartjsRadarComponent } from './profile/chartjs-radar-comnponent';
import { ProfileComponent } from './profile/profile.component';

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
