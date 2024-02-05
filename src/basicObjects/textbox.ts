import { t } from "testcafe";
import { BaseObject } from "./baseObject";


export class TextBox extends BaseObject{
    
   constructor(selector: Selector) {
       super(selector);
   }
    
   public async SetText(text: string): Promise<void>{
      await t.typeText(this._container, text, {replace: true})
   }
}