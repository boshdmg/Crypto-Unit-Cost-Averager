import {gdaxAuthenticated} from './exchangeClients'
import config from './config'

export default function()
{
    gdaxAuthenticated.withdraw({
            "amount": 0.01,
            "currency": "ETH",
            "crypto_address": config.ETHWalletAddress
        }, 
        (x)=>(console.log(x))
    );
}