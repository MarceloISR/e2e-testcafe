import { t, Selector } from 'testcafe';
import { XPathSelector } from '../../utils';
import { BaseSelector } from '../../basicObjects/baseSelector';

export interface TableQuery {
    rowTitle : string,
    rowValue: string,
}
export class Table  {
    _container : Selector;
    _containerString: string;
    private Headers: string[];
    
    constructor( selector: Selector, xpathString: string=''){
        this._container=selector;
        this._containerString=xpathString;
    }

    public async getRowCounts(): Promise<number>{
        let counter = await this._container.find('tbody tr:not(.k-grid-norecords)').count;

        return counter;
    }
    public async clickRowByQuery(...tableQuery : TableQuery[]){
        var query = "";
        for await (const e of tableQuery) {
            var ariacolindex = await this._container.find('.k-column-title').withExactText(e.rowTitle).parent('[role="columnheader"]').getAttribute('aria-colindex');
            //var ariacolindex = await XPathSelector(`//*[@role='columnheader'][.//span[text()='${e.rowTitle}']]`).getAttribute('aria-colindex');
            query += `.//td[@aria-colindex='${ariacolindex}'][text()='${e.rowValue}'] and `;
        }

        if(query.length>0){
            query = query.substring(0, query.length-4);
            query = "//div[contains(@class, 'k-state-active')] //tr[ " + query + "]";
            try {
                await t.click(XPathSelector(query));
            } catch (error) {
                throw new Error('the selector \n'+ query + '\n was not able to fin any element in the DOM tree')
            }
        }
    }
    
    public async clickRow(index: number): Promise<void>{
        await t.click(this._container.find(`tbody tr[kendogridlogicalrow]:nth-child(${index})`));
    }

    public async getValue(column: number, row: number): Promise<string> {
        let findSelector = "";
        
        switch(typeof column)
        {
            case Number.toString() :
                findSelector = `tbody tr[kendogridlogicalrow]:nth-child(${row}) td:nth-child(${column})`;
                break;
        }
        
        return await this._container.find(findSelector).innerText;
    }

    public async existRowByQuery(...tableQuery : TableQuery[]): Promise<boolean>{
        await t.wait(100);
        var query = "";
        let exist = false;
        for await (const e of tableQuery) {
            var ariacolindex = await this._container.find('.k-column-title').withExactText(e.rowTitle).parent('[role="columnheader"]').getAttribute('aria-colindex');
            //var ariacolindex = await XPathSelector(`//*[@role='columnheader'][.//span[text()='${e.rowTitle}']]`).getAttribute('aria-colindex');
            query += `.//td[@aria-colindex='${ariacolindex}'][text()='${e.rowValue}'] and `;
        }

        if(query.length>0){
            query = query.substring(0, query.length-4);
            query = " //tr[ " + query + "]";

            const parentQuery=this._containerString.length>0? this._containerString : "//div[contains(@class, 'k-state-active')] ";
            try {
                exist = await t.click(XPathSelector(parentQuery + ' ' + query));
            } catch (error) {
                throw new Error('the selector \n'+ query + '\n was not able to fin any element in the DOM tree')
            }
        }
        // if(query.length>0){
        //     query = query.substring(0, query.length-4);
        //     query = "//div[contains(@class, 'k-state-active')] //tr[ " + query + "]";
        //     //console.log(query);
        //     exist = await XPathSelector(query).exists;
        // }
        
        return exist;
    }

    // public async existsMultipleRowsByQuery( ...tableQuery: TableQuery[][] ): Promise<boolean[]> {
    //     let exist = [];
    //     for(let row = 0; row <  tableQuery.length; row ++){

    //         let rowResult = await this.existRowByQuery(...tableQuery[row]);
    //         if(rowResult!){
    //             exist.push(true);
    //             //throw new Error(`Row #${row + 1} do not exist`);
    //         }
    //     }
    //     return exist;
    // }
    public async existsMultipleRowsByQuery(...tableQuery: TableQuery[][]):Promise<boolean> {
        let exist : boolean[] = [];
        for(let row = 0; row < tableQuery.length; row++) {
            let rowResult = await this.existRowByQuery(...tableQuery[row]);
            exist.push(rowResult);
        }
        return exist.every( ele => ele === true);
    }

    public async getCellValue(column: {targed: string}, ...tableQuery: TableQuery[]): Promise<string> {
        var query = "";
        let cellValue = '';
        
        for await (const e of tableQuery) {
            var ariacolindex = await this._container.find('.k-column-title').withExactText(e.rowTitle).parent('[role="columnheader"]').getAttribute('aria-colindex');
            //var ariacolindex = await XPathSelector(`//*[@role='columnheader'][.//span[text()='${e.rowTitle}']]`).getAttribute('aria-colindex');
            query += `.//td[@aria-colindex='${ariacolindex}'][text()='${e.rowValue}'] and `;
        }
        
        var targedAriacolindex = await this._container.find('.k-column-title').withExactText(column.targed).parent('[role="columnheader"]').getAttribute('aria-colindex');
        if(query.length>0){
            query = query.substring(0, query.length-4);
            const parentQuery=this._containerString.length>0? this._containerString : "//div[contains(@class, 'k-state-active')] ";
            query = `${parentQuery} //tr[ ${query}] //td[ @aria-colindex='${targedAriacolindex}'   ]`;
            cellValue= await XPathSelector(query).innerText;
            //await t.click(XPathSelector(query));
        }
        return cellValue;
    }

}