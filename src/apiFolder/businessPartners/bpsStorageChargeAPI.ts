// export interface BillingSchedule {
//     Range_From: number,
//     Range_To: number,
//     Rate: number,
//     id?: number

import { DefaultBilling_UOMType, RangesAPI } from "./bpsChargeCodeAPI";



// }
export enum StorageCharge_rateAssoc {
    All = 1,
    Each_or_Equivalent= 0,
    Inner_Pack_Or_Equivalent=5, 
    Case_or_Equivalent= 2,
    LPN_or_Equivalent= 3
}
export enum StorageCharge_Types {
    Each_or_Equivalent= 1,	
    Inner_Pack_or_Equivalent= 5,	
    Case_or_Equivalent= 2,
    LPN_or_Equivalent= 3, //Billing Schedule
    Per_Item_Weight= 9,
    Per_item_Volume= 8,
    Per_Kit_Weight= 11,
    Per_Kit_Volume= 12,
    Per_Kit= 13,
    Storage_Type_Per_LPN= 14,
    Per_Item_Net_Weigt= 15,
    Per_Square_Foot= 16,
    Per_Volume_Range_per_UOM= 24,	
    Per_Volume_Range=23,	
    Per_Occupied_Location= 25,	//Billing Schedule
    Volume_Per_UOM= 26
}

export enum BillingScheduleType {
    Flat_Rate= 1,
    Quantity_Schedule= 2,
    Quantity_Aging= 3,
}

export interface StorageChargeAPI {
    id?: number,
    //Code: string,
    Type: StorageCharge_Types,
 
    businessPartnerId?: number,
    Description: string,
    Rate: number,
    Per: StorageCharge_rateAssoc,

    Range_From?: number,
    Range_To?: number,
    Min?: number,
    Max?: number,
    GLCode?: string,
    Class?: number,
    BillingScheduleType?: BillingScheduleType,
    BillingSchedules?: RangesAPI[],

    DefaultBilling?: [{
            UOMType: DefaultBilling_UOMType,
    }]
};

export interface ListStorageCharges{
    StorageCharge: StorageChargeAPI[]; 
}

