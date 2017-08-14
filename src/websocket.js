var gdax = require('gdax');
var orderBookSync = new gdax.OrderbookSync();
var webSocket = new gdax.WebsocketClient('ETH-EUR');
var orderbook = new gdax.OrderbookSync();

//console.log(orderbook.state())


 webSocket.on('message',function(data){
 //console.log(data);
 if (data.type == 'open') {
 //var askSide = orderbook.book.state().asks;
   //     var bidSide = orderbook.book.state().bids;

        console.log(orderbook.book)
 }
});
