import config from './config';
import gdax from 'gdax';

const gdaxAuthenticated = new gdax.AuthenticatedClient(config.key, config.secret, config.passphrase, config.url)
const gdaxPublic = new gdax.PublicClient(config.product)

export {
    gdaxAuthenticated,
    gdaxPublic
} 
