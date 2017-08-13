import buy from './buy';
import gdaxAuthenticated from './exchangeClients';
import config from './config';

jest.mock('./exchangeClients',()=>jest.fn());
jest.mock('./config',()=> {return {product:'test-test'}});

describe('when buying coin',()=>{

    let expectedTransaction = {
        'type':'limit',
        'price': 200,
        'size': '0.0250',
        'product_id': 'test-test'
    }

    beforeEach(()=>{        
        gdaxAuthenticated.buy=jest.fn();  
        buy(5,200);
    })
    
    it('should buy the coins at the given rate',()=>{
        expect(gdaxAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction,expect.any(Function));
    });
});

describe('when buying coin',()=>{

    let expectedTransaction = {
        'type':'limit',
        'price': 200,
        'size': '25.0000',
        'product_id': 'test-test'
    }

    beforeEach(()=>{        
        gdaxAuthenticated.buy=jest.fn();  
        buy(5000,200);
    })
    
    it('should buy the coins at the given rate',()=>{
        expect(gdaxAuthenticated.buy).toHaveBeenCalledWith(expectedTransaction,expect.any(Function));
    });
});