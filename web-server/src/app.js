const express=require('express')
const path=require('path')

const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')




const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')

const viewspath=path.join(__dirname,'/templates/views')

const partialspath=path.join(__dirname,'/templates/partials')



app.set('views',viewspath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialspath)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Jashanpreet Singh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name:'Jashanpreet Singh'
    })
})
 
app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Jashanpreet Singh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location })=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        name : 'jashan',
        errorMessage: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        name: 'Jashan',
        errorMessage: 'Page not found'
    })

})
app.listen(3000,()=>{
    console.log("server started on port 3000")
})