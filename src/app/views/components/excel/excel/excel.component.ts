import { Component, Input, OnInit, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Core from 'handsontable/core';
import { ParameterTypes } from 'src/app/models/excel-models/sheet';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent {

  @Input() columnNames!: string[];
  @Input() tableData!: any[];
  @Input() sheetName!: string;
  @Input() columnTypes: ParameterTypes[] = []
  @Input() id: any;
  columns: any[] = [];

  private hotRegisterer = new HotTableRegisterer();

  ngOnInit() {
    console.log(this.tableData)
    console.log(this.columns)
    this.swapHotData(this.tableData, this.columns)

  }


  swapHotData(data: any, columns: any) {
    this.hotRegisterer.getInstance(this.id).updateSettings({
      data: data,
      columns: columns
    })
  }

  Checkboxrenderer(instance: Core, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) {

    var dateFormat = new Date(value);

    if (value && value?.toString().includes(',')) {
      td.innerText = value.split(',')[0]

    } else if (value && value?.toString().includes('.'))
      if (dateFormat.getDate())
        td.innerText = dateFormat.getDate() + '/' + (dateFormat.getMonth() + 1) + '/' + dateFormat.getFullYear();
      else
        td.innerText = ''

    return td;
  }

  createColumnDataForTable() {
    this.columns = this.columnNames?.map(item => {

      if (this.columnTypes.length) {
        var type = this.columnTypes?.find(x => x.sheetName == this.sheetName)?.columnTypes.find(x => x.name == item)?.type
        if (type == 'date') {
          return {
            type: type,
            data: item,
          }
        }
        else if (type == 'numeric')
          return {
            type: type,
            data: item,
            numericFormat: {
              pattern: '0,000.0000'
            }

          }
        else if (type == 'percent')
          return {
            type: 'numeric',
            data: item,
            numericFormat: {
              pattern: {
                output: "percent",
                mantissa: 1
              }

            }

          }
        else if (type == 'boolean')
          return {
            type: "checkbox",
            data: item,
          }
        else if (type == 'undefined')
          return {
            type: "text",
            data: item,
          }
        else
          return {
            type: type,
            data: item,
          }
      }
      else
        return {
          data: item
        }
    })
  }


  ngOnChanges(changes: SimpleChanges) {

    this.columnNames = this.columnNames?.filter(x => !x?.includes('UNKNOWN'))

    this.createColumnDataForTable()
    this.changeData()

    this.columns = this.columnNames?.map(item => {
      if (this.columnTypes.length) {
        var type = this.columnTypes?.find(x => x.sheetName == this.sheetName)?.columnTypes.find(x => x.name == item)?.type
        if (type == 'date') {
          return {
            type: type,
            data: item,
          }
        }
        else if (type == 'numeric')
          return {
            type: type,
            data: item,
            numericFormat: {
              pattern: '0,000.0000'
            }
          }
        else if (type == 'percent')
          return {
            type: 'numeric',
            data: item,
            numericFormat: {
              pattern: {
                output: "percent",
                mantissa: 1
              }
            }
          }
        else
          return {
            type: type,
            data: item,
          }
      }
      else
        return {
          data: item
        }
    })
    this.swapHotData(this.tableData, this.columns)
  }


  changeData() {
    if (this.columns?.find(x => x.type == 'checkbox')) {
      var checkColumn = this.columns?.find(x => x.type == 'checkbox').data

      this.tableData = this.tableData.map(cl => {
        if (cl[checkColumn]) {
          if (typeof (cl[checkColumn]) == 'number' || typeof (cl[checkColumn]) == 'bigint') {
            if (cl[checkColumn] == 0)
              cl[checkColumn] = false
            else if (cl[checkColumn] == 1)
              cl[checkColumn] = true
          } else if (typeof (cl[checkColumn]) == 'string') {
            if (cl[checkColumn] == 'false')
              cl[checkColumn] = false
            else if (cl[checkColumn] == 'true')
              cl[checkColumn] = true
          }
        }
        return cl
      })
    }
  }


}
