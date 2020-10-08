var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname));

app.get("/", function (req, res) {


  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

  // Weather Content
  const query = req.body.cityName;
  const apiKey = "43ed939c0fa9070c198dd4341eba1c95";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherIs = weatherData.weather[0].main;
      // const weatherIcon = weatherData.weather[0].icon;
      // const weatherImageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write(weatherIs);
      res.send();
    })
  })

})

app.listen(3000, function () {

});

