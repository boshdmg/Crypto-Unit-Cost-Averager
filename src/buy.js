import {gdaxAuthenticated} from './exchangeClients'
import {gdaxPublic} from './exchangeClients'

export default (amount,product) =>
{    
    gdaxPublic(product).getProductTicker().then(data=>{
        
        let currentPrice =data.bid

        let size = Number(amount/currentPrice).toFixed(4).toString()

        let transaction = {
            'type':'limit',
            'price': currentPrice,
            'size': size,
            'product_id': product,
            'cancel_after' :'day'
        }

        gdaxAuthenticated.buy(transaction,()=>{
            console.log(`BUY ${size} of ${product} for ${amount} @ ${currentPrice} @ ${new Date().toLocaleString()}`)
        })
        //priceHistory.push(parseFloat(currentPrice)) 
        //store.put('price.history',priceHistory)

        //if(dropChecker(currentPrice,priceHistory))
        //{
           // buy(config.amount*1.5,currentPrice)
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+75);
            //     store.put('buy.history',buyHistory);
        //}
       // else
       // {
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+50);
            //     store.put('buy.history',buyHistory);
       // }

    })
}