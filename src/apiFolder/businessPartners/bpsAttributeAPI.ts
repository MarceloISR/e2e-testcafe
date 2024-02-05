

export const attributesIds = {
    General_Properties: {  
        allocation_mode: 104
    },
    Receiving : {
        Barcode_Scanning_style: 94,
        Barcode_Scanning: 83,
        LPNs : 70,
    },

    Barcode_Scanning: {
        Pick_to_Mode: 566,
        Putaway_Prioritizaion: 1019,
        Putaway_Style: 561,
        Enable_Variable_lot_Code: 378,
        Enable_Variable_Sub_Lot_code: 379,
        Pallet_LPN_Label_type: 540
    },

    Billing:{
        Renewal_Storage_Mode: 93,
        Anniversary_Cycle_in_Days: 575
    },
    Shipping:{
        Barcode_Scanning: 312,
        Barcode_Scanning_Style: 95,
        
    },
    Inventory:{
        Track_lot_codes: 48,
        Track_Sub_lot_Codes: 41,
        Allocation_Mode: 147
    },
    Work_Orders:{
        Mode: 1021,
        Barcode_Scanning: 354,
        Auto_Generate_Word_Orders_Number: 388,
        Replenish_on_Pick_Ticket_creation: 1022,
        Replenish_on_Pick_Ticket_Completion: 1023,
        Work_Order_Sequence: 389,
    }
}
export enum WorkOrders_Modes {
    FIFO=0,
    LIFO=1,
    FEFO=2
}
export enum GeneralProperties_AllocationMode{
    Automatic= 0,
    Manual   = 1
}
export enum Receiving_BarcodeScanningStyles {
    SSCC=1,
    Line= 2,
    UPC = 6
}

export enum BarcodeScanning_PickToMode {
    None = -1,
    Pallet= 1,
    Carton= 2,
    Tote= 3,
    Location_Only= 100
}
export enum BarcodeScanning_PutawayPrioritization {
    Location_Ascending= 0,
    Least_Occupied= 1,
    Most_Occupied= 2
}
export enum BarcodeScanning_PutawayStyle {
    None= 0,
    Item_Code= 1,
    Item_and_LotCode= 2,
    Item_lot_and_SublotCode= 3,
    LotCode= 4,
    SubLotCode= 5
}

export enum Billing_RenewalStorageMode {
    Order_Fulfillment= 1,
    Daily_rate= 3,
    Anniversary= 4,
    Order_Fulfillment_Vol_Range= 7,
    Order_Fulfillment_Vol_Range_UOM= 8,
    Occupied_Locations= 9,
    Peak= 10,
    Average= 11
}

export enum BarcodeScanning_PalletLPNLabelTypes {
    Pre_Printed=1,
    System_generated_On_Scan=2,
    System_generated_On_Line_Create=3
}

export enum Shipping_BarcodeScanningStyle {
    SSCC=1,
    Line= 2,
    Manual_ILS= 3,
    UPC_Lookup= 6
}

export enum Inventory_AllocationMode {
    FIFO= 0,
    LIFO= 1,
    FEFO= 8,
    Location_Ascending= 2,
    Location_Descending= 3,
    Primary_Pick1= 4,
    Primary_Pick2= 7,
    Pick_to_clean= 5,
    Largest_Exact_Qty_Palelt= 6,
    Forward_Picking=10
}

export interface attributeAPI {
    id?: number,
    General_Properties?: {  
        allocation_mode?: GeneralProperties_AllocationMode
    },
    Receiving? : {
        Barcode_Scanning_style?: Receiving_BarcodeScanningStyles
        Barcode_Scanning?: boolean,
        LPNs?: boolean,

    },

    Barcode_Scanning?: {
        Pick_to_Mode?: BarcodeScanning_PickToMode,
        Putaway_Prioritizaion?: BarcodeScanning_PutawayPrioritization,
        Putaway_Style?: BarcodeScanning_PutawayStyle,
        Enable_Variable_lot_Code?: boolean,
        Enable_Variable_Sub_Lot_code?: boolean,
        Pallet_LPN_Label_Type?: BarcodeScanning_PalletLPNLabelTypes,
    },

    Billing?:{
        Renewal_Storage_Mode?: Billing_RenewalStorageMode
        Anniversary_Cycle_in_Days?: Number
    },
    /**
     *@example Shipping: { Barcode_Scanning: true, Barcode_Scanning_Style} 
     */
    Shipping?:{
        Barcode_Scanning?: boolean,
        Barcode_Scanning_Style?: Shipping_BarcodeScanningStyle
    },
    Inventory?:{
        Track_lot_codes?: boolean,
        Track_Sub_lot_Codes?: boolean,
        Allocation_Mode?: Inventory_AllocationMode,
        Track_expiration_date? : boolean,
    },
    Work_Orders?: {
        Barcode_Scanning?: boolean,
        Replenish_on_Pick_Ticket_creation?: boolean,
        Replenish_on_Pick_Ticket_Completion?: boolean,
        Mode?: WorkOrders_Modes,
        Auto_Generate_Word_Orders_Number?: boolean,
        Work_Order_Sequence?: string,
    }
}


