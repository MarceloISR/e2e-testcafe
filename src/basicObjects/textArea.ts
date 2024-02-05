import { t, Selector } from 'testcafe';
import { BaseObject } from './baseObject';

export class TextArea extends BaseObject{


    constructor(selector: Selector) {
        super(selector);
    }

}