import { Button, Combobox, TextBox } from "../../../basicObjects";
import { ComboboxSearch } from "../../../basicObjects/combobox-Search";
import { BaseDialog } from "../../../pageObject/dialogs/baseDialog";

export class ItemSkus_Search extends BaseDialog{

    public Account: ComboboxSearch;
    public SKU: TextBox;
    public ItemCode: TextBox;
    public Description: TextBox;
    
    public Clear : Button;
    public Search: Button;

    constructor(selector: Selector){
        super(selector);

       // const searchSelector = this._container.find('span').withText('Account');
        this.Account = new ComboboxSearch(this._container.find('span').withText('Account').nextSibling('span'));
        this.SKU = new TextBox(this._container.find('span').withText('SKU').nextSibling('input'));
        this.ItemCode = new TextBox(this._container.find('span').withText('Item Code').nextSibling('input'));
        this.Description = new TextBox(this._container.find('span').withText('Description').nextSibling('input'));
        
        this.Search = new Button(this._container.find('button').withText('Search'));
        this.Clear = new Button(this._container.find('button').withText('Clear'));
    }
}