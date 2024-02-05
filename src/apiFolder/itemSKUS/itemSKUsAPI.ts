

import { Velocity } from "../APIHelper/StorageLocationLoader";
import { InventoryAdjustmentAPI } from "../inventory";


export enum Item_UOMType{
    Each = 1,
    InnerPack = 2,
    Case= 3
}

export interface UPCAPI {
    id?: number,
    description: string,
    upc: string,
    itemId?: number,
    lotCode?: string,
    subLoteCode?: string
}
export interface UOMAPI {
    id?: number,
    vendorId?: number,
    itemId?: number,
    si?: string,
    style?: 1 | number,

    //Type: Item_UOMType, 
    Abbreviation?: string,
    Description?: string,
    HasInnerpack?: boolean,
    Length?: number, // Depth
    Width?: number,
    GrossLBS?: number, //Weight
    Height?: number, 
    Tare?: number, //Tare
    caseMaxStackWeight?: number,
    //QTY_IP_CS?: number, //eaCaseQty
    //QTY_EA_IP?: number, //ipCaseQty
    CaseQty?: number,
    InnerQty?: number,
    Pallet_Tie?: number,
    Pallet_High?: number,
    Pallet_MaxStackWeight?: number, 
}

export interface ItemsAPI {
    warehouseId: number,
    Items: ItemAPI[]
}

export interface ReplenishmentItemAPI {
    
        id?: number,
        //itemId?: number,
        lot?: string,
        sublot?: string,
        warehouse: string,
        enabled: boolean,
        auto: boolean,
        thresholdQty: number,
        replenQty: number,
        maxQty: number,
        storageGroup?: string
}

export interface ItemAPI {
    Id?: number,
    type?: number,
    Enabled?: boolean,
    ItemCode: string,
    Description?: string,
    Vendor: string,
    AccoundId?: number,
    SKU?: string,
    UOM_type : Item_UOMType, 
    buildable?: number, //default 1
    Order_Velocity?: Velocity, //category
    UOM?: UOMAPI,
    UPC?: UPCAPI[],
    Declared_Value?: number, //valuePerEach
    MaxTemp? : number,
    MinTemp?: number,
    SpecialInstructions? : string,
    inventoryAdjustment?: InventoryAdjustmentAPI[],
    defaultOuom?: number,
    Replenishment?: ReplenishmentItemAPI[],
    Storage?: ItemStorageAPI[]
}

export interface ItemStorageAPI {
    Location: string,
    Type: ItemStorageTypeAPI, 
    Warehouse: string
}

export enum ItemStorageTypeAPI {
    PrimaryPickLocations = 1,
    ReplenishmentLocations = 2,
    PutAwayLocations = 3
}
