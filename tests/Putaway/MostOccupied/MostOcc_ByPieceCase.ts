import { Scenario as Putaway } from "../../../scenarios/Putaway/PutawayScenario";
import { BackEnd, DVU, Login } from "../../../src/DVU";
import { BarcodeScanning_PutawayPrioritization, BarcodeScanning_PutawayStyle } from "../../../src/apiFolder/businessPartners";
import { Init } from "../../../src/utils";
import { NJTelnet } from "../../../src/utils/telnet";

fixture(`Fixture tests`) .meta({fixtureType: 'fixture Type'})
.beforeEach(async t=>{
    await Init.Load({ 
        CredentialGroup: 'TRIAL',
        Scenario: Putaway.Scenario
        });
    })


test.meta( { testType: 'regression', group: 'putaway', area: 'Most Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item Code', async t =>{
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_Code;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion=BarcodeScanning_PutawayPrioritization.Most_Occupied
        }
        await BackEnd.LoadAccount(updatedAccount!);
        await Login.LoginIn();

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
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc
        await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        await RFTelnet.Send("PA-Loc4"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
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
        await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc2
        await RFTelnet.Send("1"); //SUCCESS
        
        await RFTelnet.End();

        await DVU.Menu.InventoryByLocation.GoTo();
        await DVU.InventoryByLocation.Toolbar.Search.Click();
        await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await DVU.InventoryByLocation.SearchDialog.Search.Click();
    
        // 1.Verify there are 2 available qty in location 1 with Lot=BLK and Sublot=L
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
        )).eql('2', `the location ${Putaway.Variable.Loc1} should have an qty of 2 when Lot=BLK and SubLot=L`);
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

        // 2.Verify there are 3 available qty in location 2 with Lot=BLK and Sublot=L
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

        // 4.Verify there are 5 available qty in location 3 with Lot=WHT and Sublot=M
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('5', `the location ${Putaway.Variable.Loc3} should have an qty of 5 when Lot=WHT and SubLot=M`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

        // 4.Verify there are 5 available qty in location 4 with Lot=WHT and Sublot=M
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('5', `the location ${Putaway.Variable.Loc4} should have an qty of 5 when Lot=WHT and SubLot=M`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Most Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item and Lot Code', async t =>{
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_and_LotCode;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion=BarcodeScanning_PutawayPrioritization.Most_Occupied
        }
        await BackEnd.LoadAccount(updatedAccount!);
        await Login.LoginIn();

        const RFTelnet =  new NJTelnet(true); 
        await RFTelnet.Connect(); //Init telnet conection
    
        let screens = await RFTelnet.Login();   //Login to RF
        
        screens = await RFTelnet.Send("3"); //RECEIVING
        screens = await RFTelnet.Send("3"); //PUTAWAY
        screens = await RFTelnet.Send("3"); //BY PIECE/CASE
        screens = await RFTelnet.Send("1"); //SCAN LPN
        //1st Iteration
        screens = await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        screens = await RFTelnet.Send("WHT"); //SCAN LOT CODE
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        screens = await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
        screens = await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        screens = await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE

        //3rd Iteration
        screens = await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        screens = await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        screens = await RFTelnet.Send("1"); //SUCCESS
        //4th Iteration
        screens = await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE 

        //5th Iteration
        screens = await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        screens = await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE

        //6th Iteration
        screens = await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        screens = await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        screens = await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
        screens = await RFTelnet.Send("1"); //SUCCESS
        await RFTelnet.End()
        await DVU.Menu.InventoryByLocation.GoTo();
        await DVU.InventoryByLocation.Toolbar.Search.Click();
        await DVU.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await DVU.InventoryByLocation.SearchDialog.Search.Click();
    
    
        // 1.Verify there are 10 available qty in location 1 with Lot=WTH and Sublot=M
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
    
        // 2.Verify there are 7 available qty in location 2 with Lot=BLK and Sublot=S
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
        )).eql('7', `the location ${Putaway.Variable.Loc2} should have an qty of 10 when Lot=BLK and SubLot=S`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

         // 3.Verify there are 5 available qty in location 2 with Lot=BLK and Sublot=L
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
        )).eql('5', `the location ${Putaway.Variable.Loc2} should have an qty of 10 when Lot=BLK and SubLot=L`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

         // 4.Verify there are 5 available qty in location 3 with Lot=WHT and Sublot=M
         await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('5', `the location ${Putaway.Variable.Loc3} should have an qty of 10 when Lot=WHT and SubLot=M`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

         // 5.Verify there are 5 available qty in location 4 with Lot=BLK and Sublot=S
         await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('5', `the location ${Putaway.Variable.Loc4} should have an qty of 10 when Lot=BLK and SubLot=S`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Most Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item Lot and Sublot Code', async t =>{
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_lot_and_SublotCode;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion=BarcodeScanning_PutawayPrioritization.Most_Occupied
        }
        await BackEnd.LoadAccount(updatedAccount!);
        await Login.LoginIn();

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
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
        await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
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

         // 4.Verify there are 5 available qty in location 4 with Lot=BLK and Sublot=L
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
        )).eql('20', `the location ${Putaway.Variable.Loc4} should have an qty of 20 when Lot=WHT and SubLot=M`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Most Occupied', parallelizable: false } ) 
    ('By Piece/Case - Lot Code', async t =>{
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.LotCode;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion=BarcodeScanning_PutawayPrioritization.Most_Occupied
        }
        await BackEnd.LoadAccount(updatedAccount!);
        await Login.LoginIn();

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
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
        await RFTelnet.Send("1"); //SUCCESS
        //2nd Iteration
        await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS

        //3rd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        //4th Iteration
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA:Loc2
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE

        //5th Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS

        //6th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc1
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
        )).eql('12', `the location ${Putaway.Variable.Loc2} should have an qty of 12 when Lot=BLK and SubLot=S`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

        // 3.Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=L
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

        // 4.Verify there are 5 available qty in location 4 with Lot=WHT and Sublot=M
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('5', `the location ${Putaway.Variable.Loc3} should have an qty of 5 when Lot=WHT and SubLot=M`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

        // 5.Verify there are 5 available qty in location 4 with Lot=BLK and Sublot=S
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('5', `the location ${Putaway.Variable.Loc4} should have an qty of 5 when Lot=BLK and SubLot=S`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click();

      
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Most Occupied', parallelizable: false } ) 
    ('By Piece/Case - SubLot Code', async t =>{
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.SubLotCode;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion=BarcodeScanning_PutawayPrioritization.Most_Occupied
        }
        await BackEnd.LoadAccount(updatedAccount!);
        await Login.LoginIn();

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
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
       
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
        await RFTelnet.Send("1"); //SUCCESS
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
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

        // 3.Verify there are 5 available qty in location 3 with Lot=BLK and Sublot=L
        await DVU.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await DVU.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await DVU.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('5', `the location ${Putaway.Variable.Loc2} should have an qty of 5 when Lot=BLK and SubLot=L`);
        await DVU.InventoryByLocation.Detail.CloseDialog.Click(); 
    });