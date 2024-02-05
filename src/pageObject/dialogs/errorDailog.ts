import {t, Selector} from 'testcafe';
import { XPathSelector } from '../../utils';
import { Button } from '../../basicObjects';
import { BaseDialog } from './baseDialog';



export class errorDialog extends BaseDialog {

    public OK: Button;
    constructor() {
        super(Selector('div[role="dialog"]').find('.title').withText('Error')) 
        //this.OK= new Button(XPathSelector("//kendo-dialog-actions //button[text()= 'OK']"));
        this.OK = new Button(Selector('kendo-dialog-actions button').withText('OK'));
    }
}