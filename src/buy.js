import gdaxAuthenticated from './exchangeClients';
import config from './config';

export default function buy(amount,atPrice)
{
    let transaction = {
        'type':'limit',
        'price': atPrice,
        'size': Number(amount/atPrice).toFixed(4).toString(),
        'product_id': config.product
    };

     gdaxAuthenticated.buy(transaction)
    //console.log(authedClient.B);
  // authedClient.buy(1);

   //Gdax.B();

    // authedClient.buy(transaction, function(err, response, data){
    //     console.log('BUYY'+err);
    //     console.log('BUYY'+JSON.stringify(response));
    //     console.log('BUYY'+JSON.stringify(data));
    // });
}

   