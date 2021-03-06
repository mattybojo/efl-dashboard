import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'efl-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  dialogTitle: string;
  confirmMessage: string;

  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) { }

  closeDialog(isConfirmed: boolean) {
    this.dialogRef.close(isConfirmed);
  }
}
