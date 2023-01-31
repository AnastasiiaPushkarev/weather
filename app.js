const express = require('express'); //add express module
const https = require("https");
const bodyParser = require("body-parser");

const app = express();//initialize new express app

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html"); //+ index.html
    
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + query + "&appid=c6a6f51867cd07a6784e02c37cc6394d";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
});







app.listen(3000, function(){
    console.log("Server is running on port 3000");
}) //listen port 3000