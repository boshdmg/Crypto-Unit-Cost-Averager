import {cbProAuthenticated} from './exchangeClients'
import boughtWithinTime from './orders'
import MockDate from 'mockdate'

jest.mock('./exchangeClients')

describe('when checking if the last order was within the buy interval',()=>{

    cbProAuthenticated.getOrders.mockImplementation(()=>{
        return Promise.resolve([
            {
                settled:true,
                created_at: '2017-11-04T17:00:00.000Z'
            },
            {
                settled:true,
                created_at: '1998-11-04T17:18:48.132Z'
            },
            {
                settled:false,
                created_at: '2017-11-04T17:18:48.132Z'
            }
        ])
    })

    it('should get all filled buy orders ',()=>{
        expect.assertions(1)
        return boughtWithinTime('EUR-LTC',1).then(() => {
            expect(cbProAuthenticated.getOrders).toHaveBeenCalledWith({'product_id': 'EUR-LTC','status':'done','done_reason':'filled','side':'buy'})
        })
    })

    describe('and the last purchase was outside the interval',()=>{
        beforeAll(()=>{
            MockDate.set('2017-11-04T19:00:00.000Z')
        })
       
        it('should return true',()=>{
            expect.assertions(1)
            return boughtWithinTime('EUR-LTC',1).then(data => {
                expect(data).toBe(true)
            })
        })
    })

    describe('and the last purchase was inside the interval',()=>{
        
        beforeAll(()=>{
            MockDate.set('2017-11-04T17:30:00.000Z')
        })

        it('should return false',()=>{
            expect.assertions(1)
            return boughtWithinTime('EUR-LTC',1).then(data => {
                expect(data).toBe(false)
            })
        })
    })
})
