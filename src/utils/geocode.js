const request=require('request')

const geocode=(address,callback)=>{
    const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFqYXRqaGEiLCJhIjoiY2szOGJzNzZmMDBqajNwa3FzYThkMG8yMiJ9.BMR9lCy98zJm_qx-bS3wgA'
    request({url:url1,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the internet.',undefined)
        }
        else if(body.message){
            callback(body.message,undefined)
        }
        else if(body.features.length===0){
            callback('Incorrect Location!',undefined)
        }
        else{
            callback(undefined,{
                Latitude:body.features[1].center[1],
                Longitude:body.features[1].center[0],
                Location:body.features[1].place_name
            })
        }
    })
}

module.exports=geocode