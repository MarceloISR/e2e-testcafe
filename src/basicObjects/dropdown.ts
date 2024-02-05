import { t } from "testcafe";
import { XPathSelector } from '../utils';
import { BaseObject } from "./baseObject";

export class Dropdown extends BaseObject{

    constructor(selector: Selector){
        super(selector);
    }

    public async SelectByText(text: string): Promise<void>{
        await t.click(this._container);
        await t.click(XPathSelector(`//kendo-list //*[text()="${text}"]`))
    }

    public async SelectByIndex(index: number): Promise<void>{
        await this.Click();
        await t.click(`kendo-list li:nth-child(${index})`);
    }

    public async Click(): Promise<void> { 
        await t.click(this._container);
    }
}