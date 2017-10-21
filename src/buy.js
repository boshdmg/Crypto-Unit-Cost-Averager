import {gdaxAuthenticated} from './exchangeClients'
import {gdaxPublic} from './exchangeClients'

export default (amount,product,limit) =>
{    

    gdaxPublic(product).getProductTicker().then(data=>{
        
        let currentPrice =data.bid

        if(limit !== undefined && currentPrice>limit)
        {
            return false
        }
            
        let size = Number(amount/currentPrice).toFixed(4).toString()

        let transaction = {
            'type':'limit',
            'price': currentPrice,
            'size': size,
            'product_id': product,
            'cancel_after' :'day'
        }

        gdaxAuthenticated.buy(transaction,()=>{
            console.log(`BUY ${size} of ${product} for ${amount} @ ${currentPrice} @ ${new Date().toLocaleString()}`)
        })
    })
}