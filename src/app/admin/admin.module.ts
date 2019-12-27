import { MatchesModule } from './../matches/matches.module';
import { TeamPickerModule } from './../team-picker/team-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetScoresDialogComponent } from './set-scores-dialog/set-scores-dialog.component';
import { SaveMatchDialogComponent } from './save-match-dialog/save-match-dialog.component';
import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { SavePlayerNameDialogComponent } from './save-player-name-dialog/save-player-name-dialog.component';
import { ViewMotmVotesDialogComponent } from './view-motm-votes-dialog/view-motm-votes-dialog.component';
import { NbDialogModule, NbInputModule, NbCardModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { AdminMatchDetailComponent } from './admin-match-detail/admin-match-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminTeamPickerComponent,
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    AdminMotmVotingComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
    AdminMatchDetailComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    TeamPickerModule,
    FontAwesomeModule,
    MatchesModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    RouterModule,
  ],
  exports: [
    SavePlayerNameDialogComponent,
  ],
  entryComponents: [
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    SaveMatchDialogComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
  ],
})
export class AdminModule { }
