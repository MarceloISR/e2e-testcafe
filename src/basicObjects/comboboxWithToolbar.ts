import { t } from "testcafe";
import { XPathSelector } from '../utils';
import { BaseObject } from "./baseObject";
import { Button } from "./button";
import { ComboboxWriteAndSearch } from "./comboboxWriteAndSearch";
import { Dropdown } from "./dropdown";

export class ComboboxWithToolbar extends BaseObject{

    /**
     * ListBox : input field
     */
    public Find: ComboboxWriteAndSearch;
    /**
     * Button: Insert
     */
    public Insert: Button;
    /**
     * Button: Edit
     */
    public Edit: Button;
    /**
     * Button Search
     */
    public Search: Button;

    constructor(selector: Selector){
        super(selector);
        this.Find= new ComboboxWriteAndSearch(this._container.find('partner-combobox'));
        this.Insert = new Button(this._container.find('.insertIcon'));
        this.Edit = new Button(this._container.find('.editIcon'));
        this.Search = new Button(this._container.find('button span.fa-search'));
    }



    public async SearchAndSelect(text: string): Promise<void> {
        await this.Find.Search(text);
    }
  

}