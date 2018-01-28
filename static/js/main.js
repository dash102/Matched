var HI = require('heat-index');

const key = "f123ec11eb36daac9c3f5ef9a26c5ab6";
function findWeather(zipcode) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + "&APPID=" + key ,function(json){

        var output = JSON.stringify(json, null, 2);
        var jsonParsed = JSON.parse(output);

        //console.log(typeof(jsonParsed.list[34].rain["3h"]));
        console.log(jsonParsed);
        for (var i = 0; i < 40; i++) {
            var temperature = ((jsonParsed.list[i].main.temp) * (9.0/5.0)) - 459.67;
            var humidity = jsonParsed.list[i].main.humidity;
            var rain = typeof(jsonParsed.list[i].rain) === "undefined" || typeof(jsonParsed.list[i].rain["3h"]) === "undefined" ? 0 : parseFloat(jsonParsed.list[i].rain["3h"]);
            var snow = typeof(jsonParsed.list[i].snow) === "undefined" || typeof(jsonParsed.list[i].snow["3h"]) === "undefined" ? 0 : parseFloat(jsonParsed.list[i].snow["3h"]);
            var precipitation = rain + snow;

            var heatIndex = HI.heatIndex({temperature: temperature, humidity: humidity, fahrenheit: true});
            console.log(jsonParsed.list[i].dt_txt + ": ");
            console.log("Heat index: " + heatIndex);
            console.log("Precipitation: " + precipitation);
            console.log();

        }
    });
}

$(document).ready(function(){
    findWeather("66503");
});
