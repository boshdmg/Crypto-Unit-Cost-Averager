import buy from './buy';
import config from './config';
import fs from 'fs';
import {gdaxAuthenticated} from './exchangeClients';
import {gdaxPublic} from './exchangeClients';


let app =()=>{

    try{
        fs.statSync('.gdaxrc')
    }
    catch(ex){
        console.log('.gdaxrc file not found - please create it');   
        return; 
    }
    
    // gdaxPublic.getProductTicker()
    // .then(data=>{
        
    //     let currentPrice =data.ask
    //     console.log(currentPrice)
    // })

    // gdaxPublic.getCurrencies()
    // .then(data=>{
        
       
    //     console.log(data)
    // })

    gdaxAuthenticated.getAccounts(function(err,response,data){
        
       //console.log(arguments); 
        
        if(err)
        {
            console.log(err);
        } 
        else
        {
            console.log(data.filter((x)=>(x.currency=='EUR'))[0].balance);
        }      
        
    });
}

setInterval(()=>{app()},1000 *5)

