import { Button } from "../../basicObjects";
import { BaseDialog } from "../../pageObject/dialogs/baseDialog";



export class ConfirmDialog extends BaseDialog {

    public Cancel: Button;
    public Close: Button;
    public SaveAndClose: Button;

    constructor(selector: Selector){ 

        super(selector);

        this.Cancel = new Button(this._container.find('kendo-dialog-actions button').withExactText('Cancel'));
        this.Close = new Button(this._container.find('kendo-dialog-actions button').withExactText('Close'));
        this.SaveAndClose = new Button(this._container.find('kendo-dialog-actions button').withExactText('Save & Close'));
    }
}