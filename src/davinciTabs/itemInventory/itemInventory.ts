import { Selector } from "testcafe";
import { Table } from "../../pageObject";

import { BaseDialog } from "../../pageObject/dialogs/baseDialog";
import { Button, ComboboxWithToolbar, TextBox } from "../../basicObjects";
import { ItemInventoryToolbar } from "./itemInventoryToolbar";
import { inventoryDetail } from "../inventoryDetail/inventoryDetail";


export class itemInventory {

    private _container: Selector;
    public Toolbar : ItemInventoryToolbar;
    public Table: Table;

    public SearchDialog: ItemInventory_SearchDialog;
    public Detail: inventoryDetail;

    constructor(){
        this._container = Selector('div.k-state-active item-inventory');
        this.Toolbar = new ItemInventoryToolbar(this._container);
        this.Table = new Table(this._container.find('table'));
        
        this.SearchDialog = new ItemInventory_SearchDialog(this._container);
        this.Detail = new inventoryDetail();
        
    }
}


export class ItemInventory_SearchDialog extends BaseDialog {

    public Account: ComboboxWithToolbar;
    public Search: Button;
    public ItemCode: TextBox;
    constructor(selector: Selector){
        super(selector);

        this.Account = new ComboboxWithToolbar(this._container.find('span').withText('Account').nextSibling('span.searchAndSearchButton'));
        this.Search = new Button(this._container.find('button').withText('Search'));
        this.ItemCode = new TextBox(this._container.find('span').withText('Item Code').nextSibling('input'));

    }

}