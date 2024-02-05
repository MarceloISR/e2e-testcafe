import { Selector } from "testcafe";
import { Table } from "../../pageObject";
import { ItemSkus_Search } from "./dialog/itemSkus-Search";
import { ItemSkus_toolbar } from "./itemSkus-toolbar";
import { InventoryAdjust_Dialog } from "../inventoryAdjust/inventoryAdjust";
import { ItemSkus_CreateDialog } from "./dialog/itemSkus-CreateDialog";



export class itemSKUS {

    private _container: Selector;
    public Toolbar: ItemSkus_toolbar;
    public CreateItem: ItemSkus_CreateDialog;
    public Table: Table;
    
    public InventoryAdjust: InventoryAdjust_Dialog;
    public itemSKU_Search: ItemSkus_Search;

    constructor(){
        this._container = Selector('div.k-state-active items-skus');
        this.Toolbar = new ItemSkus_toolbar(this._container);
        // this.CreateItem = new ItemSkus_CreateDialog(this._container.find('kendo-dialog.largeDialogBox '));
        this.CreateItem = new ItemSkus_CreateDialog();
        this.Table = new Table(this._container.find('table'));
        this.InventoryAdjust = new InventoryAdjust_Dialog(this._container.find('inventory-adjust'));

        this.itemSKU_Search = new ItemSkus_Search(this._container.find('.searchCriteriaDialogBox '));
    }
}

