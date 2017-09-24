import {gdaxAuthenticated} from './exchangeClients'
import config from './config'
import {withdrawETH,withdrawLTC} from './transfer'

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
        gdaxAuthenticated.withdrawCrypto = jest.fn()
        withdrawETH()
    })

    it('should withdraw all the Ether I have to my wallet',()=>{
        expect(gdaxAuthenticated.withdrawCrypto).toHaveBeenCalledWith(withdrawJson,expect.any(Function))
    })
})

describe('when withdrawing ETH to a invalid address',()=>{

    beforeAll(()=>{
        config.ETHWalletAddress = '0xae334d45eb4g7b3e33eab19f4e7b3'
        gdaxAuthenticated.withdrawCrypto = jest.fn()
        withdrawETH()
    })
     
    it('should not withdraw the LTC',()=>{
        expect(gdaxAuthenticated.withdrawCrypto).not.toHaveBeenCalled()
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
        gdaxAuthenticated.withdrawCrypto = jest.fn()
        withdrawLTC()
    })
        
    it('should withdraw the LTC',()=>{
        expect(gdaxAuthenticated.withdrawCrypto).toHaveBeenCalledWith(withdrawJson,expect.any(Function))
    })
})

describe('when withdrawing LTC to a invalid address',()=>{
    
    beforeAll(()=>{
        config.LTCWalletAddress = '0xfd867d45eac2e0fa598db4a7b3e77eeb29f4e7a4'
        gdaxAuthenticated.withdrawCrypto = jest.fn()
        withdrawLTC()
    })
        
    it('should not withdraw the LTC',()=>{
        expect(gdaxAuthenticated.withdrawCrypto).not.toHaveBeenCalled()
    })
})