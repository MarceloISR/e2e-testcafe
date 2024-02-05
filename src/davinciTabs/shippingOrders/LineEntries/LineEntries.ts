import { BaseObject } from "../../../basicObjects/baseObject";
import { ShippingGeneral } from "../General/ShippingGeneral";
import { ShippingLineEntriesToolBar } from "./LineEntriesToolbar";

export class ShippingLineEntries extends BaseObject{
    public Toolbar : ShippingLineEntriesToolBar;
    public GeneralPanel: ShippingGeneral;

    constructor(selector: Selector){
        super(selector);

        this.Toolbar = new ShippingLineEntriesToolBar(this._container.find('kendo-grid-toolbar'));
        this.GeneralPanel = new ShippingGeneral(this._container.find('mat-expansion-panel:nth-child(1)')); 
    }
}
