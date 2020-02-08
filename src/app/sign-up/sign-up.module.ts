import { NbCardModule, NbButtonModule, NbDialogModule, NbInputModule } from '@nebular/theme';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThemeModule } from '../@theme/theme.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { CreateGameSignUpDialogComponent } from './create-game-sign-up-dialog/create-game-sign-up-dialog.component';


@NgModule({
  declarations: [SignUpComponent, CreateGameSignUpDialogComponent],
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
  ],
  entryComponents: [CreateGameSignUpDialogComponent],
})
export class SignUpModule { }
