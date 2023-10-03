import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataBySheet, DataBySheetHelper } from 'src/app/models/excel-models/dataBySheet';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddSheetComponent } from '../../add-sheet/add-sheet/add-sheet.component';

@Component({
  selector: 'app-excel-form',
  templateUrl: './excel-form.component.html',
  styleUrls: ['./excel-form.component.css']
})
export class ExcelFormComponent {

  constructor(private dataBySheetHelper: DataBySheetHelper,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  @Input() currentColumnNames: string[] = [];
  @Input() sheetNames: string[] = [];
  @Input() type: any;
  @Input() dataBySheets: DataBySheet[] = [];
  @Output() exportData: EventEmitter<any> = new EventEmitter<any>();
  currentDataBySheet!: DataBySheet;
  currentData: any[] = [];
  currentSheetName: string = '';
  currentSheetIndex: number = 0;
  sheetname: string = ''

  ngOnInit() {
    this.changeSheetNames(this.sheetNames);
  }

  changeDataBySheets(data: any) {
    this.handleChangeDataBySheets(data);
    this.changeCurrentDataBySheet(data[0]);
  }

  handleChangeDataBySheets(dataBySheets: any[]) {
    this.dataBySheets = dataBySheets;
    this.changeSheetNamesByDataBySheets();
    this.currentSheetName = this.sheetNames[0];
    this.currentSheetIndex = 0;

    this.changeCurrentDataBySheet(
      this.dataBySheetHelper.findBySheetName(
        this.dataBySheets,
        this.sheetNames[0]
      )
    );
  }

  changeCurrentDataBySheet(dataBySheet: DataBySheet) {
    this.sheetname = dataBySheet.sheet?.sheetName!
    this.currentDataBySheet = dataBySheet;
    this.currentData = dataBySheet.data;

    if (dataBySheet.sheet?.sheetName)
      this.currentColumnNames = dataBySheet.sheet?.columnNames

    if (this.currentData?.length <= 0) {
      this.addRow();
    }
  }


  changeCurrentSheetName(sheetName: string) {
    this.currentSheetName = sheetName;
    this.currentSheetIndex = this.dataBySheetHelper.findIndexBySheetName(this.dataBySheets, sheetName);
    this.changeCurrentDataBySheet(
      this.dataBySheetHelper.findBySheetName(this.dataBySheets, sheetName)
    );
  }


  addRow() {
    if (this.dataBySheets.length <= 0) {
      this.toastService.showToast('warning', 'Herhangi bir sayfa bulunmuyor.');
      return;
    }
    let emptyRow: any = {};
    this.currentColumnNames.forEach((col) => {
      if (col) {
        emptyRow[col] = '';
      }
    });
    this.currentData = [...this.currentData, emptyRow];
    this.currentDataBySheet.data = this.currentData
  }


  changeSheetNamesByDataBySheets() {
    this.sheetNames = this.dataBySheetHelper.getAllSheetNames(
      this.dataBySheets
    );
    this.changeSheetNames(this.sheetNames);
  }

  changeSheetNames(sheetNames: string[]) {
    this.sheetNames = sheetNames;
    this.exportData.emit(this.dataBySheets);

  }

  openAddSheetModal() {
    this.dialogService
      .openModal(AddSheetComponent, true, true, 'right-modal')
      .onClose.subscribe((returnVal) => {
        if (returnVal) {
          let sheetName = returnVal.sheetName;
          if (this.dataBySheets) {
            if (
              this.dataBySheetHelper.findBySheetName(
                this.dataBySheets,
                sheetName
              ).sheet
            ) {
              this.toastService.showToast(
                'warning',
                'Aynı sayfa adı zaten mevcut'
              );
              return;
            }
          }

          this.dataBySheets = this.dataBySheetHelper.addSheetToDataBySheet(
            this.dataBySheets,
            returnVal
          );
          this.handleChangeDataBySheets(this.dataBySheets);
        }
      });
  }


  deleteCurrentSheet() {
    this.sheetNames.splice(this.currentSheetIndex, 1)
    this.dataBySheets.splice(this.currentSheetIndex, 1)
    this.changeCurrentSheetByIndex(0)
  }

  changeCurrentSheetByIndex(index: number) {
    let sheetName = this.dataBySheets[index].sheet?.sheetName || "";
    this.currentSheetName = sheetName;
    this.currentSheetIndex = this.dataBySheetHelper.findIndexBySheetName(this.dataBySheets, sheetName);
    this.changeCurrentDataBySheet(
      this.dataBySheetHelper.findBySheetName(this.dataBySheets, sheetName)
    );
  }

}
