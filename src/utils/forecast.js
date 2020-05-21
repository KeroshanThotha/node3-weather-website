const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bdff7b9fd011b8d0d9223c84c28ea4d2&query=  '+ latitude +',' +longitude +'&units=m'
    request({url:url , json:true},(error,{body}={})=>{
        if(error){
            callback('No network',undefined)
        }else if(body.error){
            callback('Invalid coordinates',undefined)

        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                description:body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = {
    forecast:forecast
}