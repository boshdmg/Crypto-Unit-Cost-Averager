import buy from './buy';
import config from './config';
import fs from 'fs';

// let store = new Storage('store.json');
// store.put('price.history',[])
// store.put('buy.history',[])

let app =()=>{

    try{
        fs.statSync('.gdaxrc')
    }
    catch(ex){
        console.log('.gdaxrc file not found - please create it');   
        return; 
    }
    
   buy();
}

setInterval(()=>{app()},1000 * 60 * 60 * config.interval)

app()