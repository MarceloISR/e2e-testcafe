
import { WarehouseAPI } from "../warehouses";

export enum OnRelocate_ChangeInventoryStatusAPI {
    Do_Not_Change_Inventory_Status = 0,
    Available = 1,
    Damaged = 3,
    Hold = 2,
    Quarantined = 4,

}
export enum OnRelocate_ConvertUnitOfMeasureAPI {
    Do_Not_Change_UOM = 0,
    Each_Or_Equivalent = 1,
    Case_Or_Equivalent = 2,
    InnerPack_or_Equivalent = 4
}

export interface StorageLocationsAPI {
    warehouseId?: WarehouseAPI,
    Vendor?: string,
    Locations?: StorageLocationAPI[]
}

export interface StorageLocationAPI {
    Account? : string,
    id?:number,
    Category?: number, //default 0
    Description: string,
    Enabled?: boolean,
    StorageId?: string,
    Type?: number, //default 1
    WarehouseId?: number,
    Zone?: string,
    Aisle?: string,
    Level?: string,
    Bay?: string,
    Slot?: string,
    Length?: number, //Length
    Width?: number, //width
    Height?: number,
    MaxWeight?: number, //weightMax
    TempMax?: number, //tempMax
    TempMin?: number, //tempMin
    StorageClass?: number,
    MaxLPN?: number,
    Group?: string,
    Rate?: number,
    Inventory_Type?: {
        Each_Or_Equivalent?: boolean,
        Case_MasterPack_InnerPack_Kit_Or_Equivalent?: boolean,
        LPN_Or_Equivalent?: boolean
    },
    LocationType?: {
        Receiving_Dock?: boolean, //modeRecvDock
        Receiving_Stage?: boolean, //modeRecvStage
        Bulk_Storage_Putaway?: boolean, //modePutawayBulk
        Rack_Storage_Putaway?: boolean, //modePutawayRack
        Pick_Allocation?: boolean, //modePick
        Project?: boolean, //modeProject
        Shipping_Stage?: boolean, //modeShipStage
        Shipping_Dock?: boolean //modeShipDock
    },
    Sequence?: number, // PickStyle
    Change_inventory_Status?: OnRelocate_ChangeInventoryStatusAPI, //invstatusAction
    Convert_Unit_of_Measure?: OnRelocate_ConvertUnitOfMeasureAPI, //uomAction
    Item_Velocity?: {
        VelocityAny?: boolean, //Velocity0
        VelocityA?: boolean, //VelocityA
        VelocityB?: boolean, //VelocityB
        VelocityC?: boolean, //VelocityC
        VelocityD?: boolean, //VelocityD
    },

    Inventory_Status?: {
        Allow_Damaged?: boolean, //allowDamaged
        Allow_Hold?: boolean, //allowHold
        Allow_Quarantine?: boolean //allowQuarantine
    } 

    Vendor?: string
    
}