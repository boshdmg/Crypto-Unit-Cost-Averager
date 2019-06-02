import {cbProAuthenticated,cbProPublic} from './exchangeClients'
import buy from './buy'

jest.mock('./exchangeClients')

describe('when buying coins',()=>{

    let currentValue =200

    cbProPublic.mockImplementation(()=>{
        return { getProductTicker:jest.fn(() => {
            return Promise.resolve({  bid: currentValue })
        })}
    })
   
    afterEach(()=>{
        cbProAuthenticated.buy.mockClear()
    })

    describe('when buying coins',()=>{

        let expectedTransaction = {
            'type':'limit',
            'price': currentValue,
            'size': '0.0250',
            'product_id': 'test-test',
            'cancel_after' :'day', 
            'post_only' : true
        }

        beforeAll(()=>{ 
            buy(5,'test-test')
        })
        
        it('should buy the coins at the current rate',()=>{
            expect(cbProAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction)
        })
    })

    describe('when buying coin 2',()=>{

        let expectedTransaction = {
            'type':'limit',
            'price': currentValue,
            'size': '25.0000',
            'product_id': 'test-test',
            'cancel_after' :'day',
            'post_only' : true
        }

        beforeAll(()=>{        
            buy(5000,'test-test')
        })
        
        it('should buy the coins at the current rate',()=>{
            expect(cbProAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction)
        })
    })

    describe('when buying coins and the price exceeds the set limit price',()=>{

        let limitValue = 150

        beforeAll(()=>{      
            buy(5000,'test-test',limitValue)
        })
        
        it('should should not buy any coins',()=>{
            expect(cbProAuthenticated.buy).not.toHaveBeenCalled()
        })
    })
})
