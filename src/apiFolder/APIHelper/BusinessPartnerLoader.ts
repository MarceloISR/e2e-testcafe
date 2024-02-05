import { BusinessPartnerAPI, RangesAPI, StorageChargeAPI, attributeAPI, attributesIds } from "../businessPartners";
import { iAttributeAPI, iAutoChargeCodeAPI, iBusinessPartnerAPI, iChargeCodeAPI, iDefaultBillingAPI, iItemStorageChargeAPI, iRangesAPI, iStorageRangesAPI } from "../interfaces/iBusinessPartnerAPI";


export const LoadVendorData = (vendor: BusinessPartnerAPI, iVendor?: iBusinessPartnerAPI) : iBusinessPartnerAPI => {
    
    vendor.Vendor = vendor.Vendor?? vendor.Description;

    const BP : iBusinessPartnerAPI = iVendor ?? {};
    
        BP.id = vendor.Id?? iVendor?.id;
        BP.accountid = vendor.Vendor?? iVendor?.accountid;
        BP.description= vendor.Description?? iVendor?.description ;
        BP.enabled= vendor.Enable? Number(vendor.Enable): (iVendor?.enabled?? 1);
        BP.mcountry= vendor.Mailing_address?.Country? vendor.Mailing_address?.Country: iVendor?.mcountry;
        BP.mstate= vendor.Mailing_address?.state? vendor.Mailing_address?.state : iVendor?.mstate;
        BP.rateMultiplier= vendor.RateMultiplier?? (iVendor?.rateMultiplier?? 1.0000);
        BP.scountry= vendor.Shipping_Address?.Country? vendor.Shipping_Address.Country : iVendor?.scountry;
        BP.sstate= vendor.Shipping_Address?.state? vendor.Shipping_Address.state : iVendor?.sstate;
        BP.type= vendor.Type ?? (iVendor?.type ?? 1);
        BP.attributes= vendor.Attributes? LoadVendorAttributes(vendor?.Attributes) : iVendor?.attributes;
        
        BP.chargeCodes= LoadChargeCodes(vendor, iVendor?.chargeCodes);       
        //BP.chargeCodes= [];
        //BP.notes?=                 any[];
        //BP.scripts?=               any[];
        BP.itemStorageCharges= LoadStorageCharges(vendor?.StorageCharges!);  
        //BP.itemStorageCharges= [];
        BP.autoChargeCodes =       [];
        //BP.shippingPreDefTitles?=  PreDefTitles;
        //BP.receivingPreDefTitles?= PreDefTitles;
        //BP.workOrderPreDefTitles?= PreDefTitles;
        //BP.shipmentPreDefTitles?=  ShipmentPreDefTitles;
        BP.defaultBillings=       [];
        //BP.events?=                Event[];
        //BP.nmfcCodes?=             any[];
        //BP.scriptMaps?=            any[];
        //BP.attributeMaps?=         any[];
        //BP.monthlyBillings?=       any[];
        //BP.carrierFees?=           any[];
        //BP.files?=                 any[];
        //BP.rateMultipliers?=       any[];
        //BP.serviceLanes?=          any[];
        //BP.carrierRoutes?=         any[];
        //BP.proSettings?=           any[];

   //console.log(BP);
    return BP;
}

let defaultBillingMatrix = {
    //11: uomType=1, itemType=1
    11: {   //Each
        1: { //Charge Codes
            2: -1,  //Outbound Shipping
            3: -1,  //Inbound Handling
            4: -1   //Inbound Storage
        },
        2: { //Storage Charges
            1: -1   //Renewal Storage
        },
    },
    //21: uomType=2, itemType=1
    21: {   //Inner Pack
        1: { //Charge Codes
            2: -1,  //Outbound Shipping
            3: -1,  //Inbound Handling
            4: -1   //Inbound Storage
        },
        2: { //Storage Charges
            1: -1   //Renewal Storage
        },
    },

    //31: uomType=3, itemType=1
    31: {   //Case
        1: { //Charge Codes
            2: -1,  //Outbound Shipping
            3: -1,  //Inbound Handling
            4: -1,   //Inbound Storage
        },
        2: { //Storage Charges
            1: -1,   //Renewal Storage
        },
    },

    //32: uomType=3, itemType=2
    32: { //kit
        1: { //Charge Codes
            2: -1,  //Outbound Shipping
            3: -1,  //Inbound Handling
            4: -1,   //Inbound Storage
        },
        2: { //Storage Charges
            1: -1,   //Renewal Storage
        },
    },

    //41: uomType=4, itemType=1
    41: { //Pallet
        1: { //Charge Codes
            2: -1,  //Outbound Shipping
            3: -1,  //Inbound Handling
            4: -1,   //Inbound Storage
        },
        2: { //Storage Charges
            1: -1,   //Renewal Storage
        },
    }
}

