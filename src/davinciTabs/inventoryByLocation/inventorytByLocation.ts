import { Selector } from "testcafe";
import { Button, ComboboxWithToolbar, TextBox } from "../../basicObjects";
import { Table } from "../../pageObject";
import { BaseDialog } from "../../pageObject/dialogs/baseDialog";
import { inventoryDetail } from "../inventoryDetail/inventoryDetail";
import { InventoryByLocationToolbar } from "./InventoryByLocationToolbar";

export class InventoryByLocation {

    private _container: Selector;
    public Toolbar : InventoryByLocationToolbar;
    public Table: Table;

    public SearchDialog: ItemByLocation_SearchDialog;
    public Detail: inventoryDetail;

    constructor(){
        this._container = Selector('div.k-state-active inventory-by-location');
        this.Toolbar = new InventoryByLocationToolbar(this._container);
        this.Table = new Table(this._container.find('table'));
        
        this.SearchDialog = new ItemByLocation_SearchDialog(this._container);
        this.Detail = new inventoryDetail();
        
    }
}


export class ItemByLocation_SearchDialog extends BaseDialog {

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