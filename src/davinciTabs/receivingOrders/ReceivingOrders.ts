import { Selector } from "testcafe";
import { ReceivingOrdersModal, ReceivingOrders_Toolbar } from ".";
import { Table } from "../../pageObject";
import { ConfirmDialog } from "./confirmDialog";


export class receivingOrders {

    private _container: Selector;
    public Toolbar : ReceivingOrders_Toolbar;
    public CreateReceivingOrder: ReceivingOrdersModal;
    public Table : Table;

    constructor(){
        //super(Selector('.k-state-active receiving'), Selector('.k-state-active receiving').find('[role=grid]'));
        this._container = Selector('.k-state-active receiving');
        //this.Toolbar = new ReceivingOrders_Toolbar(this._container.find('.k-toolbar'));
        this.Toolbar = new ReceivingOrders_Toolbar(this._container);
        this.CreateReceivingOrder = new ReceivingOrdersModal(this._container);
        this.Table = new Table(this._container.find('[role=grid]'));

        
    }
}