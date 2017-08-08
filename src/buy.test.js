import buy from './buy';
import Gdax from 'gdax';
import config from './config';

jest.mock('gdax');


describe('when buying coin',()=>{

    buy(5,205);

    //const spy = jest.spyOn(video, 'play');
    
    it('should buy the coins',()=>{
        //expect(GDax.buy.mock.calls.length).toBe(1);   
    });

});