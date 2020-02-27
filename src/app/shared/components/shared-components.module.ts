import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ],
  exports: [
    ConfirmDialogComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedComponentsModule { }
