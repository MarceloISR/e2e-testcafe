/*************** IMPORTS ***************/

import { BarcodeScanning_PutawayPrioritization, BarcodeScanning_PutawayStyle, Billing_RenewalStorageMode, GeneralProperties_AllocationMode, Receiving_BarcodeScanningStyles, Shipping_BarcodeScanningStyle } from "../../src/apiFolder/businessPartners";
import { InventoryAdjustment_Status } from "../../src/apiFolder/inventory";
import { Item_UOMType } from "../../src/apiFolder/itemSKUS";
import { scenario } from "../../src/utils";


/*************** CONSTANS & VARIABLES ***************/
const variables = {
    
    warehouse :  `AutoBarcodeScanning`,
    itemCode : `T-Shirt`,
    account : `AutoPutaway`,
    
    Receive : `PA-RCV`,
    Loc1 : `PA-Loc1`,
    Loc2 : `PA-Loc2`,
    Loc3 : `PA-Loc3`,
    Loc4 : `PA-Loc4`,
    Emtpy5 : `PA-Empty5`,
    Emtpy6 : `PA-Empty6`,
    
    lpnRCV00 : `PA-RCV-00`,
    lpnRCV01 : `PA-RCV-01`,
    lpnRCV02 : `PA-RCV-02`,
    
    lpnLoc01 : `PA-LPN-01`,
    lpnLoc02 : `PA-LPN-02`,
    lpnLoc03 : `PA-LPN-03`,
    lpnLoc04 : `PA-LPN-04`,

    lotWHT: 'WHT',
    lotBLK: 'BLK',
    subLotL: 'L',
    sublotM: 'M',
    sublotS: 'S'
}

/*************** SCENARIO DEFINITION ***************/
const scenario: scenario = {
    CredentialGroup: "TRIAL",
    warehouse: {
        description: variables.warehouse,
    },
    businessPartners: [
        { // 1st Business Partner
            Vendor: variables.account,
            Description: variables.account,
            Attributes:{
                General_Properties:{
                    allocation_mode: GeneralProperties_AllocationMode.Manual
                },
                Barcode_Scanning: {
                    Putaway_Prioritizaion:BarcodeScanning_PutawayPrioritization.Location_Ascending,
                    Putaway_Style: BarcodeScanning_PutawayStyle.Item_Code
                },
                Inventory: {
                    Track_lot_codes: true,
                    Track_Sub_lot_Codes: true
                },
                Shipping:{
                    Barcode_Scanning: true,
                    Barcode_Scanning_Style: Shipping_BarcodeScanningStyle.Line,
                },
                Receiving: {
                    Barcode_Scanning: true,
                    Barcode_Scanning_style: Receiving_BarcodeScanningStyles.Line
                }
             
            }
        }
    ],
    /*storageLocations: {
        Locations:[
            { // Receive location
                Description: variables.Receive,
                Length: 99999,
                Width: 99999,
                Height: 99999,
                MaxWeight: 999999,
                MaxLPN: 99999,
                
                Vendor: variables.account,
                LocationType:{
                    Receiving_Dock: true,
                    Receiving_Stage:true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Location1 Location
                Description: variables.Loc1,
                Length: 35,
                Width: 10,
                Height: 50,
                MaxWeight: 4,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Location2 Location
                Description: variables.Loc2,
                Length: 35,
                Width: 10,
                Height: 50,
                MaxWeight: 4,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Location3 Location
                Description: variables.Loc3,
                Length: 35,
                Width: 10,
                Height: 50,
                MaxWeight: 4,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Location4 Location
                Description: variables.Loc4,
                Length: 35,
                Width: 10,
                Height: 50,
                MaxWeight: 4,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Empty5 Location
                Description: variables.Emtpy5,
                Length: 35,
                Width: 10,
                Height: 80,
                MaxWeight: 6,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            },
            { // Empty6 Location
                Description: variables.Emtpy6,
                Length: 35,
                Width: 10,
                Height: 80,
                MaxWeight: 6,
                MaxLPN: 2,
                
                Vendor: variables.account,
                LocationType:{
                    Bulk_Storage_Putaway:true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true
                },
                Inventory_Status:{
                    Allow_Damaged: true,
                    Allow_Hold:true,
                    Allow_Quarantine:true
                }
            }
        ]
    },*/
    /*items: [
        { // 1st Item
            ItemCode : variables.itemCode, 
            Vendor: variables.account,
            Enabled: true,
            UOM_type: Item_UOMType.Each,
            UOM:{
                Length: 8.99,
                Width: 9.91,
                Height: 9.82,
                GrossLBS: 0.19,
                Pallet_Tie: 5,
                Pallet_High: 4
            }
        }
    ],*/
    inventoryAdjustment: {
        itemAdjustment: [
            { // Receiving  | RCV-00 | t-shirt   | WHT | M       | 10
                itemCode: variables.itemCode,
                lpn: variables.lpnRCV00,
                qty: 10,
                emptyInventory: true,
                lot: variables.lotWHT, //WHT
                sublot: variables.sublotM, //"M",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Receive,
            },
            { // Receiving  | RCV-00 | t-shirt   | BLK | S       | 10
                itemCode: variables.itemCode,
                lpn: variables.lpnRCV00,
                qty: 10,
                lot: variables.lotBLK, //"BLK",
                sublot: variables.sublotS, //"S",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Receive,
            },
            { // Receiving  | RCV-01 | t-shirt   | BLK | L       | 3
                itemCode: variables.itemCode,
                lpn: variables.lpnRCV01,
                qty: 3,
                lot: variables.lotBLK,  //"BLK",
                sublot: variables.subLotL, //"L",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Receive,
            },
            { // Receiving  | RCV-02 | t-shirt   | BLK | L       | 2
                itemCode: variables.itemCode,
                lpn: variables.lpnRCV02,
                qty: 2,
                lot: variables.lotBLK, //"BLK",
                sublot: variables.subLotL, //"L",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Receive,
            },
            { // Storage-01 | LPN-01 | t-shirt   | WHT | M       | 5
                itemCode: variables.itemCode,
                lpn: variables.lpnLoc01,
                qty: 5,
                lot: variables.lotWHT,  //"WHT",
                sublot: variables.sublotM,  // "M",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc1,
            },
            { // Storage-02 | LPN-02 | t-shirt   | BLK | S       | 7
                itemCode: variables.itemCode,
                lpn: variables.lpnLoc02,
                qty: 7,
                lot: variables.lotBLK, //"BLK",
                sublot: variables.sublotS, //"S",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc2,
            },
            { // Storage-03 | LPN-03 | t-shirt   | WHT | L       | 15
                itemCode: variables.itemCode,
                lpn: variables.lpnLoc03,
                qty: 15,
                lot: variables.lotWHT, //"WHT",
                sublot: variables.subLotL, //"L",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc3,
            },
            { // Storage-04 | LPN-04 | t-shirt   | BLK | L       | 15
                itemCode: variables.itemCode,
                lpn: variables.lpnLoc04,
                qty: 15,
                lot: variables.lotBLK, //"BLK",
                sublot: variables.subLotL, //"L",
                status: InventoryAdjustment_Status.available,
                storageIdentifier: variables.Loc4,
            }
        ]
    },
}

/*************** EXPORT SCENARIO *****************/
export const Scenario = {
    Scenario: scenario,
    Variable: variables
}