import { Selector } from "testcafe";
import { Button } from "../../basicObjects";
import { XPathSelector } from "../../utils";
import { BaseDialog } from "./baseDialog";

export class OverReceivedDialog extends BaseDialog{
    public Yes: Button;
    public No: Button;
    constructor() {
        super(Selector('.dialogHeader .title').withExactText('Over Receive').parent('.autoDialogBox'));  
        this.Yes= new Button(this._container.find('.confirmDialogButtons button').withText('Yes'));
        this.No= new Button(this._container.find('.confirmDialogButtons button').withText('No'));
    }
}