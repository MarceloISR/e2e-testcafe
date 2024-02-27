import { ItemInventory, ItemSKUs, Login, Menu } from "../../src/WHS";
import { Init } from "../../src/utils";

fixture(`API tests`) .meta({fixtureType: 'API'})
    .beforeEach(async t=>{

    await Init.Load({ 
            CredentialGroup: 'TRIAL',
            Scenario: {
                warehouse: { description: 'Barcode Scanning' },
                inventoryAdjustment: {
                    warehouse: {description: 'Barcode Scanning'}, 
                    itemAdjustment: [
                        {
                            itemCode: 'T-Shirt',
                            emptyInventory: true,
                        }
                    ]
                }
            }
        });
    })

test
.meta({testType: 'UI', area: 'Desktop Inventory'}) ('Item/SKUs Inventory Adjust', async t =>{

    /** VARIABLES  */
    const account = 'Automatic Allocation';
    const item = 'T-Shirt';
    const location = "Generic1";
    const LPN = 'InvAdj-LPN1';
    const Lcode = 'BLK';
    const SLcode = 'L';

    await Login.LoginIn();

    const AdjustItem = (async (itemCount: Number, increase: boolean) => {
        // Go to Item/SKUs
        await Menu.Items_SKUs.GoTo();
        // Search and select the Item
        await ItemSKUs.Toolbar.Search.Click();
        await ItemSKUs.itemSKU_Search.Account.SelectByText(account);
        //await ItemSKUs.itemSKU_Search.ItemCode.SetText('T-Shirt');
        await ItemSKUs.itemSKU_Search.Search.Click();
      
        await ItemSKUs.Table.clickRowByQuery({rowTitle:'Item Code', rowValue: item});
        ////Click in the Inventory Adjust icon
        await ItemSKUs.Toolbar.InventoryAdjust.Click();

        //Fill the Inventory Ajdust form
        await ItemSKUs.InventoryAdjust.Location.Search(location);
        await ItemSKUs.InventoryAdjust.LPN.SetText(LPN);
        await ItemSKUs.InventoryAdjust.LotCode.SetText(Lcode);
        await ItemSKUs.InventoryAdjust.SubLotCode.SetText(SLcode);
        if(increase)
            await ItemSKUs.InventoryAdjust.AdjustedQuantity.Increase(itemCount);
        else
            await ItemSKUs.InventoryAdjust.AdjustedQuantity.Decrease(itemCount);
       
        await ItemSKUs.InventoryAdjust.Save.Click();

        //Click Save button
        await ItemSKUs.InventoryAdjust.CloseDialog.Click();
        
        //Go to Item Inventory tab
        await Menu.ItemInventory.GoTo();
        
        //Search and select the item
        await ItemInventory.Toolbar.Search.Click();
        await ItemInventory.SearchDialog.Account.Find.Search(account);
        await ItemInventory.SearchDialog.ItemCode.SetText(item);
        await ItemInventory.SearchDialog.Search.Click();
        
        await ItemInventory.Table.clickRowByQuery({rowTitle: 'Item Code', rowValue : item});
        //Click on the View icon
        await ItemInventory.Toolbar.View.Click();

        await t.expect(await ItemInventory.Detail.Table.existRowByQuery(
            { rowTitle: 'Location', rowValue: location},
            { rowTitle: 'LPN', rowValue: LPN },
            { rowTitle: 'Available', rowValue: itemCount.toString() },
            { rowTitle: 'Lot Code', rowValue: Lcode },
            { rowTitle: 'Sublot Code', rowValue: SLcode } 
        )).ok();
        await ItemInventory.Detail.CloseDialog.Click();
    })
    
    //Adjust Item up
    await AdjustItem(10, true);

    //Adjust Item down
    await AdjustItem(5, false);
});
