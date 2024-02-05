import { t, Selector } from 'testcafe';
import { BaseObject } from './baseObject';
import { Button } from './button';
import { Combobox } from './combobox';

export class ComboboxSearch extends Combobox{

    
    public Search : Button;

    constructor(selector: Selector) {
        super(selector);

        this.Search = new Button(this._container.find('span.fa-search').parent('button'));
    
    }

  
}