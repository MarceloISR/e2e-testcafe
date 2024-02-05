

export interface iInventoryAdjustmentAPI {
    itemId: number,
    status: number,
    qty?: number,
    lot?: string,
    storageId: number,
    lpn?: string,
    sublot?: string,
    unitGwt?:   number;
    expirationDate?: string;
}

export interface iInvAdjustmentDetailAPI {
    id?:                number;
    warehouseId?:       number;
    itemId?:            number;
    itemCode?:          string;
    itemDescription?:   string;
    lotCode?:           string;
    sublotCode?:        string;
    storageId?:         number;
    storageLocation?:   string;
    lpn?:               string;
    available?:         number;
    damaged?:           number;
    hold?:              number;
    quarantine?:        number;
    allocated?:         number;
    planned?:           number;
    vendorId?:          number;
    vendorDescription?: string;
    lbs?:               number;
    uomAbbrev?:         string;
    itemType?:          number;
    level?:             string;
    bay?:               string;
    slot?:              string;
    category?:          number;
    velocity0?:         number;
    velocityA?:         number;
    velocityB?:         number;
    velocityC?:         number;
    velocityD?:         number;
    valuePerEach?:      number;
    itemVelocity?:      number;
    zone?:              string;
    locationStatus?:    string;
}
