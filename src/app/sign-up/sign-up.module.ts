import { Ng2CompleterModule } from 'ng2-completer';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule, NbTabsetModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import {
  CreateGameSignUpDialogComponent,
} from './create-game-sign-up-dialog/create-game-sign-up-dialog.component';
import { IsNotPlayingPipe } from './is-not-playing.pipe';
import { IsPlayingPipe } from './is-playing.pipe';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignUpComponent, CreateGameSignUpDialogComponent, IsPlayingPipe, IsNotPlayingPipe],
  imports: [
    ThemeModule,
    CommonModule,
    SignUpRoutingModule,
    NbCardModule,
    NbButtonModule,
    FontAwesomeModule,
    FormsModule,
    Ng2CompleterModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    SharedComponentsModule,
  ],
  entryComponents: [CreateGameSignUpDialogComponent],
})
export class SignUpModule { }
