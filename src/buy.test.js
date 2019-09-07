import {cbProAuthenticated,cbProPublic} from './exchangeClients'
import buy from './buy'

jest.mock('./exchangeClients')

describe('when the value is 200',()=>{

    let currentValue =200

    beforeAll(()=>{
        cbProPublic.mockImplementation(()=>{
            return { getProductTicker:jest.fn(() => {
                return Promise.resolve({  bid: currentValue })
            })}
        })
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

describe('when the value is 2.934',()=>{

    let currentValue =2.934

    beforeAll(()=>{
        cbProPublic.mockImplementation(()=>{
            return { getProductTicker:jest.fn(() => {
                return Promise.resolve({  bid: currentValue })
            })}
        })
    })
    afterEach(()=>{
        cbProAuthenticated.buy.mockClear()
    })

    describe('and buying EOS',()=>{

        let limitValue = 3

        let expectedTransaction = {
            'type':'limit',
            'price': currentValue,
            'size': '0.3',
            'product_id': 'EOS-EUR',
            'cancel_after' :'day',
            'post_only' : true
        }

        beforeAll(()=>{      
            buy(1,'EOS-EUR',limitValue)
        })
        
        it('should place an order with size rounded to nears 0.1',()=>{
            expect(cbProAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction)
        })
    })
})