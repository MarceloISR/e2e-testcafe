import { Button, Combobox, ComboboxSearch, ComboboxWriteAndSearch } from "../../../basicObjects";
import { BaseObject } from "../../../basicObjects/baseObject";
import { Table } from "../../../pageObject";

export class ShippingPickTickets extends BaseObject{
    
    public PickTicket : Combobox;
    public Create: Button;
    public Delete: Button;
    
    public Print: Button;

    public Table: Table;
    constructor(selector: Selector){
        super(selector)

        const createId = this._container.find('[role="tooltip"]').withExactText('Create Pick Ticket').getAttribute('id');
        this.Create = new Button(this._container.find(`button[aria-describedby='${createId}']`));

        const deleteId = this._container.find('[role="tooltip"]').withExactText('Delete').getAttribute('id');
        this.Delete = new Button(this._container.find(`button[aria-describedby='${deleteId}']`));

        const printId = this._container.find('[role="tooltip"]').withExactText('Print').getAttribute('id');
        this.Print = new Button(this._container.find(`button[aria-describedby='${printId}']`));

        this.Table = new Table(this._container.find('[role="grid"]'));
    }
}