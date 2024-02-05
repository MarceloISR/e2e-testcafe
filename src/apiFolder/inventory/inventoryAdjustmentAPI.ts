

  //https://qa-ecs.wdgcorp.com:8443/v1/0000000007/FellowShip/2bedb477-3038-436a-aa80-af71eb4fe31f/whses/1/inv/adjustment

import { WarehouseAPI } from "../warehouses"

  export enum InventoryAdjustment_Status {
    available=1,
    hold=3,
    quarantine=4,
    damaged=5
  
  }
  export interface InventoryAdjustmentsAPI{
    warehouse? : WarehouseAPI,
    vendor?: string,
    itemAdjustment: InventoryAdjustmentAPI[]
  }
  
  export interface InventoryAdjustmentAPI{
    emptyInventory?: boolean;
    itemCode?: string,
    itemDescription? : string,
    itemId?: number,
    status?: InventoryAdjustment_Status,
    qty?: number,
    storageIdentifier?: string,
    lpn?: string,
    lot?: string,
    sublot?: string,
    warehouseId?: number,
    gWeigth?: number,
    vendor?: string,
    expirationDate?: string
  }