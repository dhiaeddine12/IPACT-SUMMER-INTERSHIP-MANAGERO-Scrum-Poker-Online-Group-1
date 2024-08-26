import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() title: string;
  @Input() message: string;

  constructor(protected dialogRef: NbDialogRef<ConfirmationDialogComponent>) {}

  close(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}