import { Selector } from 'testcafe';

export class BaseSelector{

    _container : Selector;
    
    constructor(selector: Selector) {
        this._container = selector;
    }
    
    public async IsVisible(): Promise<boolean>{
        return false;
    }

    public async IsEnable(): Promise<boolean> {
        return false;
    }

    
} 