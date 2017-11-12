import sheduler from './sheduler'
import buy from './buy'
import withinBuyInterval from './fills'

jest.mock('./buy')
jest.mock('./fills')

jest.mock('./balanceChecker',()=> jest.fn(()=>{return Promise.resolve(true)}))

jest.useFakeTimers()

describe('when buying multiple currencies and all of them have been purchased already within the interval',()=>{

    beforeAll(()=>{
        let config =[
            {product:"ETH-EUR",amount : "7",interval : "1", limit:"200"},
            {product:"LTC-EUR",amount : "7.5",interval : "6"},
            {product:"BTC-EUR",amount : "40",interval : "96"}
        ]
    
        withinBuyInterval.mockImplementation(()=>{
            return Promise.resolve(false)
        })
    
        sheduler(config)

    })

    it('should shedule to buy them all at the next interval',()=>{
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 1)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 6)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 96)

        expect(buy).not.toHaveBeenCalledWith("7","ETH-EUR","200")  
        expect(buy).not.toHaveBeenCalledWith("7.5","LTC-EUR",undefined)
        expect(buy).not.toHaveBeenCalledWith("40","BTC-EUR",undefined)
    })
})

describe('when buying multiple currencies and one of them have been purchased already outside the interval',()=>{
    
    beforeAll(()=>{
        let config =[
            {product:"ETH-EUR",amount : "7",interval : "1", limit:"200"},
            {product:"LTC-EUR",amount : "7.5",interval : "6"},
            {product:"BTC-EUR",amount : "40",interval : "96"}
        ]

        withinBuyInterval.mockImplementationOnce(()=>{
            return Promise.resolve(false)
        }).mockImplementationOnce(()=>{
            return Promise.resolve(true)
        }).mockImplementationOnce(()=>{
            return Promise.resolve(false)
        })
        
        sheduler(config)
    })

    it('should buy shedule all of them but attempted to buy the one straight away',()=>{
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 1)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 6)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 96)

        expect(buy).toHaveBeenCalledWith("7.5","LTC-EUR",undefined)
        expect(buy).not.toHaveBeenCalledWith("7","ETH-EUR","200")  
        expect(buy).not.toHaveBeenCalledWith("40","BTC-EUR",undefined)
    })
})