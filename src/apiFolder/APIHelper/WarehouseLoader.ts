import { t } from "testcafe";
import { iWarehouseAPI } from "../interfaces/iWarehouseAPI";
import { WarehouseAPI, WarehouseMode } from "../warehouses";

export const LoadWarehouseData = (warehosue: WarehouseAPI, iwarehouseAPI?: iWarehouseAPI) : iWarehouseAPI=> {

    const WH: iWarehouseAPI = {
        id : warehosue.id ?? iwarehouseAPI?.id,
        category: warehosue.category ?? (iwarehouseAPI?.category?? 0),
        description: warehosue.description ?? (iwarehouseAPI?.description),
        enabled: warehosue.enabled? Number(warehosue.enabled) : (iwarehouseAPI?.enabled ?? Number(true)),
        mode: warehosue.mode? Number(warehosue.mode) : (iwarehouseAPI?.mode ?? Number(WarehouseMode.barcodeScanning)), 
        bonded: warehosue.bonded ?? (iwarehouseAPI?.bonded ?? 1),
        lockedCreate: warehosue.lockedCreate ?? (iwarehouseAPI?.lockedCreate?? 0),
        printGuid: warehosue.printGuid ?? (iwarehouseAPI?.printGuid?? t.ctx.Session),

        address1:         warehosue.address1?? iwarehouseAPI?.address1,
        address2:         warehosue.address2?? iwarehouseAPI?.address2,
        city:             warehosue.city?? iwarehouseAPI?.city,
        state:            warehosue.state?? iwarehouseAPI?.state,
        zip:              warehosue.zip?? iwarehouseAPI?.zip,
        country:          warehosue.country?? iwarehouseAPI?.country,
        adminName:        warehosue.adminName?? iwarehouseAPI?.adminName,
        adminPhone:       warehosue.adminPhone?? iwarehouseAPI?.adminPhone,
        adminEmail:       warehosue.adminEmail?? iwarehouseAPI?.adminEmail,
        opdayMon:         warehosue.opdayMon?? iwarehouseAPI?.opdayMon,
        opdayTue:         warehosue.opdayTue?? iwarehouseAPI?.opdayTue,
        opdayWed:         warehosue.opdayWed?? iwarehouseAPI?.opdayWed,
        opdayThu:         warehosue.opdayThu?? iwarehouseAPI?.opdayThu,
        opdayFri:         warehosue.opdayFri?? iwarehouseAPI?.opdayFri,
        opdaySat:         warehosue.opdaySat?? iwarehouseAPI?.opdaySat,
        opdaySun:         warehosue.opdaySun?? iwarehouseAPI?.opdaySun,
        clazz:            warehosue.clazz?? iwarehouseAPI?.clazz,
        nlIP:             warehosue.nlIP?? iwarehouseAPI?.nlIP,
        nlPort:           warehosue.nlPort?? iwarehouseAPI?.nlPort,
        nlLabelDirectory: warehosue.nlLabelDirectory?? iwarehouseAPI?.nlLabelDirectory,
        invoiceSequence:  warehosue.invoiceSequence?? iwarehouseAPI?.invoiceSequence
    }
    return WH;
}