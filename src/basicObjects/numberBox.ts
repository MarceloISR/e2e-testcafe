import { ClientFunction, Selector, t } from "testcafe";
import { BaseObject } from "./baseObject";


export enum NumberBoxType{
    INCREASE,
    DECREASE
}

export class NumberBox extends BaseObject {

    private selectorFnChain : any;
    constructor(selector: Selector){
        super(selector);
        
    }

    public async Decrease(number: Number): Promise<void> {
        // click in the field in order to Update the actual value
        await t.click(this._container.find('.k-spinner-increase'));
        await t.click(this._container.find('input'));
        await t.click(this._container);
        
        //Decrease the inventory
        while(Number(await this._container.find('input').getAttribute('aria-valuenow')) > Number(number) ){
            await t.click(this._container.find('.k-spinner-decrease'));
        }
    }

    public async Increase(number: Number): Promise<void> {
        // click in the field in order to Update the actual value
        await t.click(this._container.find('.k-spinner-decrease'));
        //await t.click(this._container.find('input'));
        await t.click(this._container);
        
        //Increase the inventory
        while(Number(await this._container.find('input').getAttribute('aria-valuenow')) < Number(number) ){
            await t.click(this._container.find('.k-spinner-increase'));
        }
    }
    public async SetNumber(number: Number): Promise<void>{
      
        //this.selectorFnChain = this._container[Object.getOwnPropertySymbols(this._container)[0]].options.apiFnChain;
        //console.log(this.selectorFnChain);
        // if(type == NumberBoxType.INCREASE)
        // {
        //     while(Number(await this._container.find('input').getAttribute('aria-valuenow')) < Number(number) ){
        //         await t.click(this._container.find('.k-spinner-increase'));
        //     }
        // }

        // if(type == NumberBoxType.DECREASE) 
        // {
        //     //these lines should be refactored
        //     await t.click(this._container.find('input'));
        //     await t.click(this._container);
            
        //     while(Number(await this._container.find('input').getAttribute('aria-valuenow')) > Number(number) ){
        //         await t.click(this._container.find('.k-spinner-decrease'));
        //     }
        // }

        

        //
        // const updateNumber = ClientFunction( (selector,number) => {
        //     var element = document.querySelector(selector);
            
        //     element.setAttribute('aria-valuenow', Number(number));
        // });	

    }

   
}