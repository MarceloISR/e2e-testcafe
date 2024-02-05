// import { Selector } from "testcafe";
// import { Button, Combobox, ComboboxWriteAndSearch, Dropdown, Label, NumberBox, TextArea, TextBox } from "../../basic-objects";
// import { BaseDialog } from "../../page-object/dialogs/baseDialog";



// export class ItemSKUAdjusment extends BaseDialog{

//     public LotCode: TextBox;
//     public SubLotCode: TextBox;
//     public Description: Label;
//     public UOM: Label;
//     public Status: Dropdown;
//     public Location: ComboboxWriteAndSearch;
//     public LBS: Label;
//     public CurrentQty: Label;
//     public LPN: TextBox;
//     public AdjustedWeight: NumberBox;
//     public AdjustedQuantity: NumberBox;
//     public Exception: Combobox;
//     public Notes: TextArea;
//     public Cancel: Button;
    
//     constructor(selector: Selector) {
//         super(selector);
//         this.Save = new Button(this._container.find('.inventoryAdjustFooter button').withExactText('Save'));
//         this.Cancel = new Button(this._container.find('..inventoryAdjustFooter button').withExactText('Cancel'));
//         this.Location = new ComboboxWriteAndSearch(this._container.find('location-combobox'));
//         this.LPN = new TextBox(this._container.find('span').withText('LPN').nextSibling('input'));

//         this.LotCode = new TextBox(this._container.find('span').withText('Lot Code').nextSibling('input'));
//         this.SubLotCode = new TextBox(this._container.find('span').withText('SubLot Code').nextSibling('input'));
         
//         this.AdjustedQuantity = new NumberBox(this._container.find('span').withText('Adjusted Quantity').nextSibling('kendo-numerictextbox'))
//     }
// }