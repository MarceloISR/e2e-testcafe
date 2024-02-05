import { Selector, t } from 'testcafe';
import { DVU, Dialogs, HomeHeader, Login, Menu, WEB }  from '../../src/DVU';
import { StringOptions, Init } from '../../src/utils';

fixture(`Smoke tests`)
    .meta({fixtureType: 'smoke'})

    .beforeEach(async t=>{
       await Init.Load({});
    })
    

/* 
    [SMOKE] verify login and }9/2g out
*/
test
    .meta({testType: 'smoke', UITest: 'true', testGoal: 'Login'}).skip
    ('Login and version', async t => {
        //Login in as Admin for trial
        await Login.Email.SetText(WEB.user);
        await Login.Next.Click();

        await Login.Password.SetText(WEB.password);
        await Login.Database.SelectByText(WEB.database);

       // await t.expect(await verifyAPIVersion()).ok(`Error Client version: Version number dont match`); //, ${getAPIVersion()}`)
        //await t.expect(await verifyClientVersion()).ok(`Error Client version: Version number dont match`); // ${getClientVersion()}`)
        
        await Login.Login.Click();
        
        //Verify the Dashboard has been displayed
        await t.expect(Selector('div[kendodraggable][data-sortable-index="0"]').exists).ok("Default dashboard page is not displayed");

        // if the Select warehouse dialog is displayed then close it
        if( await Dialogs.WareHouse.IsVisible() )
        {
            await Dialogs.WareHouse.selectWarehouse.SelectByText('<1> WHSE1');
            await Dialogs.WareHouse.OK.Click();
            await t.expect(await Dialogs.WareHouse.Exists()).notOk("WareHouse dialog is still displayed");
        }

        //logout
        await HomeHeader.Profile.SelectByText('Logout', StringOptions.contains);
        //Verify user was able to logout succesfully
        await t.expect(await Login.Displayed()).ok('user was not sucessfully logged out');
    });

/* 
    [SMOKE] verify Navigation and data loading
*/
test
    .meta({testType: 'smoke', UITest: 'true', testGoal: 'Navigation'}).skip
    ('Navigation 1', async t =>{
        //Log in as admin
        await Login.Email.SetText(WEB.user);
        await Login.Next.Click();

        await Login.Password.SetText(WEB.password);
        await Login.Database.SelectByText(WEB.database);
        await Login.Login.Click();
        
        // if the Select warehouse dialog is displayed then close it
        if( await Dialogs.WareHouse.IsVisible() )
        {
            await Dialogs.WareHouse.selectWarehouse.SelectByText("<1> WHSE1");
            await Dialogs.WareHouse.OK.Click();
            await t.expect(await Dialogs.WareHouse.Exists()).notOk("WareHouse dialog is still displayed");
        }

        //within the menu go to Consolidated Bill of Lading
        await Menu.ShippingOrders.GoTo();
        //Verify the table has data displayed
        //await t.expect(Selector('tr.k-grid-norecords').exists).notOk("There is no data retreived from the DB!");
    });
