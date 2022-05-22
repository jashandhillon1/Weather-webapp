const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const address=process.argv[2];

if(!address){
    console.log('Please provide address')
}
else{

    geocode(address,(error,{latitude,longitude,location})=>{
        if(error){
            return console.log(error)
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastdata)
            
          })
    
    })
    
    
}


// const url='http://api.weatherstack.com/current?access_key=d54a14efe8610d1a3c5dc120597d7363&query=37.8267,-122.4233&units=f'


// request({url:url,json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect with weather services")
//     }
//     else if(response.body.error){
//         console.log("Unable to find location")

//     }
//     else{
//     console.log(" The current temperature is " + response.body.current.temperature + " and chances of rain is " + response.body.current.precip)
//     }
// })



// const geocodeURL="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFzaGFucGRoaWxsb24iLCJhIjoiY2wxYmpkNGl4MDN3NjNjcW9oeXAzb3FzZyJ9.EN7cD6eIhxcoaQ7onRnpcA&limit=1"


// request({url:geocodeURL,json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect to location services")

//     }
//     else if(response.body.features.length==0){
//         console.log("Unable to find location")
//     }
//     else{
//         const latitude=response.body.features[0].center[1];
//     const longitude=response.body.features[0].center[0];
//     console.log(latitude,longitude)

//     }
    
// })




