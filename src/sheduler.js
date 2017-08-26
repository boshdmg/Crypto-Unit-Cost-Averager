import buy from './buy'
import balanceChecker from './balanceChecker'

export default (buys) =>{
    for (let x in buys){
        let buy = buys[x]
        _app(buy.amount,buy.product,buy.interval)
    }
}

let _app =(amount,product,interval)=>{
    setInterval(()=>{
        balanceChecker(amount,product).then((data)=>
        {   
            if(data){
                buy(amount,product)
            }
            else{
                console.log('You dont have enough credit :(')
            }
    
        })}
        ,1000 * 60 * 60 * interval)
}