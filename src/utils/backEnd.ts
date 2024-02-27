import { API, RF, SetAPICredentials, SetRFCredentials, SetUICredentials, WEB } from "../DVU";
import { BusinessPartnerAPI } from "../apiFolder/businessPartners";
import { InitAPI, initArgs, scenario } from "./initializer";


export interface InventoryData {
    Warehouse: string,
    Vendor: string,
    Item: string,
    Lot?: string,
    SubLot?: string,
    SKU?: string
  }


export interface iItemStock {
    itemCode: string,
    itemDescription: string,
    lotCode: string,
    sublotCode: string,
    qtyAvailable: number,
    qtyPlanned: number,
    qtyAllocated: number,
    qtyDamaged: number,
    qtyHold: number,
    qtyQuarantine: number,
    totalQty: number,
    vendorDescription: string,
    uomAbbrev: string,
    pieceCount: number,
}

export interface iItemDetail {
    

    itemCode: string,
    itemDescription: string,
    lotCode: string,
    sublotCode: string,
    storageLocation: string,
    lpn: string,
    available: number,
    damaged: number,
    hold: number,
    quarantine: number,
    allocated: number,
    planned: number,
    lbs: number,
    uomAbbrev: string,
    level: string,
    bay: string,
    slot: string,
    velocity0: number,
    velocityA: number,
    velocityB: number,
    velocityC: number,
    velocityD: number,
    zone: string,
    locationStatus: string,
}
export class backEnd {
      
    public GetItemStock = async(inventoryData: InventoryData): Promise<iItemStock> => {
        const apiCall = InitAPI();
        const result = await apiCall.getItemQties(inventoryData.Warehouse, inventoryData.Item, inventoryData.Lot, inventoryData.SubLot, inventoryData.Vendor, inventoryData.SKU);
        return result as iItemStock;
    }

    public GetItemInventoryDetail = async(InventoryData: InventoryData): Promise<iItemDetail[]> => {
        const apiCall = InitAPI();
        return await apiCall.getItemDetails(InventoryData.Warehouse, InventoryData.Item, InventoryData.Vendor) as iItemDetail[];
    }

    private async Login(args: initArgs): Promise<void>{

    }
    
    public async LoadScenario(args: scenario): Promise<void> {
    
        if(args){
            const APICall = InitAPI();

            const whResp = await APICall.getWarehouse(args, false);
            if(!whResp) throw new Error(`Error: the warehouse ${args?.warehouse?.description} was not correcly udpated/saved`);

            const bpResp = await APICall.getVendors(args);
            if(args.businessPartners && bpResp.length != args.businessPartners.length) throw new Error(`Error: not all the accounts were created/updated`);

            const sLocationResponse = await APICall.getStorageLocations(args, whResp.id!);
            if(args.storageLocations && sLocationResponse.length != args.storageLocations?.Locations?.length) throw new Error(`Error: not all the Storage Locations were created/updated`);

            const itemsResponse =  await APICall.getItems(args); 
            if(args.items && itemsResponse.length != args.items?.length) throw new Error(`Error: not all the items were created/updated`);

            const invAdjResponse = await APICall.getInventoryAdjustment(args, whResp?.id!);
            if(!invAdjResponse) throw new Error(`Error: not all the inventory adjustment were created/updated`);

            const seqResponse = await APICall.getSequences(args);
            if(args.sequences && seqResponse.length != args.sequences?.length) throw new Error(`Error: not all the sequences were saved`);
        }

        
    }

    public async LoadAccount(Account: BusinessPartnerAPI ): Promise<boolean> {
        const APICall = InitAPI();

        let vendor: scenario = {
            businessPartners: [Account]
        }
        const bpResp = await APICall.getVendors(vendor);
        
        return bpResp.length>0;
    }
   
}
