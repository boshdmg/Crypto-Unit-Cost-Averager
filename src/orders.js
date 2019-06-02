import {cbProAuthenticated} from './exchangeClients'

export default (product,interval) =>{
    return new Promise((resolve)=>{
        cbProAuthenticated.getOrders({'product_id': product,'status':'done','done_reason':'filled','side':'buy'}).then((data)=>{
            const mostRecentTransaction = data.filter(transaction => transaction.settled===true)[0]

            let time = new Date(mostRecentTransaction.created_at)
            time.setHours(+time.getHours() + +interval)
            
            resolve( new Date() > time)
        })
    }) 
}