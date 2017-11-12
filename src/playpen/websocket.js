
// import gdax from 'gdax'
// var webSocket = new gdax.WebsocketClient('BTC-USD')

// import events from 'events'
// var eventEmitter = new events.EventEmitter()

// webSocket.on('message',(data) => {
//     if (data.side==='sell' && data.type === 'done' && data.reason ==='filled') 
//     {
//         if(data.price <7000)
//         {
//             //raise buy event
//             eventEmitter.emit('doit',data)
//         } 
//     }
// })


import {gdaxAuthenticated} from './../exchangeClients'

gdaxAuthenticated.getFills({'product_id': 'ETH-EUR'},(x,y,data)=>{
   
    console.log(data.filter(transaction => transaction.settled===true)[0])
})