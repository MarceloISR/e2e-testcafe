import { Selector, t } from 'testcafe';
import { Button } from './basicObjects/button';
import { Dropdown } from './basicObjects/dropdown';
import { TextBox } from './basicObjects/textbox';
import { Dialogs, WEB } from './DVU';
export class login{

    Email : TextBox; 
    Next : Button;
    Database : Dropdown;
    Back: Button;
    Login : Button;
    Password: TextBox;

    constructor() {
        this.Email = new TextBox(Selector('[data-testid="login.email"]'));
        this.Next = new Button(Selector('[data-testid="login.next"]'));

        this.Database = new Dropdown(Selector('kendo-dropdownlist'));
        this.Back = new Button(Selector('.loginButtons button:nth-child(1)'))
        this.Login = new Button(Selector('.loginButtons button:nth-child(2)'));
        this.Password = new TextBox(Selector('[data-testid="login.password"]'));
    } 

    public async Displayed() : Promise<boolean> {
        return await Selector('.login').exists;
    }
   /**
    * Loggin in with the default data
    */
    public async LoginIn() : Promise<void>{

        await this.Email.SetText(WEB.user);
        await this.Next.Click();

        await this.Password.SetText(WEB.password);
        await this.Database.SelectByText(WEB.database);
        await this.Login.Click()
        
        // if the Select warehouse dialog is displayed then close it
        if( await Dialogs.WareHouse.IsVisible() )
        {
            await Dialogs.WareHouse.selectWarehouse.SelectByText(WEB.warehouse);
            await Dialogs.WareHouse.OK.Click();
            await t.expect(await Dialogs.WareHouse.Exists()).notOk("WareHouse dialog is still displayed");
        }
    }
}