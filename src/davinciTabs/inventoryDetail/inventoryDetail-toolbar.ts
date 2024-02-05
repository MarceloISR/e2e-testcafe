import { Button } from "../../basicObjects";
import { Toolbar } from "../../pageObject";


export class InventoryDetail_Toolbar extends Toolbar{

    public Adjust: Button;
    public Relocate: Button;
    public Convert: Button;
    public Edit: Button;
    public ChangeStatus: Button;
    public AllocationDetails: Button;

    constructor(selector: Selector){
        
        super(selector.find('incos.block'));

        this.Adjust = new Button(this._container.find('span:nth-child(1) button'));
        this.Relocate =  new Button(this._container.find('span:nth-child(2) button'));
        this.Convert =  new Button(this._container.find('span:nth-child(3) button'));
        this.Edit =  new Button(this._container.find('span:nth-child(4) button'));
        this.ChangeStatus =  new Button(this._container.find('span:nth-child(5) button'));
        this.AllocationDetails =  new Button(this._container.find('span:nth-child(6) button'));
    }
}