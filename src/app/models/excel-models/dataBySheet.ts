import { Sheet } from './sheet'
import * as XLSX from 'xlsx'

export interface DataBySheet {
    sheet?: Sheet;
    data?: any;
}

export class DataBySheetHelper {
    findBySheetName(data: DataBySheet[], sheetName: string): DataBySheet {
        let returnData = data.find(
            (oneOfData) => oneOfData.sheet?.sheetName == sheetName
        );
        return returnData ? returnData : {};
    }

    findIndexBySheetName(data: DataBySheet[], sheetName: string): number {
        let returnData = data.findIndex(
            (oneOfData) => oneOfData.sheet?.sheetName == sheetName
        );
        return returnData ? returnData : 0;
    }

    getAllSheetNames(data: DataBySheet[]): string[] {
        return data.map((oneOfData) => oneOfData.sheet?.sheetName || '');
    }

    addSheetToDataBySheet(data: DataBySheet[], sheet: Sheet) {
        let dataBySheet: DataBySheet = {
            sheet: sheet,
            data: [],
        };
        return [...data, dataBySheet];
    }

    sheetsToNullDataBySheets(sheets: Sheet[]): DataBySheet[] {
        return sheets.map((sheet) => {
            let nullData: any = {}
            sheet.columnNames.forEach(columnName => {
                nullData[columnName] = ""
            });
            return {
                sheet: sheet,
                data: [nullData]
            }
        })
    }

    dataBySheetsToScriptParameter(dataBySheets: DataBySheet[]) {
        let parameters = dataBySheets.map((dataBySheet) => {
            let obj: any = {};
            obj[dataBySheet.sheet?.sheetName || ''] = dataBySheet.data;
            return obj;
        });
        return parameters;
    }

    scriptParametersToDataBySheets(parameters: any[], coreData: any[]) {
        let dataBySheets = parameters.map((parameter: any, indis: number) => {
            let data = parameter[Object.keys(parameter)[0]]
            let dataBySheet: DataBySheet = {
                sheet: {
                    sheetName: Object.keys(parameter)[0],
                    columnNames: coreData[0]?.find((x: any) => x?.sheet?.sheetName == Object.keys(parameter)[0])?.sheet?.columnNames
                    //columnNames: coreData[indis].columnNames
                },
                data: data
            }
            return dataBySheet;
        })
        return dataBySheets
    }

    exportFromDataBySheets(dataBySheets: DataBySheet[], fileName: string) {
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        dataBySheets.forEach(dataBySheet => {
            let sheet = XLSX.utils.json_to_sheet(dataBySheet.data)
            XLSX.utils.book_append_sheet(wb, sheet, dataBySheet.sheet?.sheetName);
        })
        // let workbook = XLSX.shee(data, { type: 'array' });
        XLSX.writeFile(wb, fileName + ".xlsx");
    }
}