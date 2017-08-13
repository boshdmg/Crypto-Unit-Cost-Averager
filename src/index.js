import rc from 'rc'
import Storage from 'node-storage';
import {gdaxPublic} from './exchangeClients';
import dropChecker from './dropChecker';
import buy from './buy';
import config from './config';
import fs from 'fs';

let store = new Storage('store.json');
store.put('price.history',[])
store.put('buy.history',[])


let go =()=>{

    try{
        fs.statSync('.gdaxrc')
    }
    catch(ex){
        console.log('.gdaxrc file not found - please create it');   
        return; 
    }

    gdaxPublic.getProductTicker(function(err, response, data){
        let priceHistory = store.get('price.history')
        let currentPrice =data.bid

        priceHistory.push(parseFloat(currentPrice)) 
        store.put('price.history',priceHistory)

        if(dropChecker(currentPrice,priceHistory))
        {
            buy(config.amount*1.5,currentPrice)
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+75);
            //     store.put('buy.history',buyHistory);
        }
        else
        {
            buy(config.amount,currentPrice)
            //     var buyHistory = store.get('buy.history');
            //     buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+50);
            //     store.put('buy.history',buyHistory);
        }

    })
}




setInterval(()=>{go()},1000 * 60 * 60 * config.interval)

go()