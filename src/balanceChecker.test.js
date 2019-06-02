import {cbProAuthenticated} from './exchangeClients'
import balanceChecker from './balanceChecker'

jest.mock('./exchangeClients',()=>{
    return {
        cbProAuthenticated:jest.fn()
    }
})

describe('when balance is more than purchasing amount',()=>{

    beforeAll(()=>{
        cbProAuthenticated.getAccounts = jest.fn(()=>{
            return Promise.resolve([{currency:'FFF', balance:'2232.1291876466595000'}])
        })
    })

    it('should return true',()=>{
        expect.assertions(1)
        return balanceChecker('7.5','DAN-FFF').then(data => {
            expect(data).toBe(true)
        })
    })

})

describe('when balance is less than purchasing amount',()=>{

    beforeAll(()=>{
        cbProAuthenticated.getAccounts = jest.fn(()=>{
            return Promise.resolve([{currency:'FFF', balance:'1'}])
        })
    })

    it('should return false',()=>{
        expect.assertions(1)
        return balanceChecker('10.5','DAN-FFF').then(data => {
            expect(data).toBe(false)
        })
    })
})