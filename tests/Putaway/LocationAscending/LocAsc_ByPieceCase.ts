import { Scenario as Putaway} from "../../../scenarios/Putaway/PutawayScenario";
import { BackEnd, DVU, Login } from "../../../src/DVU";
import { BarcodeScanning_PutawayStyle } from "../../../src/apiFolder/businessPartners";
import { Init } from "../../../src/utils";
import { NJTelnet } from "../../../src/utils/telnet";

fixture(`Location Ascending - Manual Allocation`) .meta({fixtureType: 'fixture Type'})

.beforeEach(async t=>{
    await Init.Load({ 
            CredentialGroup: 'TRIAL',
            Scenario: Putaway.Scenario,
        });
    })
    
test.meta( { testType: 'regression', group: 'putaway', area: 'location Ascending', parallelizable: false } ) 
    ('DPD-1889: By Piece/Case - Item Code', async t =>{
    await Login.LoginIn();

    const RFTelnet =  new NJTelnet(true); 
    await RFTelnet.Connect(); //Init telnet conection

    await RFTelnet.Login();   //Login to RF
    
    await RFTelnet.Send("3"); //RECEIVING
    await RFTelnet.Send("3"); //PUTAWAY
    await RFTelnet.Send("3"); //BY PIECE/CASE
    //1st Iteration
    await RFTelnet.Send("1"); //SCAN LPN
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("WHT"); //SCAN LOT CODE
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    //2nd Iteration
    await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //3rd Iteration
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
    await RFTelnet.Send("1"); //SUCCESS
    //4th Iteration
    await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
    await RFTelnet.Send("1"); //SUCCESS
    //5th Iteration
    await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
    await RFTelnet.Send("1"); //SUCCESS
    await RFTelnet.End()

    await DVU.Menu.InventoryByLocation.GoTo();
    await DVU.InventoryByLocation.Toolbar.Search.Click();
    await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
    await DVU.InventoryByLocation.SearchDialog.Search.Click();

    // 1.Verify there are 15 available qty in location 1 with Lot=WTH and Sublot=M
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'Lot Code', rowValue: 'WHT'},
        { rowTitle: 'Sublot Code', rowValue: 'M'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
    )).eql('10', `the location ${Putaway.Variable.Loc1} should have an qty of 10 when Lot=WHT and SubLot=M`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 2.Verify there are 5 available qty in location 1 with Lot=BLK and Sublot=S
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'S'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
    )).eql('5', `the location ${Putaway.Variable.Loc1} should have an qty of 5 when Lot=BLK and SubLot=S`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 3.Verify there are 12 available qty in location 2 with Lot=BLK and Sublot=S
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'S'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
    )).eql('12', `the location ${Putaway.Variable.Loc2} should have an qty of 12 when Lot=BLK and SubLot=S`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 4.Verify there are 5 available qty in location 2 with Lot=BLK and Sublot=L
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'L'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
    )).eql('5', `the location ${Putaway.Variable.Loc2} should have an qty of 5 when Lot=BLK and SubLot=L`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();


});

test.meta( { testType: 'regression', group: 'putaway', area: 'location Ascending', parallelizable: false } ) 
('DPD-1890: By Piece/Case - Item and Lot Code', async t =>{
    
    //from the account update the putawayt style to Item and Lot Code
    let updatedAccount = Putaway.Scenario.businessPartners![0];
    if(updatedAccount?.Attributes?.Barcode_Scanning){
        updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_and_LotCode;
    }
    await BackEnd.LoadAccount(updatedAccount!);

    //Login into DVU
    await Login.LoginIn();

    //*******************RF BEGIN *****************/
    // This block will do the Direct putawayt through RF
    const RFTelnet =  new NJTelnet(true); 
    await RFTelnet.Connect(); //Init telnet conection

    await RFTelnet.Login();   //Login to RF
    
    await RFTelnet.Send("3"); //RECEIVING
    await RFTelnet.Send("3"); //PUTAWAY
    await RFTelnet.Send("3"); //BY PIECE/CASE
    await RFTelnet.Send("1"); //SCAN LPN
    //1st Iteration
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("WHT"); //SCAN LOT CODE
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //2nd Iteration
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //3rd Iteration
    await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //4th Iteration
    await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //Close RF connection
    await RFTelnet.End();
    //*******************RF END*****************/

    //Go to INventory by LPN
    await DVU.Menu.InventoryByLocation.GoTo();
    await DVU.InventoryByLocation.Toolbar.Search.Click();
    //filter the Inventory by the accouant
    await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
    await DVU.InventoryByLocation.SearchDialog.Search.Click();

    // 1.Verify there are 15 available qty in location 1 with Lot=WHT and Sublot=M
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'Lot Code', rowValue: 'WHT'},
        { rowTitle: 'Sublot Code', rowValue: 'M'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
    )).eql('15', `the location ${Putaway.Variable.Loc1} should have an qty of 15 when Lot=WHT and SubLot=M`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 2.Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=S
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'S'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
    )).eql('17', `the location ${Putaway.Variable.Loc2} should have an qty of 17 when Lot=BLK and SubLot=S`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 3.Verify there are 3 available qty in location 2 with Lot=BLK and Sublot=L
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'L'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
    )).eql('3', `the location ${Putaway.Variable.Loc2} should have an qty of 3 when Lot=BLK and SubLot=L`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 4.Verify there are 2 available qty in location 4 with Lot=BLK and Sublot=L
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'L'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
    )).eql('2', `the location ${Putaway.Variable.Loc4} should have an qty of 2 when Lot=BLK and SubLot=L`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();
});

