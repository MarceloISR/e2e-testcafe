import { Selector, t } from "testcafe"
import { StringOptions, XPathSelector } from '../utils';
import { BaseObject } from "./baseObject";

export class DropdownButton extends BaseObject{

 
    constructor(selector: Selector) {
        super(selector);
    }

    public async SelectByIndex(index: number) : Promise<void>
    {
        await this.Click();
        let areaowns = await this._container.getAttribute('aria-owns');
        await t.click(Selector(`[id='${areaowns}']`).find(`li:nth-child(${index})`));
    }

    public async SelectByText(text: string, selectType: StringOptions = StringOptions.equal ) : Promise<void>
    {
        this.Click();
        let areaowns = await this._container.getAttribute('aria-owns');
        //await t.click(Selector(`#${areaowns}`).find('li').withText(text));
        let partialSelector ="";
        switch (selectType) {
            case StringOptions.equal:
                partialSelector = `//li[.//*[text()='${text}']]`;
                break;
            case StringOptions.contains:
                partialSelector = `//li[.//*[contains(text(),'${text}')]]`;
                break;
        }
        await t.click(XPathSelector(`//kendo-button-list[@id='${areaowns}'] ${partialSelector}`));
    }
   
    public async Click(): Promise<void> { 
        await t.click(this._container)
    }

} 