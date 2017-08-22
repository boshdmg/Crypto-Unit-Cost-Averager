import {gdaxAuthenticated,gdaxPublic} from './exchangeClients'
import buy from './buy'

jest.mock('./exchangeClients',()=>{
    return {
        gdaxAuthenticated:jest.fn(),
        gdaxPublic:jest.fn()
    }
})

describe('when buying coins',()=>{

    let currentValue =200
    
    let expectedTransaction = {
        'type':'limit',
        'price': currentValue,
        'size': '0.0250',
        'product_id': 'test-test',
        'cancel_after' :'hour'
    }
    beforeEach(()=>{ 
         
        gdaxAuthenticated.buy=jest.fn()

        gdaxPublic.mockImplementation(()=>{
            return { getProductTicker:jest.fn(() => {
                return Promise.resolve({  bid: currentValue })
            })}
        })

        buy(5,'test-test')
    })
    
    it('should buy the coins at the current rate',()=>{
        expect(gdaxAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction,expect.any(Function))
    })
})

describe('when buying coin 2',()=>{
 
     let currentValue =200

    let expectedTransaction = {
        'type':'limit',
        'price': currentValue,
        'size': '25.0000',
        'product_id': 'test-test',
        'cancel_after' :'hour'
    }

    beforeEach(()=>{        
        gdaxAuthenticated.buy=jest.fn()

        gdaxPublic.mockImplementation(()=>{
            return { getProductTicker:jest.fn(() => {
                return Promise.resolve({  bid: currentValue })
            })}
        })

        buy(5000,'test-test')
    })
    
    it('should buy the coins at the current rate',()=>{
        expect(gdaxAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction,expect.any(Function))
    })
})
