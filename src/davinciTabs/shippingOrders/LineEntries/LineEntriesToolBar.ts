import { Button, DropdownButton } from "../../../basicObjects";
import { BaseObject } from "../../../basicObjects/baseObject";

export class ShippingLineEntriesToolBar extends BaseObject{
    
    public Insert: DropdownButton;
    public Delete: Button;

    public Copy: Button;
    public AllocateItems: Button;
    public ExportCSV: Button;
    

    constructor(selector: Selector){
        super(selector);
        this.Insert = new DropdownButton(this._container.find('span:nth-child(1) button'));
        this.Delete = new Button(this._container.find('span:nth-child(2) button'));
        this.AllocateItems = new Button(this._container.find('span:nth-child(3) button'));
        this.Copy = new Button(this._container.find('span:nth-child(4) button'));
        this.ExportCSV = new Button(this._container.find('span:nth-child(6) button'));
    }
}