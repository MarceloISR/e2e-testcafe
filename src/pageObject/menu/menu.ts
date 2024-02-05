import { t } from "testcafe";

import { MenuItem } from "./menuItem";

export class menu { 

    // First Level
    Orders : MenuItem;
        BillofLading: MenuItem;
            ConsolidatedBillOfLading: MenuItem;
            MasterBillOfLading: MenuItem;
        ShippingOrders: MenuItem;
        PurchaseOrders: MenuItem;
        ReceivingOrders: MenuItem;
        WorkOrders: MenuItem;

    Warehouse : MenuItem;
        BarcodeScanningTasks: MenuItem;
            PickingTasks: MenuItem;
            ReceivingTasks: MenuItem;
            PutAwayTasks: MenuItem;
            WorkOrderTasks: MenuItem;
        CartonStock: MenuItem;
        Cartonization:MenuItem;
        InventoryByLPN: MenuItem;
        InventoryByLocation: MenuItem;
        ItemInventory: MenuItem;
        Items_SKUs: MenuItem;
        KitInventory: MenuItem;
        Kits_BOM: MenuItem;
        PrintQueue: MenuItem;
        Printers: MenuItem;
        ScanPack: MenuItem;
        StorageLocationGroups: MenuItem;
        StorageLocationsByAccount: MenuItem;
        UPCCodes: MenuItem;
        WavePickTickets: MenuItem

    Transportation : MenuItem;
        Dispatch: MenuItem;
        Loads: MenuItem;
        Shipments: MenuItem;
        RateTariffs: MenuItem;
        CarrierQuoteHistory: MenuItem;
        PendingQuotes: MenuItem;
        ServiceLanes: MenuItem;

    Yard : MenuItem;
        Equipment: MenuItem;
        YardAppointments: MenuItem;
        YardLocations: MenuItem;

    BusinessPartners : MenuItem;
        Accounts: MenuItem;
        Carriers: MenuItem;
        Customers: MenuItem;
        Shippers: MenuItem;
        Suppliers: MenuItem;

    Channels : MenuItem;
        IntegrationStore: MenuItem;
        OutboundChannel: MenuItem;
        ReceivingChannel: MenuItem;
        ShippingChannel: MenuItem;

    AccountingIntegration: MenuItem;
        Invoicing: MenuItem;

    Settings: MenuItem;
        setting_Cartonization: MenuItem;
            CartonizationRules: MenuItem;
            CartonizationItemGroups: MenuItem;
        Setting_Exceptions: MenuItem;
        Setting_Hazmat: MenuItem;
        Setting_ReportAdmin: MenuItem;
        Setting_ReportFiles: MenuItem;
        Setting_Security: MenuItem;
            Security_Users: MenuItem;
            Security_Drivers: MenuItem;
            Security_UserGroups: MenuItem;
        Setting_Sequences: MenuItem;
        Setting_ServiceClasses: MenuItem;
        Setting_SessionManagement: MenuItem;
        Setting_SystemDocuments: MenuItem;
        Setting_SystemParemeters: MenuItem;
        Setting_WarehouseTerminal: MenuItem;

    Reports: MenuItem;
        ReportDesigner: MenuItem;
        ReportsList : MenuItem;
        
    Import: MenuItem;

    Dahsboard: MenuItem;
        SmallParcelErrors: MenuItem;
        UserMessages: MenuItem;

    NeedHelp: MenuItem;

