const request=require('request')

const forecast=(Latitude,Longitude,callback)=>{
    const url='https://api.darksky.net/forecast/28c64faab289c6df780481bdf6477b9e/'+Latitude+','+Longitude+'?units=auto'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the Darksky server.',undefined)
        }
        else if(body.error){
            callback(body.error,undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
    

module.exports=forecast