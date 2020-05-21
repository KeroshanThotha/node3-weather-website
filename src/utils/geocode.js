const request = require('request')

const geoCode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)  + '.json?access_token=pk.eyJ1Ijoia2Vyb3NoYW4iLCJhIjoiY2thM3RnY29oMG5pbjN0cG42YXhlanJ6cyJ9.78EXjpnT3JLLydHlWL83Cg'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to internet',undefined);
        }
        else if(body.features.length ===0){
            callback('Invalid Location',undefined)

        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
        }
    })
}

module.exports ={
    geoCode:geoCode
} 