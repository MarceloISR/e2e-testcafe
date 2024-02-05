import { Selector, t } from 'testcafe';
import { XPathSelector } from '../../utils';


export class MenuItem {
    private _container: Selector;

    private Parent: MenuItem | null = null;

    constructor(menuTitle: string, parent: MenuItem | null = null) {
        this._container = Selector('button').withText(menuTitle);//this._container = XPathSelector(`//button[text() = '${menuTitle}']`);
        if(parent!= null)
            this.Parent = parent;
    }
    
    /**
     * Go to the selected tab
     */
    public async GoTo(): Promise<void>{
        if(this.Parent == null){
            await t.click(Selector('[data-testid="toolbar.menu"]')); //click on the toolbar menu icon
        }else{
            await this.Parent.GoTo();
        }
        await t.click(this._container);
    
    }

    /**
     * Click on the menu option
     */
    public async click(): Promise<void> {
        if( await this._container.hasAttribute('aria-expanded') )
            await t.click(this._container);
        else
            await t.click(this._container);
    }

    /**
     * Get the text from a specific menu option
     * @returns menu text
     */
    public async getText(): Promise<string> {
        return await this._container.find("i").innerText;
    }
}