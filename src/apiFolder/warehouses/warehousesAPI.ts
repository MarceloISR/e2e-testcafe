

export enum WarehouseMode {
    paper = 1,
    barcodeScanning = 3
}

export interface WarehouseAPI {
    id?: number,
    enabled?: boolean, //default 1
    bonded?: number, //default 1
    category?: number,
    description: string,
    printGuid?: string,
    lockedCreate?: number, //default 0
    mode?: WarehouseMode, // 1=paper , 3=barcodescanning

  
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    adminName?: string,
    adminPhone?: string,
    adminEmail?: string,
    opdayMon?: number,
    opdayTue?: number,
    opdayWed?: number,
    opdayThu?: number,
    opdayFri?: number,
    opdaySat?: number,
    opdaySun?: number,
    clazz?: string,
    nlIP?: string,
    nlPort?: string,
    nlLabelDirectory?: string,
    invoiceSequence?: string,

}


