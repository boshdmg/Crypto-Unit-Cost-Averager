import {gdaxAuthenticated} from './exchangeClients'

export default (amount,product) =>
{
    return new Promise((resolve)=>{
        gdaxAuthenticated.getAccounts().then((data)=>{
            let currency = product.substr(product.length- 3)
            let balance = data.filter((x)=>(x.currency===currency))[0].balance
            resolve(balance > amount)          
        }).catch((x)=>{console.log(x)})
    })  
}