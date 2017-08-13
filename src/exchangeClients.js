import config from './config';
import gdax from 'gdax';

export default new gdax.AuthenticatedClient(config.key, config.secret, config.passphrase, config.url);
