/*************** IMPORTS ***************/
import { GeneralProperties_AllocationMode, Inventory_AllocationMode, Receiving_BarcodeScanningStyles, Shipping_BarcodeScanningStyle, WorkOrders_Modes } from '../../src/api-folder/businessPartners';
import { InventoryAdjustment_Status } from '../../src/api-folder/inventory';
import { ItemStorageTypeAPI, Item_UOMType } from '../../src/api-folder/itemSKUS';
import { OnRelocate_ChangeInventoryStatusAPI, OnRelocate_ConvertUnitOfMeasureAPI } from '../../src/api-folder/storageLocations';
import { WarehouseMode } from '../../src/api-folder/warehouses';
import { UniqueValue, scenario } from '../../src/utils';


/*************** CONSTANS & VARIABLES ***************/
const variables = {
    warehouse :  `AutoBarcodeScanning`,
    itemCode : "ItemRep",
    itemDescription1: "ItemEach",
    itemDescription2: "ItemCase",
    account : "AutoReplenishment",

    reserve : "Rep-RSV",
    Loc1 : "Rep-Loc1",
    Loc2 : "Rep-Loc2",
    PickFace : "Rep-PF1",
    lpn1 : "REP1",
    lpn2 : "REP2",
    lpn3 : "REP3",

    Lot: 'A',
    subLot: '1'
}
/*************** SCENARIO DEFINITION ***************/
const scenario: scenario = {
    CredentialGroup: "TRIAL",
    warehouse: {
        description: variables.warehouse,
    },
    businessPartners: [
        {
            Vendor: variables.account,
            Description: variables.account,
            Attributes:{
                General_Properties: {
                    allocation_mode: GeneralProperties_AllocationMode.Manual
                },
                Receiving: {
                    Barcode_Scanning: true,
                    Barcode_Scanning_style: Receiving_BarcodeScanningStyles.Line,
                    LPNs: true,
                },
                Inventory: {
                    Allocation_Mode: Inventory_AllocationMode.Primary_Pick1,
                    Track_expiration_date: true,
                    Track_lot_codes: true, 
                    Track_Sub_lot_Codes: true
                },
                Shipping: {
                    Barcode_Scanning: true,
                    Barcode_Scanning_Style: Shipping_BarcodeScanningStyle.Line
                },
                Work_Orders: {
                    Barcode_Scanning: true,
                    Replenish_on_Pick_Ticket_creation: true,
                }

            }
        }
    ],
    /*storageLocations: {
        Locations:[
            {
                Description: variables.Loc1,
                Height: 1000,
                Length: 1000,
                MaxLPN: 1000,
                MaxWeight: 1000,
                Width: 1000,
                Inventory_Status: {
                    Allow_Damaged: false,
                    Allow_Hold: false,
                    Allow_Quarantine: false
                },
                LocationType: {
                    Rack_Storage_Putaway: true,
                    
                },
                
                Convert_Unit_of_Measure: OnRelocate_ConvertUnitOfMeasureAPI.Each_Or_Equivalent,
            },
            {
                Description: variables.Loc2,
                Height: 1000,
                Length: 1000,
                MaxLPN: 1000,
                MaxWeight: 1000,
                Width: 1000,
                Inventory_Status: {
                    Allow_Damaged: false,
                    Allow_Hold: false,
                    Allow_Quarantine: false
                },
                LocationType: {
                    Rack_Storage_Putaway: true,
                    
                },
                Convert_Unit_of_Measure: OnRelocate_ConvertUnitOfMeasureAPI.Do_Not_Change_UOM,
            },
            {
                Description: variables.PickFace,
                Height: 1000,
                Length: 1000,
                MaxLPN: 1000,
                MaxWeight: 1000,
                Width: 1000,
                Inventory_Status: {
                    Allow_Damaged: false,
                    Allow_Hold: false,
                    Allow_Quarantine: false
                },
                LocationType: {
                    Rack_Storage_Putaway: true,
                    Pick_Allocation: true,
                },
                Convert_Unit_of_Measure: OnRelocate_ConvertUnitOfMeasureAPI.Each_Or_Equivalent,
            }
        ]
    },*/
    /*items: [
        {
            ItemCode : variables.itemCode, 
            Description: variables.itemDescription1,
            Vendor: variables.account,
            Enabled: true,
            UOM_type: Item_UOMType.Each,
            UOM: {
                Width: 1,
                Length: 1,
                Height: 1,
                GrossLBS: 1,
                Pallet_High: 5,
                Pallet_Tie: 5,
                
            },
            Replenishment: [
                {
                    auto: true,
                    enabled: true,
                    maxQty: 50,
                    lot: 'A',
                    sublot: '1',
                    replenQty: 40,
                    thresholdQty: 20,
                    warehouse: variables.warehouse, 
                    //storageGroup: 'RepGroup',
                }
            ],
            Storage:[
                {
                    Location: variables.PickFace,
                    Type: ItemStorageTypeAPI.PrimaryPickLocations,
                    Warehouse: variables.warehouse
                }
            ]
            
        },
        {
            ItemCode : variables.itemCode, 
            Description: variables.itemDescription2,
            Vendor: variables.account,
            Enabled: true,
            UOM_type: Item_UOMType.Case,
            UOM: {
                CaseQty:5,
                Length: 5,
                Width: 5,
                Height: 5,
                GrossLBS: 5,
                Pallet_Tie: 1,
                Pallet_High: 5
            }
        }
    ],*/
    inventoryAdjustment: {
        itemAdjustment: [
            {
                emptyInventory: true,
                itemCode: variables.itemCode,
                itemDescription: variables.itemDescription1,
                lpn: variables.lpn1,
                qty: 15,
                lot: variables.Lot,//'A',
                sublot: variables.subLot,//'1',
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.PickFace,
            },
            {
                emptyInventory: true,
                itemCode: variables.itemCode,
                itemDescription: variables.itemDescription2,
                expirationDate: "2023-10-02T08:00:00.000Z",
                lpn: variables.lpn1,
                lot: variables.Lot,//'A',
                sublot: variables.subLot,//'1',
                qty: 50,
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc1
            },
            {
                emptyInventory: true,
                itemCode: variables.itemCode,
                itemDescription: variables.itemDescription2,
                expirationDate: "2023-09-30T08:00:00.000Z",
                lpn: variables.lpn2,
                lot: variables.Lot,//'A',
                sublot: variables.subLot,//'1',
                qty: 50,
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc1
            },
            {
                emptyInventory: true,
                itemCode: variables.itemCode,
                itemDescription: variables.itemDescription2,
                expirationDate: "2023-10-01T08:00:00.000Z",
                lpn: variables.lpn3,
                lot: variables.Lot,//'A',
                sublot: variables.subLot,//'1',
                qty: 50,
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc1
            }
            
        ]
    },
}

export const Replenishment = {
    Scenario: scenario,
    Variables: variables,
}