    constructor() { 
        this.Orders = new MenuItem('Orders', null);
            this.BillofLading = new MenuItem('Bill of Lading', this.Orders);
                this.ConsolidatedBillOfLading = new MenuItem('Consolidated Bill Of Lading', this.BillofLading);
                this.MasterBillOfLading = new MenuItem('Master Bill Of Lading', this.BillofLading);
            this.ShippingOrders = new MenuItem('Shipping Orders', this.Orders);
            this.PurchaseOrders = new MenuItem('Purchase Orders', this.Orders);
            this.ReceivingOrders = new MenuItem('Receiving Orders', this.Orders);
            this.WorkOrders = new MenuItem('Work Orders', this.Orders);

        this.Warehouse = new MenuItem('Warehouse');
            this.BarcodeScanningTasks = new MenuItem('Barcode Scanning Tasks', this.Warehouse);
                this.PickingTasks = new MenuItem('Picking Tasks', this.BarcodeScanningTasks);
                this.ReceivingChannel = new MenuItem('Receiving Tasks', this.BarcodeScanningTasks);
                this.PutAwayTasks = new MenuItem('Put Away Tasks', this.BarcodeScanningTasks);
                this.WorkOrderTasks = new MenuItem('Work Order Tasks', this.BarcodeScanningTasks);
            this.CartonStock = new MenuItem('Carton Stock', this.Warehouse);
            this.Cartonization = new MenuItem('Cartonization', this.Warehouse);
            this.InventoryByLPN = new MenuItem('Inventory By LPN', this.Warehouse);
            this.InventoryByLocation = new MenuItem('Inventory By Location', this.Warehouse);
            this.ItemInventory = new MenuItem('Item Inventory', this.Warehouse);
            this.Items_SKUs = new MenuItem('Items / SKUs', this.Warehouse);
            this.KitInventory = new MenuItem('Kit Inventory',  this.Warehouse);
            this.Kits_BOM = new MenuItem('Kits / BOM', this.Warehouse);
            this.PrintQueue = new MenuItem('Print Queue', this.Warehouse);

        this.Transportation = new MenuItem('Transportation');
            this.Dispatch= new MenuItem('Dispatch', this.Transportation);
            this.Loads= new MenuItem('Loads', this.Transportation);
            this.Shipments= new MenuItem('Shipments', this.Transportation);
            this.RateTariffs= new MenuItem('Rate Tariffs', this.Transportation);
            this.CarrierQuoteHistory= new MenuItem('Carrier Quote History', this.Transportation);
            this.PendingQuotes= new MenuItem('Pending Quotes', this.Transportation);
            this.ServiceLanes= new MenuItem('Service Lanes', this.Transportation);

        this.Yard = new MenuItem('Yard');
            this.Equipment = new MenuItem('Equipment', this.Yard);
            this.YardAppointments = new MenuItem('Yard Appointments', this.Yard);
            this.YardLocations = new MenuItem('Yard Locations', this.Yard);

        this.BusinessPartners = new MenuItem('Business Partners');
            this.Accounts = new MenuItem('Accounts', this.BusinessPartners);
            this.Carriers = new MenuItem('Carriers', this.BusinessPartners);
            this.Customers = new MenuItem('Customers', this.BusinessPartners);
            this.Shippers = new MenuItem('Shippers', this.BusinessPartners);
            this.Suppliers = new MenuItem('Suppliers', this.BusinessPartners);

        this.Channels = new MenuItem('Channels');
            this.IntegrationStore =new MenuItem('Integration Store', this.Channels);
            this.OutboundChannel =new MenuItem('Outbound Channel', this.Channels);
            this.ReceivingChannel =new MenuItem('Receiving Channel', this.Channels);
            this.ShippingChannel =new MenuItem('Shipping Channel', this.Channels);

        this.AccountingIntegration = new MenuItem('Accounting Integration');
            this.Invoicing = new MenuItem('Accounting Integration', this.AccountingIntegration);

        this.Settings = new MenuItem('Settings');
            this.setting_Cartonization =new MenuItem('Cartonization', this.Settings);
                this.CartonizationRules =new MenuItem('Cartonization Rules', this.setting_Cartonization);
                this.CartonizationItemGroups =new MenuItem('Cartonization Item Groups', this.setting_Cartonization);
            this.Setting_Exceptions =new MenuItem('Exceptions', this.Settings);
            this.Setting_Hazmat =new MenuItem('Hazmat', this.Settings);
            this.Setting_ReportAdmin =new MenuItem('Report Admin', this.Settings);
            this.Setting_ReportFiles =new MenuItem('Report Files', this.Settings);
            this.Setting_Security =new MenuItem('Security', this.Settings);
                this.Security_Users =new MenuItem('Users', this.Setting_Security);
                this.Security_Drivers =new MenuItem('Drivers', this.Setting_Security);
                this.Security_UserGroups =new MenuItem('User Groups', this.Setting_Security);
            this.Setting_Sequences =new MenuItem('Sequences', this.Settings);
            this.Setting_ServiceClasses =new MenuItem('Service Classes', this.Settings);
            this.Setting_SessionManagement =new MenuItem('Session Management', this.Settings);
            this.Setting_SystemDocuments =new MenuItem('System Documents', this.Settings);
            this.Setting_SystemParemeters = new MenuItem('System Parameters', this.Settings);
            this.Setting_WarehouseTerminal =new MenuItem('Warehouse-Terminal', this.Settings);

        this.Reports = new MenuItem('Reports');
            this.ReportDesigner = new MenuItem('Report Designer', this.Reports);
            this.ReportDesigner = new MenuItem('Reports list', this.Reports);

        this.Import = new MenuItem('Import');

        this.Dahsboard = new MenuItem('Dahsboard');
            this.SmallParcelErrors = new MenuItem('Small Parcel Errors', this.Dahsboard);
            this.UserMessages = new MenuItem('User Messages', this.Dahsboard);
            
        this.NeedHelp = new MenuItem('Need Help?');
    }
}