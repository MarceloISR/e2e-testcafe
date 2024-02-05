import { Selector } from "testcafe";
import { Combobox, Dropdown, Link, TextBox } from "../../../basicObjects";
import { NumberBox } from "../../../basicObjects/numberBox";
import { BaseDialog } from "../../../pageObject/dialogs/baseDialog";

export class ItemSkus_CreateDialog extends BaseDialog{

    public CreateItem: Link;
    public CreateUOM: Link;
    public Advanced: Link;
    public Storage: Link;
    public Aliases: Link;
    public International: Link;

    //PROPERTIES
    public Account :Combobox;
    public ItemCode : TextBox;
    public Description: TextBox;
    public SKU: TextBox;

    //UOM
    public UOM_Type: Dropdown;
    public UOM_Description: TextBox;
    public UOM_Abbreviation: TextBox;
    //DIMENSIONS
    public Dimensions_length: NumberBox;
    public Dimensions_Width: NumberBox;
    public Dimensions_Height: NumberBox;
    public Dimensions_GrossLBS: NumberBox;
    public Dimensions_TareLBS: NumberBox;

    //PALLETIZING
    public Palletizing_Tie: NumberBox;
    public Palletizing_High: NumberBox;
    public Palletizing_MaxStackLBS: NumberBox;

    constructor(){
        super(Selector("kendo-dialog:not([hidden]) [role='dialog']"));

        //HORIZONTAL STEPPER
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="1"]'))
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="2"]'))
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="3"]'))
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="4"]'))
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="5"]'))
        this.CreateItem = new Link(this._container.find('mat-step-header[aria-posinset="6"]'))

        //Selector must be changed, data-testid attribute needs to be added to the fields
        //PROPERTIES
        this.Account = new Combobox(this._container.find('[data-testid="partner-search"]'));
        this.ItemCode = new TextBox(this._container.find("span").withText("Item Code").nextSibling("input"));
        this.Description = new TextBox(this._container.find("span").withText("Description").nextSibling("input"));
        this.SKU = new TextBox(this._container.find("span").withText("SKU").nextSibling("input"));

        //UOM
        this.UOM_Type = new Dropdown(this._container.find('mat-card.uom span').withText('Type').nextSibling('kendo-dropdownlist'));
        this.UOM_Description = new TextBox(this._container.find('mat-card.uom span').withText('Description').nextSibling('input'));
        this.UOM_Abbreviation = new TextBox(this._container.find('mat-card.uom span').withText('Abbreviation').nextSibling('input'));
        //DIMENSIONS
        this.Dimensions_length = new NumberBox(this._container.find('mat-card.dimensions span').withText('Length').nextSibling('kendo-numerictextbox'));
        this.Dimensions_Width = new NumberBox(this._container.find('mat-card.dimensions span').withText('Width').nextSibling('kendo-numerictextbox'));
        this.Dimensions_Height = new NumberBox(this._container.find('mat-card.dimensions span').withText('Height').nextSibling('kendo-numerictextbox'));
        this.Dimensions_GrossLBS = new NumberBox(this._container.find('mat-card.dimensions span').withText('Gross LBS').nextSibling('kendo-numerictextbox'));
        this.Dimensions_TareLBS = new NumberBox(this._container.find('mat-card.dimensions span').withText('Tare LBS').nextSibling('kendo-numerictextbox'));

        //PALLETIZING
        this.Palletizing_Tie = new NumberBox(this._container.find('mat-card.palletizing span').withText('Tie').nextSibling('kendo-numerictextbox'));
        this.Palletizing_High = new NumberBox(this._container.find('mat-card.palletizing span').withText('High').nextSibling('kendo-numerictextbox'));
        this.Palletizing_MaxStackLBS = new NumberBox(this._container.find('mat-card.dimensions  span').withText('Max Stack LBS').nextSibling('kendo-numerictextbox'));



    }
}