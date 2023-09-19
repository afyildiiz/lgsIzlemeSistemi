import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  title = "";
  message = "";

  constructor(private dialogRef: NbDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
  }

  action(type: boolean): void {
    this.dialogRef.close(type);
  }

}