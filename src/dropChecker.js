
export default function(latestPrice,recentPrices){

        var x = recentPrices.slice(Math.max(recentPrices.length - 5, 0));
   
        if(x.length>4)
        {
            let sum = x.reduce(function(a, b) { return a + b; });
            let avg = sum / x.length;
            let priceDrop =(latestPrice-avg)/ avg*100;

            return priceDrop < -6
        }
        return false;       
}