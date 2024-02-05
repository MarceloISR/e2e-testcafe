import { t, Selector } from 'testcafe';
import { BaseObject } from './baseObject';
import { Button } from './button';

export class ComboboxWriteAndSearch extends BaseObject{

   
    public Expand: Button;
    public Clear: Button;

    constructor(selector: Selector) {
        super(selector);
        this.Expand = new Button(this._container.find('button'));
        this.Clear = new Button(this._container.find('span[title=clear]'));
    }


    public async Search(searchText: string, selectText: string = ''): Promise<void>{
        const clear = this._container.find('.k-clear-value');
        if(await clear.exists ){
            await t.click(clear);
        }

        await t.typeText(this._container.find( 'kendo-searchbar input'), searchText);
        await t.click(Selector('.k-popup .k-list-ul li span').withText(selectText.length>0? selectText: searchText));
    }

    public async Click(): Promise<void> { 
        await this.Expand.Click();
    }
}