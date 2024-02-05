import { t, Selector } from 'testcafe';

export class Tab {

    baseSelector : Selector;
    _container : Selector;

    constructor(selector : Selector) {
        this.baseSelector = selector;
    }

    public async SearchTab(value : string | number): Promise<Tab> {
        switch(typeof value)
        {
            case String.toString():
                this._container = this.baseSelector.find(`//li[.//span[text() = '${value}']] `);
                break;
            case Number.toString():
                this._container = this.baseSelector.find(`k-tabstrip-tab-${Number(value)-1}`);
                break;
        }
        return this;
    }

    public async Click(): Promise<void> {
        await t.click(this._container);
    }
    
    public async Close(): Promise<void> {
        await t.click(this._container.find('.ng-star-inserted'));
    } 

    
}
