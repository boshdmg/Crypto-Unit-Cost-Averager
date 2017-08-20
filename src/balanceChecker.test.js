import {gdaxAuthenticated} from './exchangeClients'
import config from './config'
import balanceChecker from './balanceChecker'

jest.mock('./exchangeClients',()=>{
    return {
        gdaxAuthenticated:jest.fn()
    }
});

describe('when balance is more than purchasing amount',()=>{

    beforeAll(()=>{
        config.amount = 10
        config.product = 'DAN-FFF'

        gdaxAuthenticated.getAccounts = jest.fn(()=>{
            return Promise.resolve([{currency:'FFF', balance:100}])
        })
    })

    it('should return true',()=>{
        expect.assertions(1);
        return balanceChecker().then(data => {
            expect(data).toBe(true);
        });
    })

})

describe('when balance is less than purchasing amount',()=>{

    beforeAll(()=>{
        config.amount = 10
        config.product = 'DAN-FFF'

        gdaxAuthenticated.getAccounts = jest.fn(()=>{
            return Promise.resolve([{currency:'FFF', balance:1}])
        })
    })

    it('should return false',()=>{
        expect.assertions(1);
        return balanceChecker().then(data => {
            expect(data).toBe(false);
        });
    })

})