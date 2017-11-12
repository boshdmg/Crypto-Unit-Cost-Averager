import config from './config'
import gdax from 'gdax'

const gdaxAuthenticated = new gdax.AuthenticatedClient(config.key, config.secret, config.passphrase, config.url)
const gdaxPublic = (product)=>{
    return new gdax.PublicClient(product)
}
const gdaxSocket = (product) =>{
    return new gdax.WebsocketClient(product)
}

export {
    gdaxAuthenticated,
    gdaxPublic,
    gdaxSocket
} 
