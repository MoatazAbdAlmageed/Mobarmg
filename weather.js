"use strict";
const fs = require("fs");
const argv = require("yargs").argv;
var weather = require("openweather-apis");
var dotenv = require("dotenv").config();
var dir = "./dist";

if (dotenv.error) {
  throw dotenv.error;
}
const conf = dotenv.parsed;
console.log(conf);

console.log("======> args");
console.log(argv);

weather.setAPPID(conf.openweather);
weather.setLang("en");
weather.setCity(argv.city);

fs.readFile(dir + "/weather.json", function (err, data) {
  if (err) {
    // get all the JSON file returned from server (rich of info)
    weather.getAllWeather(function (err, JSONObj) {
      fs.writeFileSync(
        dir + "/weather.json",
        JSON.stringify([{ [argv.city]: JSONObj }])
      );
    });
  } else {
    const _data = JSON.parse(data);
    var filtered = _data.filter(function (el) {
      return !el[argv.city];
    });
    weather.getAllWeather(function (err, JSONObj) {
      filtered.push({ [argv.city]: JSONObj });
      fs.writeFileSync(dir + "/weather.json", JSON.stringify(filtered));
    });
  }
});
