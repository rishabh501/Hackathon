export class UploadResponse {
  constructor(public totalRows: string, public totalColumns: string, public data: Data[]) { }
}

export class Data {
  constructor(public rowNumber: string, public columnNumber: string, public word: string, public confidence: string){}
}

