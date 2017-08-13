import dropChecker from './dropChecker.js';


describe('when the lastest price is more than 6 percetn lower than the average of the last 2',()=>{
    let recentPrices = [100,100,100,100,100];
    let latestPrice= 92.9;

    it('should indicate prices are dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeTruthy()
    });
});

describe('when the lastest price is 1 percent lower than the average of the last 2',()=>{
    let recentPrices = [100,100,100,100,100];
    let latestPrice= 99;

    it('should indicate prices are not dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeFalsy();
    });
});

describe('when the lastest price is the same as average of the last 2',()=>{
    let recentPrices = [100,100,100,100,100];
    let latestPrice= 100;

    it('should indicate prices are not dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeFalsy()
    });
});

describe('when the lastest price is higher than the average of the last 2',()=>{
    let recentPrices = [100,100,100,100,100];
    let latestPrice= 110;

    it('should indicate prices are not dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeFalsy()
    });
});

describe('when the lastest price is 6 percent lower than the average but there is only 1 previous result',()=>{
    let recentPrices = [100];
    let latestPrice= 110;

    it('should indicate prices are not dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeFalsy()
    });
});

describe('when there are no previous price',()=>{
    let recentPrices = [];
    let latestPrice= 110;

    it('should indicate prices are not dropping',()=>{
        expect(dropChecker(latestPrice,recentPrices)).toBeFalsy()
    });
});