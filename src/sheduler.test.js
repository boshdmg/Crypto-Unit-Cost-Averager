import sheduler from './sheduler'
import buy from './buy'

jest.mock('./buy')
jest.mock('./balanceChecker',()=>jest.fn(()=>
{
    return {
        then:jest.fn(x=>x(true))
    }
}))

jest.useFakeTimers()

describe('when buying multiple currencies',()=>{

    let config =[
        {product:"ETH-EUR",amount : "7",interval : "1", limit:"200"},
        {product:"LTC-EUR",amount : "7.5",interval : "6"},
        {product:"BTC-EUR",amount : "40",interval : "96"}
    ]

    sheduler(config)

    it('should buy them all',()=>{
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 1)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 6)
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function),1000 * 60 * 60 * 96)

        setInterval.mock.calls[0][0]()
        expect(buy).toHaveBeenCalledWith("7","ETH-EUR","200")
        
        setInterval.mock.calls[1][0]()
        expect(buy).toHaveBeenCalledWith("7.5","LTC-EUR",undefined)

        setInterval.mock.calls[2][0]()
        expect(buy).toHaveBeenCalledWith("40","BTC-EUR",undefined)
    })
})