export const LoadVendorDefaultBilling = (vendor: BusinessPartnerAPI, iVendor?: iBusinessPartnerAPI): iDefaultBillingAPI[] => {
    let defaultCodes : iDefaultBillingAPI[] = [];

    vendor.ChargeCodes?.forEach(cc => {
        iVendor?.chargeCodes?.forEach(icc => {
            if(cc.Description==icc.description && cc.Code==icc.code && cc.Type==icc.type){
                cc.DefaultBilling?.forEach(db => {
                    defaultBillingMatrix[db.UOMType][1][db.ChargeType] = icc.id!;
                });
            }
        });
    });


    vendor.StorageCharges?.forEach(sc => {
        iVendor?.itemStorageCharges?.forEach(isc => {
            if(sc.Description==isc.description && sc.Type==isc.type){
                sc.DefaultBilling?.forEach(scdb => {
                    defaultBillingMatrix[scdb.UOMType][2][1] = isc.id!;
                })
            }
        });
    });
   
    for(const uomType in defaultBillingMatrix ){
        for(const invoiceType in defaultBillingMatrix[uomType] ){
            for(const chargeType in defaultBillingMatrix[uomType][invoiceType]){
                
                const chargeRefID = defaultBillingMatrix[uomType][invoiceType][chargeType];
                
                if(chargeRefID > 0){
                    const val_uomType = Number(uomType[0]);
                    const val_itemType = Number(uomType[1]);
                    const val_invoiceType = Number(invoiceType);
                    const val_chargeType = Number(chargeType);

                    defaultCodes.push({
                        bpId: iVendor?.id,
                        chargeRefId: chargeRefID,
                        chargeType: val_chargeType,
                        invoiceType: val_invoiceType,
                        uomType: val_uomType,
                        itemType: val_itemType
                    })
                }
                
            }
        }
        
    }
    return defaultCodes;

}

export const LoadVendorAssignedCodes = (vendor: BusinessPartnerAPI, iVendor?: iBusinessPartnerAPI): iAutoChargeCodeAPI[] => {
    
    const BP : iBusinessPartnerAPI = iVendor ?? {};

    let autoChargeCodes : iAutoChargeCodeAPI[] = [];

    vendor.ChargeCodes?.forEach(cc=> {
        if(cc.AssignChargeCode){
            iVendor?.chargeCodes?.forEach(iCC => {
                if(cc.Description == iCC.description && cc.Code == iCC.code && cc.Type == iCC.type){
                    autoChargeCodes.push({
                        chargeCodeId: iCC.id,
                        businessPartnerId: iVendor.id,
                        type: cc.AssignChargeCode,
                    })
                }
            });
        }

    });
    return autoChargeCodes;
}
export const LoadVendorAttributes = (vendorAttributes: attributeAPI | undefined ): iAttributeAPI[] => {
    let attributes: iAttributeAPI[] = [];
    for(const area in vendorAttributes){

        for(const attr in vendorAttributes[area]){
            const valType = typeof((vendorAttributes[area])[attr]);
            const val = (vendorAttributes[area])[attr];
            const ival = ['number', 'boolean'].includes(valType)? Number(val) : -1;
            const sval = ["string"].includes(valType)? val : "";
            const dval = -1;
            attributes.push({
                attribute: (attributesIds[area])[attr],
                ival: ival, // Number((vendorAttributes[area])[attr]),
                dval: dval,
                sval: sval,
            })
        }
    }
    return attributes;
}

export const LoadChargeCodes = (vendor: BusinessPartnerAPI, iChargeCode?: iChargeCodeAPI[] ): iChargeCodeAPI[] => {
    
    let outCodes : iChargeCodeAPI[] = [];

    vendor?.ChargeCodes?.forEach(iVal=> {

        outCodes.push({
            id :                  iVal?.id,
           type :                 iVal.Type,
           description :          iVal.Description,
           code :                 iVal.Code,
           autoApply :            iVal?.Automatically_add_to_orders? Number(iVal.Automatically_add_to_orders) : 0,
           glCode :               iVal?.GLCode,
           maxCharge :            iVal?.Max,
           minCharge :            iVal?.Min,
           rateAssoc :            iVal?.Per,
           //typeText:              iVal?.Type? ChargeCode_TypeText[iVal?.typeText!] : ChargeCode_TypeText[code?.typeText!], 
           businessPartnerId :    vendor.Id?? undefined,
           rate :                 iVal?.Rate,
           valueFrom :            iVal?.Range_From,
           valueTo :              iVal?.Range_To,
           ranges :               LoadRanges(iVal?.Ranges!), //iVal?.Ranges ?? code?.ranges,
           tieredBilling:         iVal?.Ranges? Number(iVal?.Ranges?.length>0) : 0,
           visibleOnScanner:      iVal?.Visible_On_Barcode_Scanning? Number(iVal?.Visible_On_Barcode_Scanning) : 0,
           //associatedItemId:      iVal?.associatedItemId ?? code?.associatedIt
       });
      
    })

    return outCodes;
}

export const LoadStorageCharges = (storageCharges: StorageChargeAPI[]) : iItemStorageChargeAPI[] | undefined => {
    


    let outCodes : iItemStorageChargeAPI[] = [];

    storageCharges?.forEach(ival => {
        
        outCodes.push({
            description : ival.Description,
            type: ival.Type,
            id: ival?.id ,
            glcode: ival?.GLCode ,
            //chargeClass: ival?.Class,
            
            minChg: ival?.Min,
            rate: ival.Rate,
            rateAssoc: ival.Per,
            //valFrom: ival.Range_From,
            //valTo: ival.Range_To,
            vendorId: ival.businessPartnerId,
            billingSchedules: LoadStorageRanges(ival.BillingSchedules!),
            billingScheduleType: ival.BillingScheduleType
            
        })
    })
    return outCodes;
}

export const LoadRanges = (ranges: RangesAPI[]): iRangesAPI[] => {
    let outRanges : iRangesAPI[] = [];

        ranges?.forEach(r => {
            outRanges.push({
                id: r.id,
                rate: r.Rate,
                valueFrom: r.From,
                valueTo: r.To
            })
        });

    return outRanges;

}


export const LoadStorageRanges = (ranges: RangesAPI[]): iStorageRangesAPI[] => {
    let outRanges : iStorageRangesAPI[] = [];

    ranges?.forEach(r => {
        outRanges.push({
            id: r.id,
            rate: r.Rate,
            valFrom: r.From,
            valTo: r.To
        })
    });

return outRanges;
}