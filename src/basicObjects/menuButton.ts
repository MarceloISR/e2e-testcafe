import { Selector, t } from "testcafe"


export class MenuButton {
    
    private _container : Selector;

    constructor(selector: Selector) {
        this._container = selector;
    }

    public async Click(): Promise<void> { 
        await t.click(this._container);
    }

    public async Hover():Promise<void> {
        await t.hover(this._container);
    }
    public async SelectValue(value: string | number): Promise<void>{
        await this.Click();
        let menupopup: Selector;
        switch (typeof(value)) {

            case "string":
                //await t.click(this._container.find(`.k-popup.k-menu-popup li [ng-reflect-display-text="${value}"] button`));
                menupopup = Selector(`.k-popup.k-menu-popup li button`);
                await t.click(menupopup.withText(value));
                break;
            case "number":
                menupopup = Selector(`.k-popup.k-menu-popup li:nth-child(${value}) button`);
                await t.click(menupopup);
                break;
        }
    }
}