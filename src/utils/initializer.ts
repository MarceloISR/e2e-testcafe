import { t } from "testcafe";

//API
import { BusinessPartnerAPI } from '../apiFolder/businessPartners';
import { StorageLocationsAPI } from "../apiFolder/storageLocations";
import { InventoryAdjustmentsAPI } from '../apiFolder/inventory';
import { ItemAPI } from "../apiFolder/itemSKUS";
import { API, SetAPICredentials, SetRFCredentials, SetUICredentials, WEB, RF } from "../DVU";
import { APIClass  } from "../apiFolder/APIClass";
import { WarehouseAPI } from "../apiFolder/warehouses/warehousesAPI";
import { CredentialLanguage, iUserCredentials } from "./helpers";
import { SequenceAPI } from "../apiFolder/Sequences/SequenceAPI";
import { UserAPI } from "../apiFolder/users/userAPI";
import { UserGroupAPI } from "../apiFolder/userGroup";
import { StorageGroupAPI } from "../apiFolder/storageGroups/storageGroupsAPI";
//import { SelectDatabaseByText, SelectWarehouseByText } from "./telnet";

export interface iCredentials{
    user: string, 
    password: string,
    database: string,
    warehouse: string,//WarehouseAPI,
    url: string,
    version: string,
    license: string,
    port: string,
    authorization: string,
    language: CredentialLanguage,
    type: string,
}

export interface initArgs{
    CredentialGroup? : string,
    Credentials?: {
        UI?: iUserCredentials,
        RF?: iUserCredentials,
        API?: iUserCredentials,
    }
    Scenario?: scenario,
    /** NOT IMPLEMENTED YET : if this is configured to false then the test will not open any browser and everything will work in the backend */
    Headless?: boolean,
}

/**
 * scenario create a complete scenario using a full list of parameters
 * 
 * @example  warehouse: {description: 'warehouseX', mode: WarehouseMode.barcodeScanning},
 * @param warehouse Edit/Create a warehouse
 * @param businessPartners Find/Create a lists of accounts
 * @param storageLocations Find/Create a lists of StorageLocations
 * @param Items Find/Create a lists of Items
 * @param IventoryAdjustment Adjust the inventory 
 */
export interface scenario {
    /**
     * @abstract This credential group has priority over the credential group in the testing object scenario
     */
    CredentialGroup? : string,
    /**
     * @example warehouse: {description: 'warehouseX', mode: WarehouseMode.barcodeScanning},
     */
    warehouse?: WarehouseAPI,
    businessPartners? : BusinessPartnerAPI[],
    storageLocations? : StorageLocationsAPI,
    storageGroups? : StorageGroupAPI[],
    items?: ItemAPI[],
    inventoryAdjustment?: InventoryAdjustmentsAPI,
    sequences?: SequenceAPI[],
    users?: UserAPI[],
    userGroups?: UserGroupAPI[],

}

class Initializer {

    public async Load(args: initArgs): Promise<void>{
        await this.LoadScenario(args);
        await this.loadURL(args);
        await this.Login(args);
    }

    //load the url from args or the pipeline variable
    private async loadURL(args: initArgs): Promise<void>{
       
       
            await t.navigateTo(WEB?.url);
    
    }

    private async Login(args: initArgs): Promise<void>{

    }
    
    public async LoadScenario(args: initArgs): Promise<void> {
        
        const credentialGroup : string | undefined =  args.CredentialGroup ?? args?.Scenario?.CredentialGroup; 
        SetUICredentials(credentialGroup, args);
        SetRFCredentials(credentialGroup, args);
        SetAPICredentials(credentialGroup, args);

        RF.warehouse = args?.Scenario?.warehouse?.description ?? RF.warehouse;
        API.warehouse = args?.Scenario?.warehouse?.description ?? API.warehouse;
        WEB.warehouse = args?.Scenario?.warehouse?.description ?? WEB.warehouse;

        // const aux = await SelectDatabaseByText('bstevens');
        // const warehouse = await SelectWarehouseByText('Automation');

        if(args?.Scenario){
            const APICall = InitAPI();

            const whResp = await APICall.getWarehouse(args.Scenario);
            if(!whResp) throw new Error(`Error: the warehouse ${args.Scenario?.warehouse?.description} was not correcly udpated/saved`);

            const bpResp = await APICall.getVendors(args.Scenario);
            if(args.Scenario.businessPartners && bpResp.length != args.Scenario.businessPartners.length) throw new Error(`Error: not all the accounts were created/updated`);

            const sLocationResponse = await APICall.getStorageLocations(args.Scenario, whResp.id!);
            if(args.Scenario.storageLocations && sLocationResponse.length != args.Scenario.storageLocations?.Locations?.length) throw new Error(`Error: not all the Storage Locations were created/updated`);
            
            const storageGroup = await APICall.getStorageGroup(args.Scenario);
            
            const itemsResponse =  await APICall.getItems(args.Scenario); 
            if(args.Scenario.items && itemsResponse.length != args.Scenario.items?.length) throw new Error(`Error: not all the items were created/updated`);

            const invAdjResponse = await APICall.getInventoryAdjustment(args.Scenario, whResp?.id!);
            if(!invAdjResponse) throw new Error(`Error: not all the inventory adjustment were created/updated`);

            const seqResponse = await APICall.getSequences(args.Scenario);
            if(args.Scenario.sequences && seqResponse.length != args.Scenario.sequences?.length) throw new Error(`Error: not all the sequences were saved`);

        }

        
    }

    //private InitAPI 
}
export const InitAPI = (url: string|undefined = undefined, headers:{}|undefined = undefined): APIClass => {

    const call = new APIClass( );
    call.setBaseURL(url?? (`${API.url}:${API.port}/${API.version}/${API.license}/${API.database}`));
    call.setHeaders(headers?? {
        'Authorization': API.authorization,
        'Content-Type': 'application/json'
    })
        // `${API.url}:${API.port}/${API.version}/${API.license}/${API.database}`,
        // {
        //     'Authorization': API.authorization,
        //     'Content-Type': 'application/json'
        // }
    //);
    return call;
}

export let Init = new Initializer();
