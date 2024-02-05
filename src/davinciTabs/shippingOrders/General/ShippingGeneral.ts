import { t } from "testcafe";
import { Button, ComboboxWriteAndSearch, Label, NumberBox, TextBox } from "../../../basicObjects";
import { BaseObject } from "../../../basicobjects/baseObject";




export class ShippingGeneral extends BaseObject{

    public ItemCode: ComboboxWriteAndSearch;
    public LPN: Label;
    public StorageLocation: Label;
    public Description: Label;
    public UnitPrice: NumberBox;
    public OrderedQty: NumberBox;
    public ShippedQty: NumberBox;

    public AvailableQty: Label;
    public PickableQty: Label;
    public PickableQtyAlUOMs: Label;

    public TotalWeight: Label;

    public Insert: Button;
    public Cancel: Button;
    public InsertAndNew: Button;
     
    public LotCode : TextBox;
    public SublotCode: TextBox;

    constructor(selector: Selector){
        super(selector);
        this.ItemCode = new ComboboxWriteAndSearch(this._container.find('item-code-combobox'));
        this.OrderedQty = new NumberBox(this._container.find('span').withText('Ordered Qty').nextSibling('kendo-numerictextbox'));
        this.ShippedQty = new NumberBox(this._container.find('span').withText('Shipped Qty').nextSibling('kendo-numerictextbox'));
       
       
        this.Insert = new Button(this._container.find('.save button').withExactText('Insert'));
        this.Cancel = new Button(this._container.find('.save button').withExactText('Cancel'));
        this.InsertAndNew = new Button(this._container.find('.save button').withExactText('Insert and New'));

        this.LotCode = new TextBox(this._container.find('span').withExactText('Lot Code').nextSibling('input'));
        this.SublotCode = new TextBox(this._container.find('span').withExactText('Sublot Code').nextSibling('input'));
    }

    public async Expand(): Promise<void>{
        if(this._container.withAttribute('class', 'mat-expanded'))
            await t.click(this._container);
    }
}