import { Scenario as Putaway } from "../../../scenarios/Putaway/PutawayScenario";
import { BackEnd, WHS, Login } from "../../../src/WHS";
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

test.meta( { testType: 'regression', group: 'putaway', area: 'Least Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item Code', async t =>{
         //from the account update the putawayt style to Item and Lot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion = BarcodeScanning_PutawayPrioritization.Least_Occupied;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_Code;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into WHS
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =    new NJTelnet(true); 
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
        await RFTelnet.Send("1"); //SUCCESS
        
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc1"); //SCAN LOC: PA-Loc1
        await RFTelnet.Send("1"); //SUCCESS
        
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();
        //*******************RF END*****************/

        await WHS.Menu.InventoryByLocation.GoTo();
        await WHS.InventoryByLocation.Toolbar.Search.Click();
        await WHS.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await WHS.InventoryByLocation.SearchDialog.Search.Click();

        // Verify there are 3 available qty in location 1 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
        )).eql('3', `the location ${Putaway.Variable.Loc1} should have an qty of 3 when the Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 15 available qty in location 1 with Lot=WHT and Sublot=M
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
        )).eql('15', `the location ${Putaway.Variable.Loc1} should have an qty of 15 when Lot=WHT and SubLot=M`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();


        // Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
        )).eql('17', `the location ${Putaway.Variable.Loc2} should have an qty of 17 when Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();


        // Verify there are 2 available qty in location 3 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('2', `the location ${Putaway.Variable.Loc3} should have an qty of 2 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Least Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item and Lot Codes', async t =>{
         //from the account update the putawayt style to Item and Lot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion = BarcodeScanning_PutawayPrioritization.Least_Occupied;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_and_LotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into WHS
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =    new NJTelnet(true); 
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
        await RFTelnet.Send("1"); //SUCCESS
        
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS
        
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc2 
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();
        //*******************RF END*****************/

        await WHS.Menu.InventoryByLocation.GoTo();
        await WHS.InventoryByLocation.Toolbar.Search.Click();
        await WHS.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await WHS.InventoryByLocation.SearchDialog.Search.Click();

        // Verify there are 15 available qty in location 1 with Lot=WHT and Sublot=M
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
        )).eql('15', `the location ${Putaway.Variable.Loc1} should have an qty of 15 when the Lot=WHT and SubLot=M`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
        )).eql('17', `the location ${Putaway.Variable.Loc2} should have an qty of 17 when Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();


        // Verify there are 2 available qty in location 2 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
        )).eql('2', `the location ${Putaway.Variable.Loc2} should have an qty of 2 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();


        // Verify there are 18 available qty in location 4 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('18', `the location ${Putaway.Variable.Loc4} should have an qty of 18 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Least Occupied', parallelizable: false } ) 
    ('By Piece/Case - Item, Lot and Sublot Codes', async t =>{
         //from the account update the putawayt style to Item and Lot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion = BarcodeScanning_PutawayPrioritization.Least_Occupied;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_lot_and_SublotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into WHS
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =    new NJTelnet(true); 
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
        await RFTelnet.Send("1"); //SUCCESS
        
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS
        
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc2 
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();
        //*******************RF END*****************/

        await WHS.Menu.InventoryByLocation.GoTo();
        await WHS.InventoryByLocation.Toolbar.Search.Click();
        await WHS.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await WHS.InventoryByLocation.SearchDialog.Search.Click();

        // Verify there are 15 available qty in location 1 with Lot=WHT and Sublot=M
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc1},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc01}
        )).eql('15', `the location ${Putaway.Variable.Loc1} should have an qty of 15 when the Lot=WHT and SubLot=M`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 17 available qty in location 2 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
        )).eql('17', `the location ${Putaway.Variable.Loc1} should have an qty of 17 when the Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
      
        // Verify there are 20 available qty in location 4 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('20', `the location ${Putaway.Variable.Loc1} should have an qty of 20 when the Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Least Occupied', parallelizable: false } ) 
    ('By Piece/Case - Lot Codes', async t =>{
         //from the account update the putawayt style LotCode
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion = BarcodeScanning_PutawayPrioritization.Least_Occupied;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.LotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into WHS
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =    new NJTelnet(true); 
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
        await RFTelnet.Send("PA-Empty5"); //SCAN LOC: PA-Empty5
        await RFTelnet.Send("1"); //SUCCESS
        
        //2nd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc2
        await RFTelnet.Send("1"); //SUCCESS
        
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc2"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS
        
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Loc2 
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();
        //*******************RF END*****************/

        await WHS.Menu.InventoryByLocation.GoTo();
        await WHS.InventoryByLocation.Toolbar.Search.Click();
        await WHS.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await WHS.InventoryByLocation.SearchDialog.Search.Click();

        // Verify there are 10 available qty in Empty5 with Lot=WHT and Sublot=M
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'LPN', rowValue: ''}
        )).eql('10', `the location ${Putaway.Variable.Emtpy5} should have an qty of 10 when the Lot=WHT and SubLot=M`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 10 available qty in Empt6 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnRCV00}
        )).eql('2', `the location ${Putaway.Variable.Emtpy6} should have an qty of 2 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 2 available qty in Empty6 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnRCV02}
        )).eql('10', `the location ${Putaway.Variable.Emtpy6} should have an qty of 10 when Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();


        // Verify there are 10 available qty in Locatio23 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc2},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc02}
        )).eql('3', `the location ${Putaway.Variable.Loc2} should have an qty of 3 when Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
    
    });

test.meta( { testType: 'regression', group: 'putaway', area: 'Least Occupied', parallelizable: false } ) 
    ('By Piece/Case - Sublot Codes', async t =>{
         //from the account update the putawayt style to Item and Lot Code
        let updatedAccount = Putaway.Scenario.businessPartners![0];
        if(updatedAccount?.Attributes?.Barcode_Scanning){
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Prioritizaion = BarcodeScanning_PutawayPrioritization.Least_Occupied;
            updatedAccount.Attributes.Barcode_Scanning.Putaway_Style=BarcodeScanning_PutawayStyle.Item_lot_and_SublotCode;
        }
        await BackEnd.LoadAccount(updatedAccount!);

        //Login into WHS
        await Login.LoginIn();

        //*******************RF BEGIN *****************/
        // This block will do the Direct putawayt through RF
        const RFTelnet =    new NJTelnet(true); 
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
        await RFTelnet.Send("PA-Empty5"); //SCAN LOC: PA-Empty5
        await RFTelnet.Send("1"); //SUCCESS
        
        //2nd Iteration
        await RFTelnet.Send("PA-RCV-00"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Empty6"); //SCAN LOC: PA-Empty6
        await RFTelnet.Send("1"); //SUCCESS
        
        //3rd Iteration
        await RFTelnet.Send("PA-RCV-01"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc4"); //SCAN LOC: PA-Loc4
        await RFTelnet.Send("1"); //SUCCESS
        
        //4th Iteration
        await RFTelnet.Send("PA-RCV-02"); //SCAN LPN
        await RFTelnet.Send("1"); //PRESS 1 TO CONTINUE
        await RFTelnet.Send("PA-Loc3"); //SCAN LOC: PA-Loc3 
        await RFTelnet.Send("1"); //SUCCESS
        //Close RF connection
        await RFTelnet.End();
        //*******************RF END*****************/

        await WHS.Menu.InventoryByLocation.GoTo();
        await WHS.InventoryByLocation.Toolbar.Search.Click();
        await WHS.InventoryByLocation.SearchDialog.Account.Find.Search(Putaway.Variable.account);
        await WHS.InventoryByLocation.SearchDialog.Search.Click();

        // Verify there are 5 available qty in empty5 with Lot=WHT and Sublot=M
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'Lot Code', rowValue: 'WHT'},
            { rowTitle: 'Sublot Code', rowValue: 'M'}
        )
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy5},
            { rowTitle: 'LPN', rowValue: ''}
        )).eql('10', `the location ${Putaway.Variable.Emtpy5} should have an qty of 10 when the Lot=WHT and SubLot=M`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 10 available qty in empty6 with Lot=BLK and Sublot=S
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'S'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Emtpy6},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnRCV00}
        )).eql('10', `the location ${Putaway.Variable.Emtpy6} should have an qty of 10 when Lot=BLK and SubLot=S`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 3 available qty in location 3 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc3},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc03}
        )).eql('3', `the location ${Putaway.Variable.Loc3} should have an qty of 3 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();

        // Verify there are 2 available qty in location 4 with Lot=BLK and Sublot=L
        await WHS.InventoryByLocation.Table.clickRowByQuery(
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'Lot Code', rowValue: 'BLK'},
            { rowTitle: 'Sublot Code', rowValue: 'L'}
        );
        await WHS.InventoryByLocation.Toolbar.View.Click();
        await t.expect(await WHS.InventoryByLocation.Detail.Table.getCellValue(
            { targed: 'Available'},
            { rowTitle: 'Location', rowValue: Putaway.Variable.Loc4},
            { rowTitle: 'LPN', rowValue: Putaway.Variable.lpnLoc04}
        )).eql('17', `the location ${Putaway.Variable.Loc4} should have an qty of 17 when Lot=BLK and SubLot=L`);
        await WHS.InventoryByLocation.Detail.CloseDialog.Click();
    });
