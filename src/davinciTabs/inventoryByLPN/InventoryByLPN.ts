import { Selector } from "testcafe";
import { Button, ComboboxWithToolbar, TextBox } from "../../basicObjects";
import { Table } from "../../pageObject";
import { BaseDialog } from "../../pageObject/dialogs/baseDialog";
import { inventoryDetail } from "../inventoryDetail/inventoryDetail";
import { InventoryByLPNToolbar } from "./InventoryByLPNToolbar";

export class InventoryByLPN {

    private _container: Selector;
    public Toolbar : InventoryByLPNToolbar;
    public Table: Table;

    public SearchDialog: ItemByLPN_SearchDialog;
    public Detail: inventoryDetail;

    constructor(){
        this._container = Selector('div.k-state-active inventory-by-lpn');
        this.Toolbar = new InventoryByLPNToolbar(this._container);
        this.Table = new Table(this._container.find('table'));
        
        this.SearchDialog = new ItemByLPN_SearchDialog(this._container);
        this.Detail = new inventoryDetail(Selector('lpn-inventory'));
        
    }
}


export class ItemByLPN_SearchDialog extends BaseDialog {

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