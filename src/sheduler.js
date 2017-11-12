import buyCurrency from './buy'
import balanceChecker from './balanceChecker'
import withinBuyInterval from './orders'

export default (buys) =>{
    for (let x in buys){
        let buy = buys[x]
        _app(buy.amount,buy.product,buy.interval,buy.limit)
    }
}

let _app =(amount,product,interval,limit)=>{
    
    let func = () =>{

        withinBuyInterval(product,interval).then((shouldBuy)=>{
            return shouldBuy
        }).then((shouldBuy)=>
        {
            if(shouldBuy)
            {
                return balanceChecker(amount,product).then((data)=>
                {  
                    return data   
                })
            }
            return false

        }).then((hasCredit)=>{
            
            if(hasCredit){
                buyCurrency(amount,product,limit)
            }
            else{
                console.log(`You dont have enough credit for ${product} purchase'`)
            }
        })
    } 
    
    func()
    setInterval(func,1000 * 60 * 60 * interval)
}