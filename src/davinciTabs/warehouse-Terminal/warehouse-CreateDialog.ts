import { Dropdown, TextBox } from "../../basicObjects";
import { BaseDialog } from "../../pageObject/dialogs/baseDialog";


export class Warehouse_CreateDialog extends BaseDialog{

    //SUMMARY
    public Description: TextBox;
    public Mode : Dropdown;

    constructor(selector: Selector){
        super(selector);

        this.Description = new TextBox(this._container.find('span').withText('Description').nextSibling('input'));
        this.Mode = new Dropdown(this._container.find('span').withText('Mode').nextSibling('kendo-dropdownlist'));
    }
}
