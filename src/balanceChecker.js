import {gdaxAuthenticated} from './exchangeClients'
import config from './config'

export default () =>
{
   return new Promise((resolve,reject)=>{
        gdaxAuthenticated.getAccounts().then((data)=>{
           
            let currency = config.product.substr(config.product.length- 3)
            let balance = data.filter((x)=>(x.currency==currency))[0].balance
            resolve(balance > config.amount)
           
        });
    });  
}