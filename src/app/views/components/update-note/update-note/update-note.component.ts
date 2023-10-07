import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent {

  constructor(private dialogRef: NbDialogRef<UpdateNoteComponent>) { }

  @Input() text: any

  action(type: boolean): void {
    if (type) {
      this.dialogRef.close(true)
    } else {
      this.dialogRef.close(false)
    }
  }
}
