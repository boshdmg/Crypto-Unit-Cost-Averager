import {buy} from './buy';
import {Gdax} from 'gdax';
import config from './config';

jest.mock('gdax',()=>{buy:jest.fn()});

describe('when buying coin',()=>{

    buy(5,205);
    
    it('should buy the coins',()=>{
        expect(GDax.buy).toBeHaveBeenCalled();
    });

});