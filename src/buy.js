import {gdaxAuthenticated} from './exchangeClients';
import {gdaxPublic} from './exchangeClients';
import config from './config';

export default function()
{    
    gdaxPublic.getProductTicker()
    .then(data=>{
        
        let currentPrice =data.ask

        let size = Number(config.amount/currentPrice).toFixed(4).toString();

        let transaction = {
            'type':'limit',
            'price': currentPrice,
            'size': size,
            'product_id': config.product
        };

        gdaxAuthenticated.buy(transaction,function(err, response, data){
            console.log(`BUY ${size} of ${config.product} for ${config.amount} @ ${currentPrice} @ ${new Date().toLocaleString()}`);
        });
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