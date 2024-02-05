import {t, Selector} from 'testcafe';
import { XPathSelector } from '../../utils';
import { Button } from '../../basicObjects/button';
import { Combobox } from '../../basicObjects/combobox';
import { BaseDialog } from './baseDialog';


export class warehouse extends BaseDialog {

    public selectWarehouse: Combobox;
    public OK: Button;

    constructor() {
        super(Selector('[data-testid="warehouse-dlg"]'));
        this.selectWarehouse = new Combobox(this._container.find('[data-testid="warehouse-select"]'));
        //this.OK= new Button(XPathSelector("//kendo-dialog-actions //button[text()= 'OK']"));
        this.OK = new Button(Selector('kendo-dialog-actions').find('button').withText('OK'));
    }

  

}