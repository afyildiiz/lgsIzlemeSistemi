export interface Sheet {
    sheetName: string,
    columnNames: string[]
}

export interface ParameterTypes {
    sheetName: string,
    columnTypes: { name: string, type: string }[]
}

export default class SheetHelper {

    createSheet(sheetName: String, columnNames: string[]) {
        return {
            sheetName: sheetName,
            columnNames: columnNames
        } as Sheet
    }

    createColType(sheetName: String, columnTypes: { name: string, type: string }[]) {
        return {
            sheetName: sheetName,
            columnTypes: columnTypes
        } as ParameterTypes
    }

    findSheetByName(sheets: Sheet[], sheetName: string): Sheet {
        let returnData = sheets.find(sheet => sheet.sheetName == sheetName);
        return returnData ? returnData : {} as Sheet;
    }

    deleteSheet(sheets: Sheet[], index: number): Sheet[] | [] {
        return sheets.filter((e: Sheet, i: number) => i != index)
    }

}