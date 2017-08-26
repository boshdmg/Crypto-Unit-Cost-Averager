import sheduler from './sheduler'
import config from './config'
import fs from 'fs'

try{
    fs.statSync('.gdaxrc')
}
catch(ex){
    throw('.gdaxrc file not found - please create it')  
}

sheduler(config.buy)