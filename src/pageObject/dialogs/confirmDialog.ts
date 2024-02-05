import { Button } from "../../basicObjects";
import { BaseDialog } from "./baseDialog";


export class ConfirmDialog extends BaseDialog{

    public Cancel: Button;
    public Close: Button;
    public SaveAndClose: Button;
    
    constructor(selector: Selector){
        super(selector);
        this.Cancel = new Button(this._container.find('.k-actions button').withText('Cancel'));
        this.Close = new Button(this._container.find('.k-actions button').withText('Close'));
        this.SaveAndClose = new Button(this._container.find('.k-actions button').withText('Save & Close'));

    }

}