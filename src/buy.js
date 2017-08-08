import Gdax from 'gdax';
import config from './config';

export default function buy(amount,atPrice)
{
    console.log(Gdax);

    let authedClient = new Gdax.AuthenticatedClient(config.key, config.secret, config.password, config.url);
    let buyETHHigher = {
        'type':'limit',
        'price': atPrice,
        'size': Number(amount/atPrice).toFixed(4).toString(),
        'product_id': config.product
    };

                // authedClient.buy(buyETHHigher, function(err, response, data){
        //     console.log('BUYY'+err);
        //     console.log('BUYY'+JSON.stringify(response));
        //     console.log('BUYY'+JSON.stringify(data));
        // });


}

   