"use strict";
const argv = require("yargs").argv;
const fs = require("fs");
var weather = require("openweather-apis");
var dotenv = require("dotenv").config();
const dir = "./dist";
const conf = dotenv.parsed;

exports.init = function () {
  console.log("init...");

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
};
