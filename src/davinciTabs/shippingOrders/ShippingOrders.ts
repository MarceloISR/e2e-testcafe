import { Selector} from "testcafe";
import { Table } from "../../pageObject";
import { BaseDialog } from "../../pageObject/dialogs/baseDialog";
import { ShippingOrders_Toolbar } from "./ShippingOrdersToolbar";
import { ComboboxWithToolbar, Dropdown, TextBox } from "../../basicObjects";

import { ShippingLineEntries } from "./LineEntries/LineEntries";
import { ShippingSideMenu } from "./ShippingSideMenu";
import { ShippingPickTickets } from "./PickTickets/PickTickets";



export class shippingOrders  {
    private _container: Selector;
    public Toolbar : ShippingOrders_Toolbar;
    public CreateOrder: ShippingOrdersModal;
    public Table : Table;

    constructor(){
        //super(Selector('.k-state-active receiving'), Selector('.k-state-active receiving').find('[role=grid]'));
        this._container = Selector('.k-state-active shipping');
        //this.Toolbar = new ReceivingOrders_Toolbar(this._container.find('.k-toolbar'));
        this.Toolbar = new ShippingOrders_Toolbar(this._container);
        this.CreateOrder = new ShippingOrdersModal(this._container);
        this.Table = new Table(this._container.find('[role=grid]'));

        
    }
}



export class ShippingOrdersModal extends BaseDialog{
    public Status: Dropdown;
    public Account : ComboboxWithToolbar;
    public Carrier: ComboboxWithToolbar;
    public Supplier: ComboboxWithToolbar;
    public ReceivedFrom: ComboboxWithToolbar;
    public OrderNumber: TextBox;

    public SideMenu: ShippingSideMenu;

    public LineEntries: ShippingLineEntries;
    public PickTickets: ShippingPickTickets;

    constructor(selector: Selector){
        super(selector.find('kendo-dialog.largeDialogBox'));

        this.SideMenu = new ShippingSideMenu(this._container.find('mat-sidenav'));
        this.Account = new ComboboxWithToolbar(this._container.find('span').withText('Account').nextSibling('span.searchAndSearchButton'));
        this.Carrier = new ComboboxWithToolbar(this._container.find('span').withText('Carrier').nextSibling('span.searchAndSearchButton '));
        this.Supplier = new ComboboxWithToolbar(this._container.find('span').withText('Shipper').nextSibling('span.searchAndSearchButton '));
        this.Status = new Dropdown(this._container.find('span').withText('Status').nextSibling('kendo-dropdownlist'));
        this.OrderNumber = new TextBox(this._container.find('span').withText('Order Number').nextSibling('span').find('input'));


        this.LineEntries = new ShippingLineEntries(this._container.find('shipping-line-entries'));
        this.PickTickets = new ShippingPickTickets(this._container.find('pick-tickets'));

        


    }
}


