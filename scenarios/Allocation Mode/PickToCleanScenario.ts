import { GeneralProperties_AllocationMode, Inventory_AllocationMode, Shipping_BarcodeScanningStyle } from "../../src/api-folder/businessPartners"
import { InventoryAdjustment_Status } from "../../src/api-folder/inventory"
import { Item_UOMType } from "../../src/api-folder/itemSKUS"
import { scenario } from "../../src/utils"

/*************** CONSTANS & VARIABLES ***************/
const variables = {
    Warehouse : 'Barcode Scanning',
    Account: 'Allocation Account',
    Item: 'Item1',
    Location1: "Allocation G1",
    Location2: "Allocation G2",
    Location3: "Allocation G3",
    Location4: "Allocation G4",

    LPN1: 'AllocationLPN-01',
    LPN2: 'AllocationLPN-02',
    LPN3: 'AllocationLPN-03',
    LPN4: 'AllocationLPN-04',

    ReplenishmentGroup: "ReplenishGroup"
}

/*************** SCENARIO DEFINITION ***************/
const scenario : scenario ={

    warehouse: { description: variables.Warehouse},
    businessPartners: [
        {
            Description: variables.Account,
            Attributes: {
                Shipping: {
                    Barcode_Scanning: true,
                    Barcode_Scanning_Style: Shipping_BarcodeScanningStyle.Line
                },
                Inventory: {
                    Allocation_Mode: Inventory_AllocationMode.Pick_to_clean
                },
                General_Properties: {
                    allocation_mode: GeneralProperties_AllocationMode.Automatic
                }
                
            }
        },
    ],
    storageLocations: {
        Locations:[
            {
                Description: 'Allocation G1',
                Account: 'Allocation Account',
                Height: 99999,
                MaxWeight: 99999,
                Length: 99999,
                MaxLPN: 99999,
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
            },
            {
                Description: 'Allocation G2',
                Account: 'Allocation Account',
                Height: 99999,
                MaxWeight: 99999,
                Length: 99999,
                MaxLPN: 99999,
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
        {
            ItemCode: variables.Item,
            UOM_type: Item_UOMType.Each,
            Vendor: variables.Account, //"Allocation Account",
            UOM: {
                Height: 1,
                Length: 1,
                Width: 1,
                GrossLBS: 1,
                Pallet_Tie: 4,
                Pallet_High: 5
            }
        }
    ],
    inventoryAdjustment: {
        vendor: variables.Account,//'Allocation Account',
        itemAdjustment: [
            {
                emptyInventory: true,
                itemCode: variables.Item,//'Item1',
                itemDescription: variables.Account,//'Item1',
                status: InventoryAdjustment_Status.available,
                lpn: variables.LPN1,//'AllocationLPN-01',
                storageIdentifier: variables.Location1,//'Allocation G1',
                qty: 10
            },
            {
                itemCode: variables.Item, //'Item1',
                itemDescription: variables.Item, //'Item1',
                status: InventoryAdjustment_Status.available,
                lpn: variables.LPN2,//'AllocationLPN-02',
                storageIdentifier: variables.Location1,//'Allocation G1',
                qty: 20
            },
            {
                itemCode: variables.Item, //'Item1',
                itemDescription: variables.Item, //'Item1',
                status: InventoryAdjustment_Status.available,
                lpn: variables.LPN3,//'AllocationLPN-03',
                storageIdentifier: variables.Location2,//'Allocation G2',
                qty: 5
            },
            {
                itemCode: variables.Item, //'Item1',
                itemDescription: variables.Item, //'Item1',
                status: InventoryAdjustment_Status.available,
                lpn: variables.LPN4,//'AllocationLPN-04',
                storageIdentifier: variables.Location2,//'Allocation G2',
                qty: 2
            }
        ]
    },
    storageGroups: [
        {
            name: variables.ReplenishmentGroup,
            storageLocations: [ 
                variables.LPN1,//"Allocation G1",
                variables.LPN2,//"Allocation G2",
                variables.LPN3,//"Allocation G3",
                variables.LPN4,//"Allocation G4",
            ],
            warehouse: variables.Warehouse
        }
    ]
}

/*************** EXPORT SCENARIO *****************/
export const Scenario = {
    Scenario: scenario,
    Variable: variables
}

