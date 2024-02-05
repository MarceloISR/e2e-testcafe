
/*************** IMPORTS ***************/
import { GeneralProperties_AllocationMode } from "../../../src/api-folder/businessPartners";
import { Item_UOMType } from "../../../src/api-folder/itemSKUS";
import { scenario } from "../../../src/utils";

/*************** CONSTANS & VARIABLES ***************/
export const variables = {
    warehouse :  `Barcode Scanning`,
    itemCode : `T-Shirt`,
    itemDescription : 'T-Shirt',
    account : `Automatic Allocation`,
    storage1 : `Generic1`,
    lotCode : 'BLK',
    subLotCode : 'L',
}

/*************** SCENARIO DEFINITION ***************/
const scenario: scenario = {
    CredentialGroup: 'TRIAL',
    warehouse: {
        description: variables.warehouse
    },
    
    businessPartners: [
        { // 1st Business Partner
            Vendor: variables.account,
            Description: variables.account,
            Attributes: {
                General_Properties: {
                    allocation_mode: GeneralProperties_AllocationMode.Automatic,
                },
                Receiving: {
                    LPNs: false,
                    Barcode_Scanning: true,
                },
                Shipping: {
                    Barcode_Scanning: true,
                },
                Inventory: {
                    Track_lot_codes: true,
                    Track_Sub_lot_Codes: true
                }
            },
        }
    ],
    storageLocations: {
        Locations:[
            { // 1st Location
                Description: variables.storage1,
                Height: 99999,
                Length: 99999,
                MaxLPN: 99999,
                MaxWeight: 999999,
                Width: 99999,
                LocationType: {
                    Bulk_Storage_Putaway: true,
                    Pick_Allocation: true,
                    Project: true,
                    Rack_Storage_Putaway: true,
                    Receiving_Dock: true,
                    Receiving_Stage: true,
                    Shipping_Dock: true,
                    Shipping_Stage: true,
                },
                Enabled: true,
            }
        ]
    },
    items: [
        { // 1st Item
            ItemCode: variables.itemCode,
            Description: variables.itemDescription,
            UOM_type: Item_UOMType.Each,
            Vendor: variables.account,
            Enabled: true,
            UOM: {
                Height: 10,
                Length: 10,
                Width: 10,
                GrossLBS: 10,
                Pallet_Tie: 4,
                Pallet_High: 5
            }
        },
    ],
    inventoryAdjustment: {
        warehouse: {
            description: variables.warehouse,
            //mode: WarehouseMode.paper,
        },
        itemAdjustment: [
            {
                itemCode: variables.itemCode,
                //emptyInventory: true
            }
        ]
    },
}

/*************** EXPORT SCENARIO *****************/
export const Scenario = {
    Scenario: scenario,
    Variable: variables
}