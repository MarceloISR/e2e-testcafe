import { iStorageLocationAPI } from "../interfaces/iStorageLocationAPI";
import { StorageLocationAPI } from "../storageLocations";


export enum Velocity {
    Any = 0,
    A=1,
    B=2,
    C=4,
    D=8,
    E=16
}


export const LoadStorageLocationsData = (SLocation: StorageLocationAPI, iSLocation?: iStorageLocationAPI): iStorageLocationAPI => {
    const sLocation : iStorageLocationAPI = {}; 
    sLocation.id = SLocation.id?? iSLocation?.id;
    
    sLocation.aisle= SLocation.Aisle?? iSLocation?.aisle;
    sLocation.allowDamaged= SLocation.Inventory_Status?.Allow_Damaged ? Number(SLocation.Inventory_Status?.Allow_Damaged): iSLocation?.allowDamaged;
    sLocation.allowHold= SLocation.Inventory_Status?.Allow_Hold? Number(SLocation.Inventory_Status?.Allow_Hold) : iSLocation?.allowHold;
    sLocation.allowQuarantine= SLocation.Inventory_Status?.Allow_Quarantine? Number(SLocation.Inventory_Status?.Allow_Quarantine): iSLocation?.allowQuarantine;
    sLocation.bay= SLocation.Bay?? iSLocation?.bay; 
    sLocation.caseFlag = SLocation.Inventory_Type?.Case_MasterPack_InnerPack_Kit_Or_Equivalent? Number(SLocation.Inventory_Type.Case_MasterPack_InnerPack_Kit_Or_Equivalent) : iSLocation?.caseFlag;
    sLocation.category= SLocation.Category ?? (iSLocation?.category ?? 0);
    //sLocation.classification?=  string;
    sLocation.depth= SLocation.Length?? iSLocation?.depth;
    sLocation.description= SLocation.Description?? iSLocation?.description;
    sLocation.eachFlag= SLocation.Inventory_Type?.Each_Or_Equivalent? Number(SLocation.Inventory_Type.Each_Or_Equivalent) : iSLocation?.eachFlag;
    sLocation.enabled= SLocation.Enabled ? Number(SLocation.Enabled) : (iSLocation?.enabled ?? 1);
    sLocation.height= SLocation.Height?? iSLocation?.height;
    sLocation.invstatusAction= SLocation.Change_inventory_Status?? iSLocation?.invstatusAction;
    //sLocation.level?=           string;
    sLocation.modePick= SLocation.LocationType?.Pick_Allocation ? Number(SLocation.LocationType?.Pick_Allocation) : iSLocation?.modePick;
    sLocation.modeProject= SLocation.LocationType?.Project? Number(SLocation.LocationType?.Project) : iSLocation?.modeProject;
    sLocation.modePutawayBulk=SLocation.LocationType?.Bulk_Storage_Putaway? Number(SLocation.LocationType?.Bulk_Storage_Putaway): iSLocation?.modePutawayBulk;
    sLocation.modePutawayRack= SLocation.LocationType?.Rack_Storage_Putaway? Number(SLocation.LocationType?.Rack_Storage_Putaway): iSLocation?.modePutawayRack;
    sLocation.modeRecvDock= SLocation.LocationType?.Receiving_Dock? Number(SLocation.LocationType?.Receiving_Dock) : iSLocation?.modeRecvDock;
    sLocation.modeRecvStage=SLocation.LocationType?.Receiving_Stage?  Number(SLocation.LocationType?.Receiving_Stage): iSLocation?.modeRecvStage;
    sLocation.modeShipDock= SLocation.LocationType?.Shipping_Dock? Number(SLocation.LocationType?.Shipping_Dock) :iSLocation?.modeShipDock;
    sLocation.modeShipStage= SLocation.LocationType?.Shipping_Stage? Number(SLocation.LocationType?.Shipping_Stage): iSLocation?.modeShipStage;
    sLocation.numberPallets= SLocation.MaxLPN?? iSLocation?.numberPallets;
    sLocation.palletFlag= SLocation.Inventory_Type?.LPN_Or_Equivalent? Number(SLocation.Inventory_Type.LPN_Or_Equivalent) : iSLocation?.palletFlag;
    sLocation.pickStyle= SLocation.Sequence?? iSLocation?.pickStyle;
    sLocation.rateMultiplier= SLocation.Rate ?? (iSLocation?.rateMultiplier?? 1.0000);
    sLocation.uomAction = SLocation.Convert_Unit_of_Measure ?? iSLocation?.uomAction;
    //sLocation.si?=              string;
    //sLocation.slot?=            string;
    //sLocation.state?=           string;
    sLocation.storageId= SLocation.StorageId?? iSLocation?.storageId;
    sLocation.tempMax= SLocation.TempMax?? iSLocation?.tempMax;
    sLocation.tempMin= SLocation.TempMin?? iSLocation?.tempMin;
    sLocation.type= SLocation.Type ?? (iSLocation?.type ?? 1);
    sLocation.uomAction= SLocation.Convert_Unit_of_Measure?? iSLocation?.uomAction;
    sLocation.velocity0= SLocation.Item_Velocity?.VelocityAny? Number(SLocation.Item_Velocity?.VelocityAny): iSLocation?.velocity0;
    sLocation.velocityA= SLocation.Item_Velocity?.VelocityA? Number(SLocation.Item_Velocity?.VelocityA): iSLocation?.velocityA;
    sLocation.velocityB= SLocation.Item_Velocity?.VelocityB? Number(SLocation.Item_Velocity?.VelocityB): iSLocation?.velocityB;
    sLocation.velocityC= SLocation.Item_Velocity?.VelocityC? Number(SLocation.Item_Velocity?.VelocityC): iSLocation?.velocityC;
    sLocation.velocityD= SLocation.Item_Velocity?.VelocityD? Number(SLocation.Item_Velocity?.VelocityD): iSLocation?.velocityD;
    sLocation.weightMax= SLocation.MaxWeight?? iSLocation?.weightMax;
    sLocation.width= SLocation.Width?? iSLocation?.width;
    //sLocation.xspace?:          number;
    //sLocation.yspace?:          number;
    //sLocation.zipEnd?:          string;
    //sLocation.zipStart?:        string;
    sLocation.zone= SLocation.Zone?? iSLocation?.zone;
    //sLocation.zspace?:          number;
    sLocation.warehouseId= SLocation.WarehouseId?? iSLocation?.warehouseId;
    //sLocation.details?:         Details;
    //sLocation.currentCube?:     number;
    //sLocation.lpnCount?:        number;
    sLocation.details= iSLocation?.details?? {},
    sLocation.vendors= iSLocation?.vendors?? [];

    //};

    return sLocation;

}