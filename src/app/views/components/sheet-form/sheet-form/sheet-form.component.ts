import { ToastService } from 'src/app/services/toast/toast.service';
import { Sheet } from '../../../../models/excel-models/sheet';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import SheetHelper from 'src/app/models/excel-models/sheet';


@Component({
  selector: 'app-sheet-form',
  templateUrl: './sheet-form.component.html',
  styleUrls: ['./sheet-form.component.css']
})
export class SheetFormComponent implements OnInit, OnChanges {

  @Input() initialSheet: Sheet = {
    sheetName: "",
    columnNames: []
  }

  @Output() deletedColumn: EventEmitter<any> = new EventEmitter<any>();

  paramaeterTypeList: any[] = []

  @Input() columnTypes: any[] = []

  sheetName: string = '';
  sheetForm!: FormGroup
  cols: any[] = [];
  constructor(
    private sheetHelper: SheetHelper,
    private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.sheetForm = new FormGroup({
      "1": new FormControl('', Validators.required),
      "type-1": new FormControl(''),
    });
    this.cols = Object.keys(this.sheetForm.value).filter(x => !x.includes('type'))

    this.initialSheet?.columnNames?.map((item, key) => {
      if (key > 0)
        this.addNewColumn(item)
      else {
        this.sheetForm.patchValue({ 1: item })
        this.sheetForm.patchValue({ "type-1": this.columnTypes?.find(x => x.sheetName == this.initialSheet.sheetName)?.columnTypes?.find((x: any) => x.name == item).type })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSheet']) {
      this.initSheetFormByInitialSheet()
    }

  }

  addBlankColumn() {
    this.addNewColumn('')
  }

  addNewColumn(initialValue: string) {
    let controls = this.sheetForm.controls
    let controlkeys = Object.keys(controls).filter(x => !x.includes('type'))
    let controlName = controlkeys.length + 1
    let newFormControl: any = {}
    newFormControl[controlName] = new FormControl(initialValue, Validators.required);
    this.sheetForm = new FormGroup({ ...controls, ...newFormControl })

    this.cols = Object.keys(this.sheetForm.value).filter(x => !x.includes('type'))

    //add types
    let controls2 = this.sheetForm.controls
    let controlkeys2 = Object.keys(controls2)
    let newFormControl2: any = {}
    let selectedSheetcoltypelist = this.columnTypes?.find(x => x?.sheetName == this.initialSheet.sheetName)?.columnTypes
    let selectedcol = selectedSheetcoltypelist?.find((x: any) => x.name == initialValue)
    newFormControl2['type-' + controlName] = new FormControl(selectedcol?.type);
    this.sheetForm = new FormGroup({ ...controls2, ...newFormControl2 })


  }

  initSheetFormByInitialSheet() {
    this.initSheetForm(this.initialSheet)
  }

  initSheetForm(sheet: Sheet) {
    this.sheetName = sheet.sheetName;
    this.sheetForm = this.formBuilder.group({});
    let colNames = sheet.columnNames
    if (sheet.columnNames.length <= 0) {
      this.addNewColumn('')
    }
    colNames.forEach((colName: any) => this.addNewColumn(colName))
  }

  deleteColumn(colIndex: number, col: any) {
    let colNames = Object.keys(this.sheetForm.value).filter(x => !x.includes('type')).map((key: any) => {
      return this.sheetForm.value[key]
    })

    this.deletedColumn.emit([colIndex, this.sheetForm.value[col], this.sheetName])

    colNames.splice(colIndex, 1)
    this.initialSheet.sheetName = this.sheetName
    this.initialSheet.columnNames = colNames
    this.initSheetFormByInitialSheet()
  }

  formToSheet(): {} {

    if (!this.sheetForm.valid || this.sheetName?.length <= 0) {
      this.toastService.showToast('warning', 'Sayfa formu geçerli değil!')
      return false;
    }
    let colNames: any = [];
    colNames = Object.keys(this.sheetForm.value).filter(x => !x.includes('type')).map((key: any) => {
      if (colNames.includes(this.sheetForm.value[key])) {

        return;
      }
      return this.sheetForm.value[key]
    })

    var sortedcolNames = this.cols.map(item => {
      return colNames[parseInt(item) - 1]
    })

    return this.sheetHelper.createSheet(this.sheetName, sortedcolNames);
  }

  allColTypes() {
    return this.columnTypes
  }

  createColumnTypeData() {

    let colTypes = Object.keys(this.sheetForm.value).filter(x => x.includes('type')).map((key: any) => {
      return { name: this.sheetForm.value[key.split('-')[1]], type: this.sheetForm.value[key] }
    })
    var sortedcoltypes = this.cols.map(item => {
      return colTypes[parseInt(item) - 1]
    })


    return this.sheetHelper.createColType(this.sheetName, sortedcoltypes);
  }

}