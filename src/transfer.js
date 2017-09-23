import {gdaxAuthenticated} from './exchangeClients'
import config from './config'

export default function()
{
    console.log(config.ETHWalletAddress)
    console.log(/^(0x)?[0-9a-f]{40}$/.test(config.ETHWalletAddress))

    if(/^(0x)?[0-9a-f]{40}$/.test(config.ETHWalletAddress))
    {
        gdaxAuthenticated.withdrawCrypto({
            "amount": 0.01,
            "currency": "ETH",
            "crypto_address": config.ETHWalletAddress
        })
    }
}