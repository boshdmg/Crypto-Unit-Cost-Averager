import sheduler from './sheduler'
import config from './config'
import fs from 'fs'

try{
    fs.statSync('.gdaxrc')
}
catch(ex){
    throw('.gdaxrc file not found - please create it')  
}


console.log("=======================================================================================")
console.log("The app will begin to purchase (in 10 secs) based on the rules you put into the .gdaxrc")
console.log("=======================================================================================")
console.log(config.buy)
console.log("=======================================================================================")

setTimeout(()=>{sheduler(config.buy)},10000)