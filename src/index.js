import rc from 'rc'
import Storage from 'node-storage';
import Gdax from 'gdax';
import dropChecker from './dropChecker';

let store = new Storage('store.json');
let publicClient = new Gdax.PublicClient('ETH-EUR');

let config = rc('gdax',{
	passphrase: '',
	key: '',
	secret: '',
	url: 'https://api.gdax.com',
});


store.put('price.history',[])
store.put('buy.history',[])

let buyETH = {
        'price': '50',
        'type': 'market',
        'product_id': 'ETH-EUR',
};


let authedClient = new Gdax.AuthenticatedClient(config.key, config.secret, config.password, config.url);



setInterval(function(){
    publicClient.getProductTicker(function(err, response, data){
        let priceHistory = store.get('price.history');
        let currentPrice =data.bid;
     
        priceHistory.push(parseFloat(currentPrice)); 
        store.put('price.history',priceHistory);

        // var buyETHHigher = {
        //     'price': currentPrice,
        //     'size': (2/currentPrice).toString(),
        //     'product_id': 'ETH-EUR',
        // };

        let buyETHHigher = {
            'type':'limit',
            'price': currentPrice,
            'size': Number(5/currentPrice).toFixed(4).toString(),
            'product_id': 'ETH-EUR',
        };

        // authedClient.buy(buyETHHigher, function(err, response, data){
        //     console.log('BUYY'+err);
        //     console.log('BUYY'+JSON.stringify(response));
        //     console.log('BUYY'+JSON.stringify(data));
        // });

        if(dropChecker(currentPrice,priceHistory))
        {
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+75);
            //     store.put('buy.history',buyHistory);
        }
        else
        {
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+50);
            //     store.put('buy.history',buyHistory);
        }

    })
},10000)