test.meta( { testType: 'regression', group: 'putaway', area: 'location Ascending', parallelizable: false } ) 
('DPD-1891: By Piece/Case - Item, Lot and Sublot Code', async t =>{
    
    //from the account update the putawayt style to Item, Lot and SubLot Code
    let updatedAccount = Putaway.Scenario.businessPartners![0];
    if(updatedAccount?.Attributes?.Barcode_Scanning){
        updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_lot_and_SublotCode;
    }
    await BackEnd.LoadAccount(updatedAccount!);

    //Login into DVU
    await Login.LoginIn();

    //*******************RF BEGIN *****************/
    // This block will do the Direct putawayt through RF
    const RFTelnet =  new NJTelnet(true); 
    await RFTelnet.Connect(); //Init telnet conection

    await RFTelnet.Login();   //Login to RF
    
    await RFTelnet.Send("3"); //RECEIVING
    await RFTelnet.Send("3"); //PUTAWAY
    await RFTelnet.Send("3"); //BY PIECE/CASE
    await RFTelnet.Send("1"); //SCAN LPN
    //1st Iteration
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("WHT"); //SCAN LOT CODE
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //2nd Iteration
    await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //3rd Iteration
    await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //4th Iteration
    await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
    await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
    await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc1
    await RFTelnet.Send("1"); //SUCCESS
    //Close RF connection
    await RFTelnet.End();
    //*******************RF END*****************/

    //Go to INventory by LPN
    await DVU.Menu.InventoryByLocation.GoTo();
    await DVU.InventoryByLocation.Toolbar.Search.Click();
    //filter the Inventory by the accouant
    await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
    await DVU.InventoryByLocation.SearchDialog.Search.Click();

    // 1.Verify there are 15 available qty in location 1 with Lot=WHT and Sublot=M
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'Lot Code', rowValue: 'WHT'},
        { rowTitle: 'Sublot Code', rowValue: 'M'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
    )).eql('15', `the location ${Putaway.Variable.Loc1} should have an qty of 15 when Lot=WHT and SubLot=M`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 2.Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=S
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'S'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
    )).eql('17', `the location ${Putaway.Variable.Loc2} should have an qty of 17 when Lot=BLK and SubLot=S`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();

    // 3.Verify there are 20 available qty in location 4 with Lot=BLK and Sublot=L
    await DVU.InventoryByLocation.Table.clickRowByQuery(
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
        { rowTitle: 'Lot Code', rowValue: 'BLK'},
        { rowTitle: 'Sublot Code', rowValue: 'L'}
    );
    await DVU.InventoryByLocation.Toolbar.View.Click();
    await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
        { targed: 'Available'},
        { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
        { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
    )).eql('20', `the location ${Putaway.Variable.Loc2} should have an qty of 20 when Lot=BLK and SubLot=L`);
    await DVU.InventoryByLocation.Detail.CloseDialog.Click();
});

