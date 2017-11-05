import {gdaxAuthenticated} from './exchangeClients'

export default (product,interval) =>{
    return new Promise((resolve)=>{
        gdaxAuthenticated.getFills({'product_id': product}).then((data)=>{
            const mostRecentTransaction = data.filter(transaction => transaction.settled===true)[0]

            let time = new Date(mostRecentTransaction.created_at)
            time.setHours(time.getHours() + interval)

            console.log(time)
            console.log(new Date())


            resolve( new Date() > time)
        })
    }) 
}