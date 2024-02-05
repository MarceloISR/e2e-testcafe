
import { Button, MenuButton } from "../../basicObjects";
import { Toolbar } from "../../pageObject";

export class ItemSkus_toolbar extends Toolbar {

    public Insert : Button;
    public Edit: Button;
    public Disable: Button;
    public InventoryAdjust: Button;
    public Print: Button;
    public Refresh: Button;
    public Search: Button;
    public Filter: Button;
    public ExportCSV: Button;
    public ExportPDF: Button;
    public Email: Button;
    public More: MenuButton;
    constructor(selector: Selector) {
        
        super(selector);

        this.Insert = new Button(this._container.find("span:nth-child(1) button"));
        this.Edit = new Button(this._container.find("span:nth-child(2) button"));
        this.Disable = new Button(this._container.find("span:nth-child(3) button"));
        this.InventoryAdjust = new Button(this._container.find("span:nth-child(4) button"));
        this.Print = new Button(this._container.find("span:nth-child(5) button"));
        this.Refresh = new Button(this._container.find("span:nth-child(6) button"));
        this.Search = new Button(this._container.find("span:nth-child(7) button"));
        this.Filter = new Button(this._container.find("span:nth-child(8) button"));
        this.ExportCSV = new Button(this._container.find("span:nth-child(9) button"));
        this.ExportPDF = new Button(this._container.find("span:nth-child(10) button"));
        this.Email = new Button(this._container.find("span:nth-child(11) button"));
        this.More = new MenuButton(this._container.find("kendo-menu ul[role='menubar'] button"));
    }
}