import { NbDialogRef } from '@nebular/theme';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sheet } from 'xlsx';
import { SheetFormComponent } from '../../sheet-form/sheet-form/sheet-form.component';

@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.css']
})
export class AddSheetComponent implements OnInit {
  parameters: Sheet[] = [];


  @ViewChild(SheetFormComponent) sheetFormComponent: any;

  constructor(private dialogService: DialogService,
    private dialogRef: NbDialogRef<AddSheetComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  createNewSheet() {
    let sheet = this.sheetFormComponent.formToSheet()
    if (!sheet) {
      return;
    }
    this.dialogRef.close(sheet)
  }

  addBlankColumn() {
    this.sheetFormComponent.addBlankColumn();
  }
}