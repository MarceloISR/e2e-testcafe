import { Button } from "../../basicObjects";
import { BaseObject } from "../../basicObjects/baseObject";

export class ShippingSideMenu extends BaseObject {

    public General : Button;
    public LineEntries: Button;
    public RoutingDetail: Button;
    public PickTickets: Button;

    public SmallParcel: Button;
    public PacketCartons: Button;
    public LPNs: Button;
    
    public Appointment: Button;
    public ChargeCodes: Button;
    public Documents: Button;
    public Notes: Button;
    public SourceData: Button;
    public EventHistory : Button;
    public EventManagement: Button;

    constructor(selector: Selector){
        super(selector);
        this.General = new Button(this._container.find('mat-sidenav ul>div:nth-child(1)'));
        this.LineEntries = new Button(this._container.find('mat-sidenav ul>div:nth-child(2)'));
        this.RoutingDetail = new Button(this._container.find('mat-sidenav ul>div:nth-child(3)'));
        this.PickTickets = new Button(this._container.find('mat-sidenav ul>div:nth-child(4)'));
        this.SmallParcel = new Button(this._container.find('mat-sidenav ul>div:nth-child(5)'));
        this.PacketCartons = new Button(this._container.find('mat-sidenav ul>div:nth-child(6)'));
        this.LPNs = new Button(this._container.find('mat-sidenav ul>div:nth-child(7)'));

        this.Appointment = new Button(this._container.find('mat-sidenav ul>div:nth-child(8)'));
        this.ChargeCodes = new Button(this._container.find('mat-sidenav ul>div:nth-child(9)'));
        this.Documents = new Button(this._container.find('mat-sidenav ul>div:nth-child(10)'));
        this.Notes = new Button(this._container.find('mat-sidenav ul>div:nth-child(11)'));
        this.SourceData = new Button(this._container.find('mat-sidenav ul>div:nth-child(12)'));
        this.EventHistory = new Button(this._container.find('mat-sidenav ul>div:nth-child(13)'));
        this.EventManagement = new Button(this._container.find('mat-sidenav ul>div:nth-child(14)'));
    }

}