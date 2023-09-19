import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogRef } from '@nebular/theme';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css']
})
export class TextModalComponent implements OnInit {
  title = "";
  message = "";
  constructor(private dialogRef: NbDialogRef<ConfirmationModalComponent>,
    private sanitizer: DomSanitizer
  ) { }
  html(text: any) {
    text = text.split("\"").join("\'")
    return this.sanitizer.bypassSecurityTrustHtml(text)
  }

  ngOnInit(): void {
  }
  action(type: boolean): void {
    this.dialogRef.close(type);
  }
}