
import gdax from 'gdax';
import _ from 'underscore'
var webSocket = new gdax.WebsocketClient('BTC-USD');

//console.log(orderbook.state())
let dan=[];
let smalldan =[];


 webSocket.on('message',function(data){
    //console.log(data);
    if (data.side=='sell' && data.type == 'done') 
    {
        //var askSide = orderbook.book.state().asks;
    //     var bidSide = orderbook.book.state().bids;

            //console.log(data)
            var dx = new Date(data.time);
            dx.setSeconds(0,0);

            d({time:dx.toString(),price:data.price});
    }
});


function d(x){
    
    if(x)
    {        
        smalldan.push(x);
    }

    
   

    smalldan=_.uniq(smalldan,(item)=>{return item.time});

     let sum = smalldan.reduce(function(a, b) { return +a.price + +b.price; });
    console.log(sum)
    let avg = sum / smalldan.length;
   // console.log(smalldan)
    // smalldan = smalldan.filter(function(item) {

    //     if(smalldan.length ==1)
    //     {
    //         return true
    //     }

    //      return item.time != x.time;
    // })


   console.log(smalldan)
  //  console.log(avg)
    //console.log(smalldan.price)
    if(x.price>avg)
    {
        console.log('Icreasing',smalldan.length)
    }
    else
    {
        console.log('decreaing',smalldan.length)
    }
    //console.log(dan)
}
