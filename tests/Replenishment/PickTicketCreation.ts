import { Replenishment } from '../../scenarios/Replenishment/ReplenishmentScenario';
import { DVU, Login, Menu } from '../../src/DVU';
import { Init, UniqueValue } from "../../src/utils";
import { NJTelnet } from '../../src/utils/telnet';


fixture(`Replenishment`) .meta({fixtureType: 'On Pick ticket Creation'})
    .beforeEach(async t=>{
        await Init.Load({ 
            CredentialGroup: 'TRIAL',
            Scenario: Replenishment.Scenario
        });
    })


test.meta( {testType: 'regression', group:'replenishment', area: 'on creation', parallel: false}) 
    ('DPD-1996: On Pick Ticket Creation', async t =>{
        /** VARIABLES  */
        const orderNumber = UniqueValue( {text: 'ReplenishmentOrder', suffix:false});
        // write email, password and select warehouse
        await Login.LoginIn();

        // Go to Work Orders tab
        await DVU.Menu.WorkOrders.GoTo();
        // get the qty of rows displayed in the work orders tab
        const rowCount = await DVU.WorkOrders.Table.getRowCounts();

        // Go to Shipping orders
        await DVU.Menu.ShippingOrders.GoTo();
        // Click insert new order
        await DVU.ShippingOrders.Toolbar.Insert.Click();
        // Select the Account
        await DVU.ShippingOrders.CreateOrder.Account.Find.Search(Replenishment.Variables.account);
        // Set the Order Number
        await DVU.ShippingOrders.CreateOrder.OrderNumber.SetText(orderNumber);
        // Save the Order
        await DVU.ShippingOrders.CreateOrder.Save.Click();

        // Click on the Side Menu-> LineEntries
        await DVU.ShippingOrders.CreateOrder.SideMenu.LineEntries.Click();
        // Click insert button
        await DVU.ShippingOrders.CreateOrder.LineEntries.Toolbar.Insert.Click();
        // Search the Item
        await DVU.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ItemCode.Search(Replenishment.Variables.itemCode, Replenishment.Variables.itemCode+' EA');
        // Set the LotCode
        await DVU.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.LotCode.SetText('A');
        // Set the Sublot Code
        await DVU.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.SublotCode.SetText('1');
        // Set the Ordered Qty
        await DVU.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.OrderedQty.Increase(10);

        // CLick insert Line entry
        await DVU.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.Insert.Click();
        // Save Order
        await DVU.ShippingOrders.CreateOrder.Save.Click();

        // Go to Order's general view
        await DVU.ShippingOrders.CreateOrder.SideMenu.General.Click();
        // Change status to In process
        await DVU.ShippingOrders.CreateOrder.Status.SelectByText('In Process');
        // save Order
        await DVU.ShippingOrders.CreateOrder.Save.Click();
        // Close dialog
        await DVU.ShippingOrders.CreateOrder.CloseDialog.Click();

        // Go to WorkOrder
        await DVU.Menu.WorkOrders.GoTo();
        // Click on Refres button
        await DVU.WorkOrders.Toolbar.Refresh.Click();
        // Verify that there is a new Work order Created
        await t.expect(await DVU.WorkOrders.Table.getRowCounts()).gt(rowCount, 'there is no new WorkOrder when the pick ticket is created');

        const RFTelnet = new NJTelnet(); 
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

        // Go to Item Inventory
        await DVU.Menu.ItemInventory.GoTo();
        // Filter the inventory by Account
        await DVU.ItemInventory.Toolbar.Search.Click();
        await DVU.ItemInventory.SearchDialog.Account.Find.Search(Replenishment.Variables.account);
        await DVU.ItemInventory.SearchDialog.Search.Click();

        // Verify that the expected value for Eachs after the replenishment is the expected one
        await t.expect(await DVU.ItemInventory.Table.getCellValue(
            {targed: 'Available Qty'},
            {rowTitle: 'Item Code', rowValue: 'ItemRep'},
            {rowTitle: 'UOM', rowValue: 'EA'}
        )).eql('55', 'The replenishment didn\'t relocate the correct amount. Expeacted value = 55');
        
        // Verify that the expected value for Cases after the replenishment is the expected one
        await t.expect(await DVU.ItemInventory.Table.getCellValue(
            {targed: 'Available Qty'},
            {rowTitle: 'Item Code', rowValue: 'ItemRep'},
            {rowTitle: 'UOM', rowValue: 'CS:5'}
        )).eql('92', 'The replenishment didn\'t relocate the correct amount. Expected value = 92');
    });