

export class Toolbar {

    _container : Selector;

    constructor(selector: Selector) { 
        this._container = selector.find('kendo-grid-toolbar');
    }
    
}