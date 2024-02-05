import { t } from "testcafe";

export abstract class BaseObject {

    _container : Selector;
    
    constructor(selector: Selector) {
        this._container = selector;
    }
    

    public async Click(): Promise<void> { 
        await t.click(this._container)
    }

    public async IsVisible(): Promise<boolean> {
        return await this._container.visible;
    }

    public async IsEnable(): Promise<boolean> {
        return false;
    }

 
}