
export enum ChargeCode_rateAssoc {
    All= -1,
    Each_or_Equivalent=1,
    Inner_Pack_Or_Equivalent=5,
    Case_Or_Equivalent=2,
    LPN_or_Equivalent=3
}
export const ChargeCode_TypeText = {
    1: "Flate Rate",
    36: "Inbound Handling Per Kit",
    33: "Inbound Handling Per Kit Volume",
    30: "Inbound Handling Per Kit Weight",
    50: "Inbound Handling Per Net Weight",
    15: "Inbound Handling Per UOM",
    16: "Inbound Handling Per Volume Range",
    18: "Inbound Handling Per Weight",
    17: "Inbound Handling Per Weight Range",
    78: "Inbound Handling Volume Per UOM",
    35: "Inbound Storage Per Kit",
    32: "Inbound Storage Per Kit Volume",
    29:"Inbound Storage Per Kit Weight",
    49: "Inbound Storage Per Net Weight",
    10: "Inbound Storage Per UOM",
    12: "Inbound Storage Per Volume Range",
    14: "Inbound Storage Per Weight",
    13: "Inbound Storage Per Weight Range",
    77: "Inbound Storage Volume Per UOM",
    92: "Inbound Storage WMS Distinct LPNs",
    8: "Item",
    37: "Outbound Shipping Per Kit",
    34: "Outbound Shipping Per Kit Volume",
    31: "Outbound Shipping Per Kit Weight",
    51: "Outbound Shipping Per Net Weight",
    20: "Outbound Shipping Per UOM",
    22: "Outbound Shipping Per Volume Range",
    21: "Outbound Shipping Per Weight",
    79: "Outbound Shipping Volume Per UOM",
    81: "Outbound Shipping Per Full LPN Pick",
    61: "Packed Carton",
    5: "Per Hour",
    42: "Per Kit",
    43: "Per Order Line",
    91: "Per Order Line Range",
    54: "Per Square Foot",
    2: "Per UOM",
    3: "Per Volume",
    6: "Per Volume Range",
    4: "Per Weight",
    7: "Per Weight Range",
    11: "Third Party Shipping",
    19: "Flat Rate Per Carrier",
    25: "Per Label Charge",
    44: "Min Order Charge", 
    60: "Discount",
    63: "Order Total Quantity Range",
    23: "Per CWT",
    24: "Fuel SurCharge",
    45: "Per Stop",
    46: "Driver Detention",
    52: "Per LPN",
    53: "Per Mile",
    75: "WMS Distinct LPNs",
    76: "Carton Stock", 
    90: "Work Order Material"
}
   
    
export enum ChargeCode_Types {
    Flate_Rate = 1,
    Inbound_Handling_Per_Kit = 36,
    Inbound_Handling_Per_Kit_Volume = 33,
    Inbound_Handling_Per_Kit_Weight = 30,
    Inbound_Handling_Per_Net_Weight = 50,
    Inbound_Handling_Per_UOM = 15,
    Inbound_Handling_Per_Volume_Range = 16,
    Inbound_Handling_Per_Weight = 18,
    Inbound_Handling_Per_Weight_Range = 17,
    Inbound_Handling_Volume_Per_UOM = 78,
    Inbound_Storage_Per_Kit = 35,
    Inbound_Storage_Per_Kit_Volume= 32,
    Inbound_Storage_Per_Kit_Weight= 29,
    Inbound_Storage_Per_Net_Weight= 49,
    Inbound_Storage_Per_UOM= 10,
    Inbound_Storage_Per_Volume_Range=12,
    Inbound_Storage_Per_Weight= 14,
    Inbound_Storage_Per_Weight_Range= 13,
    Inbound_Storage_Volume_Per_UOM= 77,
    Inbound_Storage_WMS_Distinct_LPNs= 92,
    Item= 8,
    Outbound_Shipping_Per_Kit= 37,
    Outbound_Shipping_Per_Kit_Volume= 34,
    Outbound_Shipping_Per_Kit_Weight= 31,
    Outbound_Shipping_Per_Net_Weight= 51,
    Outbound_Shipping_Per_UOM= 20,
    Outbound_Shipping_Per_Volume_Range= 22,
    Outbound_Shipping_Per_Weight= 21,
    Outbound_Shipping_Volume_Per_UOM= 79,
    Outbound_Shipping_Per_Full_LPN_Pick= 81,
    Packed_Carton= 61,
    Per_Hour= 5,
    Per_Kit= 42,
    Per_Order_Line= 43,
    Per_Order_Line_Range= 91,
    Per_Square_Foot= 54,
    Per_UOM= 2,
    Per_Volume= 3,
    Per_Volume_Range= 6,
    Per_Weight= 4,
    Per_Weight_Range= 7,
    Third_Party_Shipping= 11,
    Flat_Rate_Per_Carrier= 19,
    Per_Label_Charge= 25,
    Min_Order_Charge= 44, 
    Discount= 60,
    Order_Total_Quantity_Range= 63,
    Per_CWT= 23,
    Fuel_SurCharge= 24,
    Per_Stop= 45,
    Driver_Detention= 46,
    Per_LPN= 52,
    Per_Mile= 53,
    WMS_Distinct_LPNs= 75,
    Carton_Stock= 76, 
    Work_Order_Material= 90
}

