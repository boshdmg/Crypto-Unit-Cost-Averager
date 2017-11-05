import {gdaxAuthenticated} from './exchangeClients'
import boughtWithinTime from './fills'
import MockDate from 'mockdate'

jest.mock('./exchangeClients')

describe('when checking if the last purchase was within the buy interval',()=>{

    gdaxAuthenticated.getFills.mockImplementation(()=>{
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
