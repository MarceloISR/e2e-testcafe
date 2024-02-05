import { attributeAPI } from "./bpsAttributeAPI";
import { ChargeCodeAPI } from "./bpsChargeCodeAPI";
import { StorageChargeAPI } from "./bpsStorageChargeAPI";

export interface BusinessPartnerAPI {
    Id?: number,
    Vendor? : string,
    Description?: string,
    Enable?: boolean,
    RateMultiplier?: number,
    Type?: number,
    Attributes?: attributeAPI,
    /** 
     * @example StorageCharges: [ {Type: StorageCharge_Types.Inner_Pack_or_Equivalent, Description: 'XXX'}, {...} ]
    */
    StorageCharges?: StorageChargeAPI[],
    /** 
     * @example ChargeCodes: [ {Code: 'XXX', Description: 'XXX'}, {...} ]
    */
    ChargeCodes?: ChargeCodeAPI[],
    Mailing_address?: {
        Address1?: string,
        Address2?: string,
        City?: string,
        Postal_Code?:string,
        Country?: string,
        state?: string,
    }
    Shipping_Address?: {
        Use_Mailing_Address?: boolean,
        Address1?: string,
        Address2?: string,
        City?: string,
        Postal_Code?:string,
        Country?: string,
        state?: string,
    }
}
