import config from './config'
import gdax from 'gdax'

const gdaxAuthenticated = new gdax.AuthenticatedClient(config.key, config.secret, config.passphrase, config.url)
const gdaxPublic = (product)=>{
    return new gdax.PublicClient(product)
}

export {
    gdaxAuthenticated,
    gdaxPublic
} 
