const functions = require('firebase-functions');
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:"300kb"}));

exports.myapp = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.post("/weather",async (req,res)=>{
    let {city} = req.body;
    let result = await getWeatherData(city);
    res.send(result);
})

async function getWeatherData(city="Seoul",apikey="a85e877b21f34ed7867d2aadc19f5130"){
    try{
        let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        return res.data;
    }catch(err){
        console.log(err.message);
        return err;
    }
}

 