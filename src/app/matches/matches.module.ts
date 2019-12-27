import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsheetsComponent } from './shared/teamsheets/teamsheets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbSelectModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CellValueFormatterComponent } from './shared/cell-value-formatter/cell-value-formatter.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchSummaryLinkComponent } from './match-summary-link/match-summary-link.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TeamsheetsComponent, CellValueFormatterComponent, MatchSummaryComponent, MatchSummaryLinkComponent, MatchDetailComponent],
  imports: [
    MatchesRoutingModule,
    CommonModule,
    FontAwesomeModule,
    NbSelectModule,
    Ng2SmartTableModule,
    RouterModule,
    NbButtonModule,
  ],
  exports: [
    TeamsheetsComponent,
    MatchSummaryComponent,
    MatchSummaryLinkComponent,
  ],
  entryComponents: [CellValueFormatterComponent, MatchSummaryLinkComponent],
})
export class MatchesModule { }
