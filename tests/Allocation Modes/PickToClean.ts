import { Scenario as PickToClean } from '../../scenarios/Allocation Mode/PickToCleanScenario';
import { BackEnd, WHS, Login, TestArea, TestGroup, TestType } from '../../src/WHS';

import { Init, Keys, UniqueValue } from "../../src/utils";
import { NJTelnet } from '../../src/utils/telnet';
import { GeneralProperties_AllocationMode } from '../../src/apiFolder/businessPartners';

const scenario = PickToClean

fixture(`Fixture tests`) .meta({fixtureType: 'fixture Type'})
.beforeEach(async t=>{
    await Init.Load({ 
            CredentialGroup: 'TRIAL',
            Scenario: PickToClean.Scenario
        });
    })


test
    .meta( {testType: TestType.UI, group:TestGroup.Allocation, area: TestArea.Shipping, parallel: false}) 
    ('Pick to Clean-Automatic', async t =>{
        /** VARIABLES  */
       
        const orderNumber1 = UniqueValue({text: 'ON1-'});
        const orderNumber2 = UniqueValue({text: 'ON2-'});
       
        // write email, password and select warehouse
        await Login.LoginIn();
        // go to shipping orders
        await WHS.Menu.ShippingOrders.GoTo();

        const createOrder =async (vendor, orderNumber, lineEntries : {oQty: number, sQty: number}[], itm) => {
            await WHS.ShippingOrders.Toolbar.Insert.Click();
            await WHS.ShippingOrders.CreateOrder.Account.Find.Search(vendor);
            await WHS.ShippingOrders.CreateOrder.OrderNumber.SetText(orderNumber);
            await WHS.ShippingOrders.CreateOrder.Save.Click();

            await WHS.ShippingOrders.CreateOrder.SideMenu.LineEntries.Click();

            for( const line of lineEntries){
                await WHS.ShippingOrders.CreateOrder.LineEntries.Toolbar.Insert.SelectByIndex(1);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ItemCode.Search(itm);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.OrderedQty.Increase(line.oQty);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ShippedQty.Increase(line.sQty);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.Insert.Click();
            }
            await WHS.ShippingOrders.CreateOrder.SideMenu.General.Click();
            await WHS.ShippingOrders.CreateOrder.Status.SelectByText('In Process');
            await WHS.ShippingOrders.CreateOrder.Save.Click();
            await WHS.ShippingOrders.CreateOrder.CloseDialog.Click()
        }
        
        const inventoryDetail =  await BackEnd.GetItemInventoryDetail(  { Warehouse: 'Barcode Scanning', Vendor: 'Allocation Account', Item: 'Item1' });
        // Create an order ( status in process ) with 1 entry line with Ordered qty = 10 and Shipped Qty = 10
        await createOrder(PickToClean.Variable.Account, orderNumber1, [{oQty: 10, sQty: 10}], PickToClean.Variable.Item);
        // Create an order ( status in process ) with 2 entry lines, 1st with ordered and shipped 1ty = 4 and 2nd line with ordered and shipped qty =3
        await createOrder(PickToClean.Variable.Account, orderNumber2, [{oQty: 4, sQty: 4}, {oQty: 3, sQty: 3}], PickToClean.Variable.Item);
        
        // go to Item Inventory
        await WHS.Menu.ItemInventory.GoTo();
        // filetr the item by the account
        await WHS.ItemInventory.Toolbar.Search.Click();
        await WHS.ItemInventory.SearchDialog.Account.SearchAndSelect(PickToClean.Variable.Account);
        await WHS.ItemInventory.SearchDialog.Search.Click();

        await WHS.ItemInventory.Table.clickRowByQuery( { rowTitle: 'Item Code', rowValue: PickToClean.Variable.Item } );
        await WHS.ItemInventory.Toolbar.View.Click();
       
        // Verify that the Location1 and lpn1 has the correct qtys in Available and Allocated columns
        let allocated1 = inventoryDetail.find(x=>  x.storageLocation === PickToClean.Variable.Location1 && x.lpn===PickToClean.Variable.LPN1 )?.allocated ?? 0;
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue: PickToClean.Variable.Location1 },
            { rowTitle: 'LPN', rowValue: PickToClean.Variable.LPN1},
            { rowTitle: 'Available', rowValue: '0'},
            { rowTitle: 'Allocated', rowValue: (allocated1 + 10).toString()},
        )).ok(`Row with location :${PickToClean.Variable.Location1} and LPN: ${PickToClean.Variable.LPN1} do not exist` );

        // Verify that the Location1 and lpn2 has the correct qtys in Available and Allocated columns
        let allocated2 = inventoryDetail.find(x=> x.storageLocation == PickToClean.Variable.Location1 && x.lpn==PickToClean.Variable.LPN2 )?.allocated ?? 0;
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue:PickToClean.Variable.Location1 },
            { rowTitle: 'LPN', rowValue: PickToClean.Variable.LPN2},
            { rowTitle: 'Available', rowValue:'20'},
            { rowTitle: 'Allocated', rowValue: allocated2.toString()},
        )).ok(`Row with location :${PickToClean.Variable.Location1} and LPN: ${PickToClean.Variable.LPN1} do not exist` );

        // Verify that the Location2 and lpn3 has the correct qtys in Available and Allocated columns
        let allocated3 = inventoryDetail.find(x=> x.storageLocation == PickToClean.Variable.Location2 && x.lpn==PickToClean.Variable.LPN3 )?.allocated ?? 0;
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue: PickToClean.Variable.Location2 },
            { rowTitle: 'LPN', rowValue: PickToClean.Variable.LPN3},
            { rowTitle: 'Available', rowValue:'0'},
            { rowTitle: 'Allocated', rowValue: (allocated3 + 5).toString()},
        )).ok(`Row with location :${PickToClean.Variable.Location1} and LPN: ${PickToClean.Variable.LPN1} do not exist` );

        // Verify that the Location 2 and lpn4 has the correct qtys in Available and Allocated columns
        let allocated4 = inventoryDetail.find(x=> x.storageLocation == PickToClean.Variable.Location2 && x.lpn==PickToClean.Variable.LPN4 )?.allocated ?? 0;
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue: PickToClean.Variable.Location2 },
            { rowTitle: 'LPN', rowValue: PickToClean.Variable.LPN4},
            { rowTitle: 'Available', rowValue:'0'},
            { rowTitle: 'Allocated', rowValue: (allocated4 + 2).toString()},
        )).ok(`Row with location :${PickToClean.Variable.Location1} and LPN: ${PickToClean.Variable.LPN1} do not exist` );

        const RFTelnet = new NJTelnet(true); 
        await RFTelnet.Connect(); //Init telnet conection
        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("2"); //SHIPPING
        await RFTelnet.Send("1"); //PICK

        const completeOrderPick = async (order, picking: {line:number, location:string, lpn:string, qty: number}[]) => {
            await RFTelnet.Send("1"); //BY ORDER NUMBER
            await RFTelnet.Send(order); //SELECT BY ORDER UMBER
            await RFTelnet.Send('1'); // PICK IN PROCESS - CONTINUE PICKING
            await RFTelnet.Send('1'); // PICK - CONTINUE

            for(const lines of picking){
                await RFTelnet.Send(lines.line.toString()); // PICK - LINE #
                await RFTelnet.Send(lines.location); // PICK - LOCTN 
                await RFTelnet.Send(lines.lpn); // PICK - LPN
                await RFTelnet.Send(PickToClean.Variable.Item); // PICK - ITEM
                await RFTelnet.Send(lines.qty.toString()); // PICK - PICK QTY
                await RFTelnet.Send(Keys.ESC);// SCAN PICK TO LOCATION - PRESS ESC
            }
            // ORDER - COMPLETE AND SHIP THE ORDER
            await RFTelnet.Send(Keys.ESC);// SCAN PICK TO LOCATION - PRESS ESC
            await RFTelnet.Send("2");// PICK KIN PROCESS -MARK AS COMPLETED
            await RFTelnet.Send("1"); // SHIP ORDER
            await RFTelnet.Send("1"); // CONTINUE
            await RFTelnet.Send("1"); // SUCESS - CONTINUE
        }

        // Complete the picking process for order 1
        await completeOrderPick(orderNumber1, [   
                {line: 1, location: PickToClean.Variable.Location1, lpn: PickToClean.Variable.LPN1, qty: 3},  // Pick Line 1
                {line: 2, location: PickToClean.Variable.Location2, lpn: PickToClean.Variable.LPN3, qty: 5},  // Pick Line 2
                {line: 3, location: PickToClean.Variable.Location2, lpn: PickToClean.Variable.LPN4, qty: 2}   // Pick Line 3
        ]);

        // Complete the picking process for order 2
        await completeOrderPick(orderNumber2, [
                {line: 1, location: PickToClean.Variable.Location1, lpn: PickToClean.Variable.LPN1, qty: 4},  // PICK Line 1
                {line: 2, location: PickToClean.Variable.Location1, lpn: PickToClean.Variable.LPN1, qty: 3}   // PICK Line 2
        ]);
        await RFTelnet.End();   // end telnet session

        // Close the Detail view
        await WHS.ItemInventory.Detail.CloseDialog.Click();
        // Reopen the detail view with the updated data
        await WHS.ItemInventory.Table.clickRowByQuery( { rowTitle: 'Item Code', rowValue: PickToClean.Variable.Item } );
        await WHS.ItemInventory.Toolbar.View.Click();
        
        // Verify that the Location1 and lpn1 has the correct qtys in Available and Allocated columns
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue: PickToClean.Variable.Location1 },
            { rowTitle: 'LPN', rowValue: PickToClean.Variable.LPN2},
            { rowTitle: 'Available', rowValue:'20'},
            { rowTitle: 'Allocated', rowValue:'0'},
        )).ok(`Row with location :${PickToClean.Variable.Location1} and LPN: ${PickToClean.Variable.LPN1} do not exist` );;

});


