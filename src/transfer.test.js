import {cbProAuthenticated} from './exchangeClients'
import config from './config'
import {withdrawETH,withdrawLTC,withdrawBTC} from './transfer'

jest.mock('./config')
jest.mock('./exchangeClients')

describe('when withdrawing ETH to a valid address',()=>{

    let withdrawJson ={
        "amount": 0.01,
        "currency": "ETH",
        "crypto_address": "0xfd867d45eac2e0fa598db4a7b3e77eeb29f4e7a4"
    }

    beforeAll(()=>{
        config.ETHWalletAddress = '0xfd867d45eac2e0fa598db4a7b3e77eeb29f4e7a4'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawETH()
    })

    it('should withdraw all the Ether I have to my wallet',()=>{
        expect(cbProAuthenticated.withdrawCrypto).toHaveBeenCalledWith(withdrawJson,expect.any(Function))
    })
})

describe('when withdrawing ETH to a invalid address',()=>{

    beforeAll(()=>{
        config.ETHWalletAddress = '0xae334d45eb4g7b3e33eab19f4e7b3'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawETH()
    })
     
    it('should not withdraw the LTC',()=>{
        expect(cbProAuthenticated.withdrawCrypto).not.toHaveBeenCalled()
    })
})

describe('when withdrawing LTC to a valid address',()=>{
    let withdrawJson ={
        "amount": 0.01,
        "currency": "LTC",
        "crypto_address": "LW5nkKZ9CWSAGcpbzSXarYujqaoiFALC3R"
    }
    
    beforeAll(()=>{
        config.LTCWalletAddress = 'LW5nkKZ9CWSAGcpbzSXarYujqaoiFALC3R'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawLTC()
    })
        
    it('should withdraw the LTC',()=>{
        expect(cbProAuthenticated.withdrawCrypto).toHaveBeenCalledWith(withdrawJson,expect.any(Function))
    })
})

describe('when withdrawing LTC to a invalid address',()=>{
    
    beforeAll(()=>{
        config.LTCWalletAddress = '0xfd867d45eac2e0fa598db4a7b3e77eeb29f4e7a4'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawLTC()
    })
        
    it('should not withdraw the LTC',()=>{
        expect(cbProAuthenticated.withdrawCrypto).not.toHaveBeenCalled()
    })
})

describe('when withdrawing BTC to a valid address',()=>{
    let withdrawJson ={
        "amount": 0.01,
        "currency": "BTC",
        "crypto_address": "1Ap5ssvYXde3kkykhetB2yr8g35EbcRxd3"
    }

    beforeAll(()=>{
        config.BTCWalletAddress = '1Ap5ssvYXde3kkykhetB2yr8g35EbcRxd3'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawBTC()
    })

    it('should withdraw the BTC',()=>{
        expect(cbProAuthenticated.withdrawCrypto).toHaveBeenCalledWith(withdrawJson,expect.any(Function))
    })
})
    
describe('when withdrawing BTC to a invalid address',()=>{

    beforeAll(()=>{
        config.BTCWalletAddress = '0xfd867d45eac2e0fa598db4a7b3e77eeb29f4e7a4'
        cbProAuthenticated.withdrawCrypto = jest.fn()
        withdrawBTC()
    })

    it('should not withdraw the BTC',()=>{
        expect(cbProAuthenticated.withdrawCrypto).not.toHaveBeenCalled()
    })
})
