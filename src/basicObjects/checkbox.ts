import { t } from "testcafe"
import { BaseObject } from "./baseObject";
import { Label } from "./label";

export class Checkbox extends BaseObject{

    public text : Label;

    constructor(selector: Selector){
        super(selector);
        this.text = new Label(this._container.find('label'));
    }

    public async check(checked: boolean): Promise<void>{
        await t.click(this._container.find('input'));
    }

    public async isChecked(): Promise<boolean> {
        return await this._container.find('input').getAttribute('ng-reflect-model') == '1';
    }
}