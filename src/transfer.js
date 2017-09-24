import {gdaxAuthenticated} from './exchangeClients'
import config from './config'

export function withdrawETH()
{
    if(/^(0x)?[0-9a-f]{40}$/.test(config.ETHWalletAddress))
    {
        gdaxAuthenticated.withdrawCrypto({
            "amount": 0.01,
            "currency": "ETH",
            "crypto_address": config.ETHWalletAddress
        },
        (err)=>{
            if(err)
            {
                console.log(err)
            }         
        })
    }
}

export function withdrawLTC()
{
    if(/^L[a-zA-Z0-9]{26,33}$/.test(config.LTCWalletAddress))
    {
        gdaxAuthenticated.withdrawCrypto({
            "amount": 0.01,
            "currency": "LTC",
            "crypto_address": config.LTCWalletAddress
        },
        (err)=>{
            if(err)
            {
                console.log(err)
            }         
        })
    }
}