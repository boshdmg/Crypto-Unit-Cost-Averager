import {gdaxAuthenticated} from './exchangeClients'
import config from './config'
import transfer from './transfer'

jest.mock('./config')

//gdax dont support crypto withdrawl yet -waiting for this pull request https://github.com/coinbase/gdax-node/pull/90
xdescribe('when withdrawing ETH',()=>{

    config.ETHWalletAddress = 'yoyo'

    let withDrawJson ={
        "amount": 10.00,
        "currency": "ETH",
        "crypto_address": "yoyo"
    }

    transfer()
    
    it('should withdraw all the Ether I have to my wallet',()=>{
        expect(gdaxAuthenticated.withdraw).toHaveBeenCalledWith(withDrawJson,expect.any(Function))
    })
})