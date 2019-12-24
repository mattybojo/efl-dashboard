import { MatchesRoutingModule } from './matches-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches/matches.component';
import { TeamsheetsComponent } from './shared/teamsheets/teamsheets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CellValueFormatterComponent } from './shared/cell-value-formatter/cell-value-formatter.component';

@NgModule({
  declarations: [MatchesComponent, TeamsheetsComponent, CellValueFormatterComponent],
  imports: [
    MatchesRoutingModule,
    CommonModule,
    FontAwesomeModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ],
  exports: [
    TeamsheetsComponent,
  ],
  entryComponents: [CellValueFormatterComponent],
})
export class MatchesModule { }
