const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath =(path.join(__dirname,'../public'))
const viewsDirPath = (path.join(__dirname,'../templates/views'))
const partialsDirPath = (path.join(__dirname,'../templates/partials'))

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Set up static dicterory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Keroshan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Keroshan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        description:'Welcome to the help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Must provide address'
        })
    }
    geocode.geoCode(req.query.address,(error,geocodeData) =>{
        if(error){
           return res.send({
                error:error
            })
        }
       forecast.forecast(geocodeData.latitude,geocodeData.longtitude,(error,data)=>{
           res.send({
               location:geocodeData.location,
               forecast:data.description,
               temperature:data.temperature + ' Degrees celsius'
           })
       }) 
    })

   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'Must privde search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found',
        title:'404',
        name:'KeroshanT'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page Not found',
        title:'404',
        name:'Keroshan'
    })
})
app.listen(port,()=>{
    console.log('Server Started ' + port)
})