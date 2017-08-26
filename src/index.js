import buy from './buy'
import balanceChecker from './balanceChecker'
import config from './config'
import fs from 'fs'

try{
    fs.statSync('.gdaxrc')
}
catch(ex){
    throw('.gdaxrc file not found - please create it')  
}

let app =(amount,product,interval)=>{

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

for (let x in config.buy){
    let buy = config.buy[x]
    app(buy.amount,buy.product,buy.interval)
}


