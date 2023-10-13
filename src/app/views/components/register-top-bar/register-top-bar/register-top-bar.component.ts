import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ParameterTypes, Sheet } from 'src/app/models/excel-models/sheet';
import { DataBySheet } from 'src/app/models/excel-models/dataBySheet';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-top-bar',
  templateUrl: './register-top-bar.component.html',
  styleUrls: ['./register-top-bar.component.css']
})
export class RegisterTopBarComponent {
  @Output() dataBySheetsEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() currentSheetNameEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() sheetNames: string[] = [];

  dataBySheets: DataBySheet[] = []

  constructor(
    private toastService: ToastService,
  ) { }

  parametertypes: ParameterTypes[] = []

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  private ngUnsubscribe = new Subject<void>();
  isDisabled: boolean = false;


  get_header_row(sheet: any) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;

    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]

      /* find the cell in the first row */
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default
      if (cell && cell.t)
        hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
    }
    return headers;
  }

  readColumnWiseData(range: any, ws: any) {
    let columnWiseData: any = [];
    for (var C = range.s.c; C <= range.e.c; ++C) {
      columnWiseData[C] = [];
      for (var R = range.s.r; R <= range.e.r; ++R) {
        var cellref = XLSX.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
        if (!ws[cellref]) continue; // if cell doesn't exist, move on
        let cell = ws[cellref];
        columnWiseData[C].push(cell.v);
      };
    }
  }
  readRowWiseData(range: any, ws: any) {
    let columnWiseData: any = [];
    for (var C = range.s.r; C <= range.e.r; ++C) {
      columnWiseData[C] = [];
      for (var R = range.s.c; R <= range.e.c; ++R) {

        var cellref = XLSX.utils.encode_cell({ c: R, r: C }); // construct A1 reference for cell
        if (!ws[cellref]) {
          columnWiseData[C].push(null);
          continue; // if cell doesn't exist, move on

        }

        let cell = ws[cellref];
        if (C == 0) columnWiseData[C].push(cell.w);
        else columnWiseData[C].push(cell.v);

      };
    }
    return columnWiseData;
  }

  dicttodatasheet(wb: any, sheetName: any) {
    let returned: any = []

    for (var i = 1; i < wb.length; i++) {
      let dictt: any = {}
      for (var k = 0; k < wb[i].length; k++) {
        this.parametertypes.find(x => x.sheetName == sheetName)?.columnTypes.map((item: any) => {
          if (item.name == wb[0][k]) {

            if (item.type == 'date')
              if (wb[i][k] !== null) {

                wb[i][k] = new Date((wb[i][k] - (25569)) * 86400 * 1000)
                const day = wb[i][k].getDate();
                const month = wb[i][k].getMonth() + 1
                const year = wb[i][k].getFullYear()


                wb[i][k] = `${day}/${month}/${year}`

              }
          }

        })
        dictt[wb[0][k]] = wb[i][k]
      }
      returned.push(dictt)
    }

    return returned;
  }

  importExcel(event: any) {

    this.dataBySheets = []

    let sheetData: any = [];

    let file = event.target.files[0];

    const fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = (event: any) => {

      let binaryData = event.target.result;

      let workbook = XLSX.read(binaryData, { type: 'binary' });

      workbook.SheetNames.forEach((sheetName) => {

        let ws = workbook.Sheets[sheetName];

        if (!ws['!ref']) {
          this.toastService.showToast('warning', 'Seçilen Excel dosyasındaki ' + sheetName + ' adlı sheet doğru yüklenememiştir!')
          return
        }

        var range = XLSX.utils.decode_range(ws['!ref']!); // get the range

        var columnWiseData = this.readRowWiseData(range, ws);

        sheetData = this.dicttodatasheet(columnWiseData, sheetName)

        var col: any[] = this.get_header_row(workbook.Sheets[sheetName])

        sheetData.forEach((data: any) => {

          Object.keys(data).forEach(key => {

            if (key.includes('__EMPTY')) {

              delete data[key]

            }

          })

        });

        let dataBySheet: DataBySheet = {

          data: sheetData

        }


        let columnNames = col.filter(column => !column.includes('__EMPTY')).filter(x => !x?.includes('UNKNOWN'))
        if (!this.parametertypes)

          var columntypes = columnNames.map(item => {

            return { name: item, type: typeof (sheetData[0][item]) == 'number' ? 'numeric' : typeof (sheetData[0][item]) == 'string' ? 'text' : 'undefined' }

          })

        let sheet: Sheet = {

          sheetName: sheetName,


          columnNames: this.get_header_row(workbook.Sheets[sheetName])
        }

        dataBySheet.sheet = sheet;

        this.dataBySheets.push(dataBySheet)

      });
      this.changeDataBySheets();

    };

  }

  changeDataBySheets() {
    this.dataBySheetsEmitter.emit(this.dataBySheets)

  }

  changeSheetName(sheetName: string) {
    this.currentSheetNameEmitter.emit(sheetName)
  }

}

