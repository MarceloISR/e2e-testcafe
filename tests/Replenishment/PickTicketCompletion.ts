import { Replenishment } from '../../scenarios/Replenishment/ReplenishmentScenario';
import { BackEnd, WHS, Login, Menu } from '../../src/WHS';
import { Init, UniqueValue } from "../../src/utils";
import { NJTelnet } from '../../src/utils/telnet';

fixture(`Replenishment`) .meta({fixtureType: 'On Pick ticket Creation'})
    .beforeEach(async t=>{
        await Init.Load({ 
            CredentialGroup: 'TRIAL',
            Scenario: Replenishment.Scenario
        });
    })


test.meta( {testType: 'regression', group:'replenishment', area: 'on completion', parallel: false}) 
    ('DPD-1997: On Pick Ticket Completion', async t =>{
        /** VARIABLES  */
        const orderNumber = UniqueValue( {text: 'ReplenishmentOrder', suffix:false});

        // Change the Account configuration
        let updatedAccount = Replenishment.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Work_Orders){
            // Enable On Pick Ticket Completion
            updatedAccount.Attributes.Work_Orders.Replenish_on_Pick_Ticket_Completion= true;
            // Disable On Pick Ticket Creation
            updatedAccount.Attributes.Work_Orders.Replenish_on_Pick_Ticket_creation= false;
        }
        // Load the Changes
        await BackEnd.LoadAccount(updatedAccount!);
    
        // write email, password and select warehouse
        await Login.LoginIn();

        //go to Shipping Orders
        await WHS.Menu.ShippingOrders.GoTo();
        //Create a new Shipping order
        await WHS.ShippingOrders.Toolbar.Insert.Click();
        //select Account
        await WHS.ShippingOrders.CreateOrder.Account.Find.Search(Replenishment.Variables.account);
        //set a Order Number
        await WHS.ShippingOrders.CreateOrder.OrderNumber.SetText(orderNumber);
        //Save order
        await WHS.ShippingOrders.CreateOrder.Save.Click();


        //Go to Line Entries
        await WHS.ShippingOrders.CreateOrder.SideMenu.LineEntries.Click();
        //Insert a new Line
        await WHS.ShippingOrders.CreateOrder.LineEntries.Toolbar.Insert.Click();
        //Search the Item and select the one with Eaches
        await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ItemCode.Search(Replenishment.Variables.itemCode, Replenishment.Variables.itemCode+' EA');
        //Select LotCode
        await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.LotCode.SetText('A');
        //Select Sublot Code
        await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.SublotCode.SetText('1');
        //set Ordered QTY
        await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.OrderedQty.Increase(10);
        //Insert the line intry
        await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.Insert.Click();
        //Save the Order
        await WHS.ShippingOrders.CreateOrder.Save.Click();

        //Go to general view
        await WHS.ShippingOrders.CreateOrder.SideMenu.General.Click();
        //Change status to In Process
        await WHS.ShippingOrders.CreateOrder.Status.SelectByText('In Process');
        //Save Order
        await WHS.ShippingOrders.CreateOrder.Save.Click();
        //Close dialog
        await WHS.ShippingOrders.CreateOrder.CloseDialog.Click();

        //Go to Work Orders Tab
        await WHS.Menu.WorkOrders.GoTo();
        //Refresh the table
        await WHS.WorkOrders.Toolbar.Refresh.Click();
        //Verify that there is no new Order created
        await t.expect(await WHS.WorkOrders.Table.getRowCounts()).eql(0, 'there is no new WorkOrder when the pick ticket is created');

        // Complete the pick ticket through RF
        const RFTelnet = new NJTelnet(); 
        await RFTelnet.Connect(); //Init telnet conection
        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("2"); //Select SHIPPING
        await RFTelnet.Send("1"); //Select PICK
        await RFTelnet.Send("1"); //Select BY ORDER NUMBER
        await RFTelnet.Send("1"); //CONTINUE PICKING
        await RFTelnet.Send("1"); //1 CONTINUE
        await RFTelnet.Send("1"); //SELECT ITEM
        await RFTelnet.Send(Replenishment.Variables.PickFace); //SCAN LOCTN: Rep-PF1
        await RFTelnet.Send(Replenishment.Variables.lpn1); //SCAN LPN: Rep-LPN1
        await RFTelnet.Send('A'); //SCAN LOT CODE: A
        await RFTelnet.Send('1'); //PICK SUBLOT CODE : 1
        await RFTelnet.Send("10"); //PICK QTY :10
        await RFTelnet.Send(Replenishment.Variables.PickFace); //SCAN LOCTN: Rep-PF1
        await RFTelnet.End();   // end telnet session

        //Refres work orders table
        await WHS.WorkOrders.Toolbar.Refresh.Click();
        //Verify that a new Work Order is created when
        await t.expect(await WHS.WorkOrders.Table.getRowCounts()).eql(1, 'there is no new WorkOrder when the pick ticket is completed');

        // Complete the Work Order through RF
        await RFTelnet.Connect(); //Init telnet conection
        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("5"); //Select WORK ORDERS
        await RFTelnet.Send("1"); //Select EXISTING ORDER
        await RFTelnet.Send("1"); //Select BY ORDER NUMBER
        await RFTelnet.Send("1"); //1 CONTINUE
        await RFTelnet.Send(Replenishment.Variables.Loc1); //WORK ORDER LOCTN: Rep-Loc1
        await RFTelnet.Send(Replenishment.Variables.itemCode); //WORK ORDER ITEM CODE: ItemRep
        await RFTelnet.Send('A'); //WORK ORDER LOT CODE: A
        await RFTelnet.Send('1'); //WORK ORDER SUBLOT CO: 1
        await RFTelnet.Send('8'); //WORK ORDER RELOCATE: 8
        await RFTelnet.Send(Replenishment.Variables.PickFace); //WORK ORDER ITEM CODE: Rep-PF1
        await RFTelnet.Send("1"); //REPLENISMENT COMPLETED PRESS 1 to CONTINUE
        await RFTelnet.End();   // end telnet session

        //go to Item Inventory tab
        await WHS.Menu.ItemInventory.GoTo();
        await WHS.ItemInventory.Toolbar.Search.Click();
        //Filter order by account
        await WHS.ItemInventory.SearchDialog.Account.Find.Search(Replenishment.Variables.account);
        await WHS.ItemInventory.SearchDialog.Search.Click();
        //Verify the Eaches inventory is the expected one
        await t.expect(await WHS.ItemInventory.Table.getCellValue(
            {targed: 'Available Qty'},
            {rowTitle: 'Item Code', rowValue: 'ItemRep'},
            {rowTitle: 'UOM', rowValue: 'EA'}
        )).eql('55', 'The replenishment didn\'t relocate the correct amount. Expeacted value = 55');

        //Verify that Item Cases inventory is the expected one
        await t.expect(await WHS.ItemInventory.Table.getCellValue(
            {targed: 'Available Qty'},
            {rowTitle: 'Item Code', rowValue: 'ItemRep'},
            {rowTitle: 'UOM', rowValue: 'CS:5'}
        )).eql('92', 'The replenishment didn\'t relocate the correct amount. Expected value = 92');
    });
