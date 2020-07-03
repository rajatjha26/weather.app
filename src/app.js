const express=require('express')
const path=require('path')
const hbs=require("hbs")
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
const port =process.env.PORT || 3000

//config of handlebars in viewspath, static serve in dirpath and Partials in partialpath 
const dirpath=path.join(__dirname,'../public/')
const viewspath=path.join(__dirname,"../templates/views")
const partialpath=path.join(__dirname,"../templates/partials")

//handlebar engine config and views path 
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialpath)

//static file serve
app.use(express.static(dirpath))

app.get("",(req,res)=>{
    res.render("index",{
        "title":"Weather",
        "name":"Rajat jha"
    })

})

app.get("/about",(req,res)=>{
    res.render("about",{
        "title":"About",
        "name":"Rajat jha"
    })

})

app.get("/help",(req,res)=>{
    res.render("help",{
        "title":"Help",
        "message":"How can i help you",
        "name":"Rajat jha"
    })

})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            "error":"You should provide an address!"
        })
    }
    geocode(req.query.address, (error, {Latitude,Longitude,Location}={}) => {
        if(error){
          return res.send({error})
        }
        forecast(Latitude,Longitude,(error, forecastdata) => {
          if(error){
            return res.send({error})
          }
          res.send({
            Location,
            "weather":forecastdata,
            "Address":req.query.address
        })
        })
      })
})

app.get("/about/*",(req,res)=>{
    res.render("error",{
        "title":"404",
        "name":"Rajat jha",
        "errorMessage":"About article not found"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        "title":"404",
        "name":"Rajat jha",
        "errorMessage":"Help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("error",{
        "title":"404",
        "name":"Rajat jha",
        "errorMessage":"Page Not Found"
    })
})

app.listen(port,()=>{
    console.log('app is listening on port '+ port)
})