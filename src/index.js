import buy from './buy';
import balanceChecker from './balanceChecker';
import config from './config';
import fs from 'fs';

let app =()=>{

    try{
        fs.statSync('.gdaxrc')
    }
    catch(ex){
        console.log('.gdaxrc file not found - please create it');   
        return; 
    }
    
    balanceChecker().then((data)=>
    {
        if(data)
        {
            buy();
        }
        else
        {
            console.log('You dont have enough credit :(')
        }
    })
 
}

setInterval(()=>{app()},1000 * 60 * 60 * config.interval)

app()