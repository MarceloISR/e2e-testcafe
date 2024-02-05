import { t, Selector } from 'testcafe';
import { BaseObject } from './baseObject';


export class Label  extends BaseObject{


    constructor(selector: Selector) {
        super(selector);
    }

    public async Text(): Promise<string> {
        return this._container.innerText;
    }

    public async Exists(): Promise<boolean> {
        return this._container.exists;
    }
}