import { t, Selector } from 'testcafe';
import { BaseObject } from './baseObject';


export class DatePicker extends BaseObject{

    constructor(selector: Selector) {
       super(selector);
    }

}