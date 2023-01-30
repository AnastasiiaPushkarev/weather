const express = require('express'); //add express module
const https = require("https");

const app = express();//initialize new express app

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kingston&appid=c6a6f51867cd07a6784e02c37cc6394d";
    
    https.get(url, function(response){
        console.log(response);
    })

    res.send("Server is up and running.")
})





app.listen(3000, function(){
    console.log("Server is running on port 3000");
}) //listen port 3000