test
    .meta( {testType: TestType.UI, group:TestGroup.Allocation, area: TestArea.Shipping, parallel: false}) 
    ('Pick to Clean-Manual', async t =>{
        /** VARIABLES  */
        let account = PickToClean.Scenario.businessPartners![0];
        if(account.Attributes)
            account.Attributes.General_Properties = {
                allocation_mode:GeneralProperties_AllocationMode.Manual
            }
        if(PickToClean.Scenario.businessPartners)
            PickToClean.Scenario.businessPartners = [account];
        await BackEnd.LoadAccount(account)
        //const account = 'Allocation Account';
        const accountDescription = PickToClean.Scenario.businessPartners![0].Description!;

        //const account = 'Allocation Account';
        const orderNumber1 = UniqueValue({text: 'ON1-'});
        const orderNumber2 = UniqueValue({text: 'ON2-'});
        const item1 = "Item1"
        const location1 = "Allocation G1";
        const location2 = "Allocation G2";
        
        const LPN1 = "AllocationLPN-01";
        const LPN2 = "AllocationLPN-02";
        const LPN3 = "AllocationLPN-03";
        const LPN4 = "AllocationLPN-04";
        
        // write email, password and select warehouse
        await Login.LoginIn();
        // go to shipping orders
        await WHS.Menu.ShippingOrders.GoTo();
        
        const createOrder = async (vendor, orderNumber, lineEntries : {oQty: number}[], itm) : Promise<void> => {
            await WHS.ShippingOrders.Toolbar.Insert.Click();
            await WHS.ShippingOrders.CreateOrder.Account.Find.Search(vendor);
            await WHS.ShippingOrders.CreateOrder.OrderNumber.SetText(orderNumber);
            await WHS.ShippingOrders.CreateOrder.Save.Click();
            
            await WHS.ShippingOrders.CreateOrder.SideMenu.LineEntries.Click();
            
            for( const line of lineEntries){
                await WHS.ShippingOrders.CreateOrder.LineEntries.Toolbar.Insert.Click();
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ItemCode.Search(itm);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.OrderedQty.Increase(line.oQty);
                //await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.ShippedQty.Increase(line.sQty);
                await WHS.ShippingOrders.CreateOrder.LineEntries.GeneralPanel.Insert.Click();
            }
            await WHS.ShippingOrders.CreateOrder.SideMenu.General.Click();
            await WHS.ShippingOrders.CreateOrder.Status.SelectByText('In Process');
            await WHS.ShippingOrders.CreateOrder.Save.Click();
            await WHS.ShippingOrders.CreateOrder.CloseDialog.Click()
        }
        // Create an order ( status in process ) with 1 entry line with Ordered qty = 10 and Shipped Qty = 10
        
        await createOrder(accountDescription, orderNumber1, [{oQty: 10}], item1);
        // Create an order ( status in process ) with 2 entry lines, 1st with ordered and shipped 1ty = 4 and 2nd line with ordered and shipped qty =3
        // await WHS.ShippingOrders.Toolbar.Insert.Click();
        await createOrder(accountDescription, orderNumber2, [{oQty: 4}, {oQty: 3}], item1);
        
        const inventoryDetail =  await BackEnd.GetItemInventoryDetail(  { Warehouse: 'Barcode Scanning', Vendor: 'Allocation Account', Item: 'Item1' });
        // Verify that the Location1 and lpn1 has the correct qtys in Available and Allocated columns
        const allocated1 = inventoryDetail.find(x=> x.storageLocation == location1 && x.lpn==LPN1 );
        await t.expect(allocated1?.available).eql(10, 'Allocation G1 and AllocationLPN-01 doesn\'t have the expected available quantities = 10');
        // Verify that the Location1 and lpn2 has the correct qtys in Available and Allocated columns
        const allocated2 = inventoryDetail.find(x=> x.storageLocation == location1 && x.lpn==LPN2 );
        await t.expect(allocated2?.available).eql(20, 'Allocation G1 and AllocationLPN-01 doesn\'t have the expected available quantities = 20');
        // Verify that the Location2 and lpn3 has the correct qtys in Available and Allocated columns
        const allocated3 = inventoryDetail.find(x=> x.storageLocation == location2 && x.lpn==LPN3 );
        await t.expect(allocated3?.available).eql(5, 'Allocation G1 and AllocationLPN-01 doesn\'t have the expected available quantities = 5');
        // Verify that the Location 2 and lpn4 has the correct qtys in Available and Allocated columns
        const allocated4 = inventoryDetail.find(x=> x.storageLocation == location2 && x.lpn==LPN4 );
        await t.expect(allocated4?.available).eql(2, 'Allocation G1 and AllocationLPN-01 doesn\'t have the expected available quantities = 3');

        //Allocation G2-AllocationLPN-04 -
        const RFTelnet = new NJTelnet(true); 
        await RFTelnet.Connect(); //Init telnet conection
        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("2"); //SHIPPING
        await RFTelnet.Send("1"); //PICK

        const completeOrderPick = async (order, picking: {line:number, location:string, lpn:string, qty: number}[]) => {
            await RFTelnet.Send("1"); //BY ORDER NUMBER
            await RFTelnet.Send(order); //SELECT BY ORDER UMBER
            await RFTelnet.Send('1'); // PICK IN PROCESS - CONTINUE PICKING
            await RFTelnet.Send('1'); // PICK - CONTINUE
            
            for(const lines of picking){
                await RFTelnet.Send(lines.line.toString()); // PICK - LINE #
                await RFTelnet.Send(lines.location); // PICK - LOCTN 
                await RFTelnet.Send(lines.lpn); // PICK - LPN
                await RFTelnet.Send(item1); // PICK - ITEM
                await RFTelnet.Send(lines.qty.toString()); // PICK - PICK QTY
                await RFTelnet.Send(Keys.ESC);// SCAN PICK TO LOCATION - PRESS ESC
            }
            // ORDER - COMPLETE AND SHIP THE ORDER
            await RFTelnet.Send(Keys.ESC);// SCAN PICK TO LOCATION - PRESS ESC
            await RFTelnet.Send("2");// PICK KIN PROCESS -MARK AS COMPLETED
            await RFTelnet.Send("1"); // SHIP ORDER
            await RFTelnet.Send("1"); // CONTINUE
            await RFTelnet.Send("1"); // SUCESS - CONTINUE
        }
        
        // Complete the picking process for order 1
        await completeOrderPick(orderNumber1, [   
                {line: 1, location: location1, lpn: LPN1, qty: 3},  // Pick Line 1
                {line: 2, location: location2, lpn: LPN4, qty: 2},  // Pick Line 2
                {line: 3, location: location2, lpn: LPN3, qty: 5}   // Pick Line 3
            ]);

        // Complete the picking process for order 2
        await completeOrderPick(orderNumber2, [
                {line: 1, location: location1, lpn: LPN1, qty: 2},  // PICK Line 1
                {line: 2, location: location1, lpn: LPN1, qty: 2},  // PICK Line 2
                {line: 3, location: location1, lpn: LPN1, qty: 2},  // PICK Line 3
                {line: 4, location: location1, lpn: LPN1, qty: 1}   // PICK Line 4
            ]);
            await RFTelnet.End();   // end telnet session

        // go to Item Inventory
        await WHS.Menu.ItemInventory.GoTo();
        // filetr the item by the account
        await WHS.ItemInventory.Toolbar.Search.Click();
        await WHS.ItemInventory.SearchDialog.Account.SearchAndSelect(accountDescription);
        await WHS.ItemInventory.SearchDialog.Search.Click();

        await WHS.ItemInventory.Table.clickRowByQuery( { rowTitle: 'Item Code', rowValue: item1 } );
        await WHS.ItemInventory.Toolbar.View.Click();
        
        // Verify that the Location1 and lpn1 has the correct qtys in Available and Allocated columns
        await t.expect(await WHS.ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle:'Location', rowValue: location1 },
            { rowTitle: 'LPN', rowValue: LPN2},
            { rowTitle: 'Available', rowValue:'20'},
            { rowTitle: 'Allocated', rowValue:'0'},
        )).ok(`Row with location :${location1} and LPN: ${LPN2} do not exist` );
});
