import config from './config'
import coinbase from 'coinbase-pro'

const cbProAuthenticated = new coinbase.AuthenticatedClient(config.key, config.secret, config.passphrase, config.url)
const cbProPublic = ()=>{
    return new coinbase.PublicClient()
}
const cbProSocket = () =>{
    return new coinbase.WebsocketClient()
}

export {
    cbProAuthenticated,
    cbProPublic,
    cbProSocket
} 
