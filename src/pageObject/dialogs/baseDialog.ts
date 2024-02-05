import { t, Selector } from 'testcafe';
import { Button } from '../../basicObjects';

export abstract class BaseDialog {

    public _container : Selector;
    
    public Save: Button;
    public CloseDialog: Button;

    constructor(selector: Selector){
        this._container = selector;
        this.CloseDialog = new Button(this._container.find('.k-dialog-close'));
        
        this.Save = new Button(this._container.find('div.save button:not(.mat-menu-trigger)'));
    }

    public async getTitle() {
        return await this._container.find(".k-dialog-title").find(".title").innerText;

    }
    public async Exists(): Promise<boolean> {
        await t.wait(1000);
        return await this._container.exists;
    }

    public async NotExists(): Promise<boolean> {
        await t.wait(1000);
        return await this._container.exists;
    }
    

    public async IsVisible(): Promise<boolean> {
        await t.wait(1000);
        return await this._container.visible;
    }
}