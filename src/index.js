var config = require('./config.json');
var Storage = require('node-storage');
var store = new Storage('store.json');
var Gdax = require('gdax');
var publicClient = new Gdax.PublicClient('ETH-EUR');

store.put('price.history',[])
store.put('buy.history',[])

   var buyETH = {
            'price': '50',
            'type': 'market',
            'product_id': 'ETH-EUR',
    };

    var buyETHHigher = {
        'price': '70',
        'type': 'market',
        'product_id': 'ETH-EUR',
    };

setInterval(function(){
    publicClient.getProductTicker(function(err, response, data){
        var priceHistory = store.get('price.history');
        var currentPrice =data.bid;
     
        console.log(currentPrice);
     
        priceHistory.push(parseFloat(currentPrice));
     
        store.put('price.history',priceHistory);
x
        var x = priceHistory.slice(Math.max(priceHistory.length - 5, 1))
        console.log('x'+x);

        if(x.length>4)
        {
            var sum = x.reduce(function(a, b) { return a + b; });
            console.log('sum'+sum)

            var avg = sum / x.length;
            console.log('avg'+avg)

            var priceDrop =(currentPrice-avg)/ avg*100
             console.log('priceDrop'+priceDrop)
            
        }
       
        if(priceDrop < -0.003)
        {
            //authedClient.buy(buyETHHigher, callback);
            var buyHistory = store.get('buy.history');
            buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+70);
            store.put('buy.history',buyHistory);

        }
        else
        {
            var buyHistory = store.get('buy.history');
            buyHistory.push(new Date().toLocaleString()+" "+currentPrice+" "+50);
            store.put('buy.history',buyHistory);
        }
    })
},10000)