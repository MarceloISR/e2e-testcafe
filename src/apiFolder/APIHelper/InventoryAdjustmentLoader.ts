import { iInventoryAdjustmentAPI } from "../interfaces/";
import { InventoryAdjustmentAPI } from "../inventory";



export const LoadInventoryAdjustment = (invAdjs : InventoryAdjustmentAPI, itemId: number, storageId: number) : iInventoryAdjustmentAPI => {
    const iA : iInventoryAdjustmentAPI = {
        itemId: itemId,
        storageId: storageId,
        qty: invAdjs.qty,
        status: invAdjs.status? invAdjs.status : 1,
        lot: invAdjs.lot,
        lpn: invAdjs.lpn,
        sublot: invAdjs.sublot
    }
    return iA;
}