export interface DefaultBilling {
    UOMType: DefaultBilling_UOMType,
    ChargeType: DefaultBilling_ChargeType
}
export interface ChargeCodeAPI {
        
    id?: number,
    Code: string,
    Type: ChargeCode_Types,
    businessPartnerId?: number,
    Description: string,
    Rate: number,
    Per?: ChargeCode_rateAssoc,
    Range_From?: number,
    Range_To?: number,
    Min?: number,
    Max?: number,
    GLCode?: string,
    Automatically_add_to_orders?: boolean,
    Visible_On_Barcode_Scanning?: boolean,
    Ranges? : RangesAPI[],
    tieredBilling?: boolean,
    AssignChargeCode?: ChargeCodes_AssignType,
    DefaultBilling?: DefaultBilling[]
    //associatedItemId?:   string,
    //typeText?:           string;
}

// export enum Assign_ChargecodeTypeAPI {
//     Receiving = 1,
//     Shipping = 2,
//     WorkOrder = 3,
//     Transportation = 4
// }

// export interface Assign_ChargeCodeAPI {
//     id? : number,
//     vendor?: number,
//     type: Assign_ChargecodeTypeAPI,
//     charCodeId?: number,
// }

export enum DefaultBilling_UOMType {
    Each=11,
    Inner=21,
    Case=31,
    Kit=32,
    Pallet=41
}

export enum DefaultBilling_ChargeType {
    //RenewalStorage = 1,
    OutboundShipping = 2,
    InboundHandling = 3,
    InboundStorage = 4
}

export enum ChargeCodes_AssignType{
    ReceivingCharges = 1,
    ShippingCharges = 2,
    WorkOrdersCharges = 3,
    Transportation = 4,
}
export enum DefaultBilling_ChargeTypeAPI {
    EacRenewalStorage,          // charteType = 1 && invoiceType = 1 && uomType = 1
    EachOutboundShipping,       // charteType = 2 && invoiceType = 1 && uomType = 1
    EachInboundHandling,        // charteType = 3 && invoiceType = 1 && uomType = 1
    EachInboundStorage,         // charteType = 4 && invoiceType = 2 && uomType = 1
    InnerPackRenewalStorage,    // chargeType = 1 && invoiceType = 1 && uomType = 2
    InnerPackOutboundShipping,  // chargeType = 2 && invoiceType = 2 && uomType = 2
    InnerPackInboundHandling,   // chargeType = 3 && invoiceType = 1 && uomType = 2
    InnerPackInboundStorage,    // chargeType = 4 && invoiceType = 1 && uomType = 2
    CaseRenewalStorage,
    CaseOutboundShipping,
    CaseInboundHandling,
    CaseInboundStorage,
    KitRenewalStorage,
    KitOutboundShipping,
    KitInboundHandling,
    KitInboundStorage,
    PalletRenewalStorage,
    PalletOutboundShipping,
    PalletInboundHandling,
    PalletInboundStorage

}
// export interface ChargeCodeRangesAPI{
//     id?: number,
//     valueFrom: number,
//     valueTo: number,
//     rate: number
// }

export interface ChargeCodes {
    ChargeCodes : ChargeCodeAPI[]
}

export interface RangesAPI {
    id?: number,
    From: number,
    To: number,
    Rate: number
}
