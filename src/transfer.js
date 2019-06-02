import {cbProAuthenticated} from './exchangeClients'
import config from './config'

export function withdrawETH()
{
    if(/^(0x)?[0-9a-f]{40}$/.test(config.ETHWalletAddress))
    {
        cbProAuthenticated.withdrawCrypto({
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
        cbProAuthenticated.withdrawCrypto({
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

export function withdrawBTC()
{
    if(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(config.BTCWalletAddress))
    { 
        cbProAuthenticated.withdrawCrypto({
            "amount": 0.01,
            "currency": "BTC",
            "crypto_address": config.BTCWalletAddress
        },
        (err)=>{
            if(err)
            {
                console.log(err)
            }
        })
    }
}