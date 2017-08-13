import rc from 'rc'
import Storage from 'node-storage';
import Gdax from 'gdax';
import dropChecker from './dropChecker';
import buy from './buy';
import config from './config';

let store = new Storage('store.json');
let publicClient = new Gdax.PublicClient(config.product);

store.put('price.history',[])
store.put('buy.history',[])

let go =()=>{
      publicClient.getProductTicker(function(err, response, data){
        let priceHistory = store.get('price.history')
        let currentPrice =data.bid

        priceHistory.push(parseFloat(currentPrice)) 
        store.put('price.history',priceHistory)

        if(dropChecker(currentPrice,priceHistory))
        {
            buy(15,currentPrice)
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+75);
            //     store.put('buy.history',buyHistory);
        }
        else
        {
            buy(10,currentPrice)
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+50);
            //     store.put('buy.history',buyHistory);
        }

    })
}

setInterval(()=>{go()},1000 * 60 * 60 * config.amount)
go()