import {cbProAuthenticated} from './exchangeClients'

export default (amount,product) =>
{
    return new Promise((resolve)=>{
        cbProAuthenticated.getAccounts().then((data)=>{
            let currency = product.substr(product.length- 3)
            let { balance } = data.filter((x)=>(x.currency===currency))[0]
            resolve(+balance > +amount)         
        }).catch((x)=>{console.log(x)})
    })  
}

