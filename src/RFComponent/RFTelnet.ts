import { NJTelnet } from "../utils/telnet";

export class RFScreen extends NJTelnet{

    constructor(){
        super();
    }


}


//Main
//Email
//Password
//DATABASE
//Warehouse
    //1 PREFERENCES
    //2 SHIPPING
    //3 RECEIVING
        //1 EXISTING RECEIPT
            //1 BY ORDER NUMBER
                //SELECT BY ORDER NUMBER
                    //1 CONTINUE
                        //SCAN STAGING LOCATION
                            //1 INSERT NEW LINE
                            //3 ITEM    X   OF  Y
                                //ENTER QTY
                                    //
                    //M MAIN MENU
            //2 BY PO NUMBER
            //3 BY EQUIPMENT
            //4 BY ACCOUNT
            //5 BY TRANSACTION #
            //M MAIN MENU

        //2 BLIND RECEIPT
        //3 PUTAWAY
        //M MAIN MENU
    //4 INVENTORY
    //5 WORK ORDERS
    //6 LOGOFF