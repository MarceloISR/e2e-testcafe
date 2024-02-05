import { Selector, t } from "testcafe"
import { Button, Combobox } from "../../basicObjects";
import { DropdownButton } from "../../basicObjects/dropdownButton";


export class homeHeader{

  
    public Profile: DropdownButton;

    constructor()
    {
        this.Profile = new DropdownButton(Selector('kendo-dropdownbutton[data-testid="toolbar.profile"] button'));
    }

    public async changeProfile(value: string|number){
        let profileButton = Selector('[data-testid="toolbar.account"]');
        await t.click(profileButton);
        new Combobox(profileButton.nextSibling().find('.k-popup .k-combobox'));
    }

    public async changeWarehouse(value : string|number){
        let warehouseButton = Selector('[data-testid="toolbar.warehouse"]');
        await t.click(warehouseButton);
        new Combobox(warehouseButton.nextSibling().find('.k-popup .k-combobox'));

    }

    
}