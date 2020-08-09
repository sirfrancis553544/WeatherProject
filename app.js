const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //   console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "a27913e62a198c245bc8c1017d87bb10";
  const units = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units +
    "";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const place = weatherData.name;
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x/png";
      // console.log("this is the place " + temp + " and description " + des);

      res.write(` <h1>The temperature in
      ${place}
       is
      ${temp}
       and its described as
      ${des} </h1>`);
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
  //   res.send("Server is up and running");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
