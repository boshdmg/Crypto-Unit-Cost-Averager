import config from './config';

export function gdaxAuthenticated()
{
    return new Gdax.AuthenticatedClient(config.key, config.secret, config.password, config.url);
}