test.meta( { testType: 'regression', group: 'putaway', area: 'location Ascending', parallelizable: false } ) 
    ('DPD-1892: By Piece/Case - Lot Code', async t =>{
        //from the account update the putawayt style to Item, Lot and SubLot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.LotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into DVU
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =  new NJTelnet(true); 
        await RFTelnet.Connect(); //Init telnet conection

        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("3"); //RECEIVING
        await RFTelnet.Send("3"); //PUTAWAY
        await RFTelnet.Send("3"); //BY PIECE/CASE
        await RFTelnet.Send("1"); //SCAN LPN

         //1st Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("WHT"); //SCAN LOT CODE
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty5"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();

        //got to inventory by location tab
        await DVU.Menu.InventoryByLocation.GoTo();
        //search the inventory by the account
        await DVU.InventoryByLocation.Toolbar.Search.Click();
        await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await DVU.InventoryByLocation.SearchDialog.Search.Click();

        //Verify Empty5 location has available qty=10 of lot=WHT and sublot=M
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'},
        )).eql('10', 'the location '+Putaway.Variable.Emtpy5+' should have a qty of 10 items with lot = WHT and sublot = M');
        
        //Verify Empty6 location has available qty=10 of lot=BLK and sublot=L
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'},
        )).eql('5', 'the location '+Putaway.Variable.Emtpy6+' should have a qty of 5 items wit lot = BLK and sublot L');

        //Verify Empty5 location has available qty=10 of lot=BLK and sublot=S
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'},
        )).eql('10', 'the location '+Putaway.Variable.Emtpy6+' should have a qty of 10 items wit lot=BLK and sublot=S');
    
        //Verify Location1 location has available qty=5 of lot=BLK and sublot=S
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1}
        )).eql('5', 'the location '+Putaway.Variable.Loc1+' should have a qty of 5 items wit lot=WHT and sublot=M');
    
        //Verify Location2 location has available qty=7 of lot=BLK and sublot=S
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2}
        )).eql('7', 'the location '+Putaway.Variable.Loc2+' should have a qty of 7 items wit lot=BLK and sublot=S');
        
        //Verify Location3 location has available qty=15 of lot=WHT and sublot=L
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3}
        )).eql('15', 'the location '+Putaway.Variable.Loc3+' should have a qty of 15 items wit lot=WHT and sublot=L');

        //Verify Location4 location has available qty=15 of lot=BLK and sublot=L
        await t.expect(await DVU.InventoryByLocation.Table.getCellValue(
            { targed: 'Available Qty'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4}
        )).eql('15', 'the location '+Putaway.Variable.Loc4+' should have a qty of 15 items wit lot=BLK and sublot=L');
    })

test.meta( { testType: 'regression', group: 'putaway', area: 'location Ascending', parallelizable: false } ) 
    ('DPD-1893: By Piece/Case - SubLot Code', async t =>{
        //from the account update the putawayt style to Item, Lot and SubLot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.SubLotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into DVU
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =  new NJTelnet(true); 
        await RFTelnet.Connect(); //Init telnet conection

        await RFTelnet.Login();   //Login to RF
        await RFTelnet.Send("3"); //RECEIVING
        await RFTelnet.Send("3"); //PUTAWAY
        await RFTelnet.Send("3"); //BY PIECE/CASE
        await RFTelnet.Send("1"); //SCAN LPN

         //1st Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("WHT"); //SCAN LOT CODE
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty5"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty3"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty3"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();

        //got to inventory by location tab
        await DVU.Menu.ItemInventory.GoTo();
        //search the inventory by the account
        await DVU.ItemInventory.Toolbar.Search.Click();
        await DVU.ItemInventory.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await DVU.ItemInventory.SearchDialog.Search.Click();
    
        // Verify that the Item with lot=BLK and Sublot=L exist in the location Loc3 with available qty=5
        await DVU.ItemInventory.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'Lot Code', rowValue: Putaway.Variable.lotWHT},
            { rowTitle: 'Sublot Code', rowValue: Putaway.Variable.sublotM}
        );
        await DVU.ItemInventory.Toolbar.View.Click();
        await t.expect(await DVU.ItemInventory.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'LPN', rowValue: ''},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
        )).eql('10', 'Location='+Putaway.Variable.Emtpy5 + '  and no LPN should have an available qty of 10');
        await DVU.ItemInventory.Detail.CloseDialog.Click();

        //Verify that the Item with lote=BLK and Sublot=S exist in the location EMpty6 with available qty= 10
        await DVU.ItemInventory.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await DVU.ItemInventory.Toolbar.View.Click();
        await t.expect(await DVU.ItemInventory.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnRCV00},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
        )).eql('10', 'Location='+Putaway.Variable.Emtpy6 + '  and LPN=PA-RCV-00 should have an available qty of 10');
        await DVU.ItemInventory.Detail.CloseDialog.Click();

        //Verify that the Item with lote=BLK and Sublot=L exist in the location Location3 with available qty= 5
        await DVU.ItemInventory.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await DVU.ItemInventory.Toolbar.View.Click();
        await t.expect(await DVU.ItemInventory.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnRCV01},
        )).eql('5', 'Location='+Putaway.Variable.Loc3 + '  should have an available qty of 5');
        await DVU.ItemInventory.Detail.CloseDialog.Click();
    })