
import {cbProSocket} from './../exchangeClients'
import events from 'events'

var eventEmitter = new events.EventEmitter()


cbProSocket().on('message',(data) => {
   // console.log(data)
    if (data.side==='sell' && data.type === 'done' && data.reason ==='filled') 
    {
        console.log(data)
        // if(data.price <7000)
        // {
        //     //raise buy event
        //     eventEmitter.emit('doit',data)
        // } 
    }
})

// import {cbProAuthenticated} from './../exchangeClients'

// cbProAuthenticated.getOrders({'product_id': 'LTC-EUR','status':'done','done_reason':'filled','side':'buy'},(x,y,data)=>{
   
//     console.log(data)
//     console.log(data.length)
// })

//status=done