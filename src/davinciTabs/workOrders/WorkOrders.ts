import { Selector } from "testcafe";
import { WorkOrdersToolbar } from "./workOrdersToolbar";
import { Table } from "../../pageObject";


export class workOrders {

    private _container: Selector;
    public Toolbar : WorkOrdersToolbar;
    //public CreateOrder: ShippingOrdersModal;
    public Table : Table;

    constructor(){
        //super(Selector('.k-state-active receiving'), Selector('.k-state-active receiving').find('[role=grid]'));
        this._container = Selector('.k-state-active work-orders');
        //this.Toolbar = new ReceivingOrders_Toolbar(this._container.find('.k-toolbar'));
        this.Toolbar = new WorkOrdersToolbar(this._container);
        //this.CreateOrder = new ShippingOrdersModal(this._container);
        this.Table = new Table(this._container.find('[role=grid]'));

        
    }
}