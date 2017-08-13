import {gdaxAuthenticated} from './exchangeClients';
import config from './config';

export default function(amount,atPrice)
{    
    let size = Number(amount/atPrice).toFixed(4).toString();

    let transaction = {
        'type':'limit',
        'price': atPrice,
        'size': size,
        'product_id': config.product
    };

     gdaxAuthenticated.buy(transaction,function(err, response, data){
        console.log(`BUY ${size} of ${config.product} for ${amount} @ ${atPrice} @ ${new Date().toLocaleString()}`);
    });
}
