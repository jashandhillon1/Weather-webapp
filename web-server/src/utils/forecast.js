const request=require('request')

const forecast=(latitude,longitude,callback)=>{
     const url='http://api.weatherstack.com/current?access_key=d54a14efe8610d1a3c5dc120597d7363&query=' + longitude + ',' + latitude + ' &units=f'

     request({url,json:true},(error,{body})=>{
         if(error){
            callback('Unable to connect to weather service',undefined)
         }
         else if(body.error){
             callback('Unable to find location',undefined)

         }
         else{
             callback(undefined," The current temperature is " + body.current.temperature + " and chances of rain is " + body.current.precip)
             

         }
     })
}
module.exports=forecast