const express = require('express'); //add express module
const https = require("https");

const app = express();//initialize new express app

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kingston, ON, CA&appid=c6a6f51867cd07a6784e02c37cc6394d";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in Kingston, ON is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })

    // res.send("Server is up and running.")
})





app.listen(3000, function(){
    console.log("Server is running on port 3000");
}) //listen port 3000