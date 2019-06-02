
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


import {cbProAuthenticated} from './../exchangeClients'

cbProAuthenticated.getOrders({'product_id': 'LTC-EUR','status':'done','done_reason':'filled','side':'buy'},(x,y,data)=>{
   
    console.log(data)
    console.log(data.length)
})

//status=done