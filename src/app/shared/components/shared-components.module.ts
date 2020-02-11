import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
