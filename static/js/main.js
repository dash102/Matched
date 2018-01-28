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


function findGames(){
    console.log('about to ajax');
    var json = {
        'hi': 'there'
    };
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        url: '/games/',
        success: function(data){
            console.log('success function running in frontend');
            console.log(data);
        },
        failure: function(result){
            console.log('error');
        error();
        }
    });
    // redirect to thank you
    // window.location.href = '/thanks';
}

function addDates(){
    console.log('about to ajax');
    var json = {
        'hi': 'there'
    };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        url: '/games/',
        success: function(data){
            console.log('success function running in frontend');
            console.log(data);
        },
        failure: function(result){
            console.log('error');
        error();
        }
    });
    // redirect to thank you
    // window.location.href = '/thanks';
}

function getPrediction(){
    console.log('about to ajax');
    var json = {
        'hi': 'there'
    };
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        url: '/injuries/',
        success: function(data){
            console.log('success function running in frontend');
            console.log(data);
            $('#result').html(data.Prediction.predictedValue);
        },
        failure: function(result){
            console.log('error');
        error();
        }
    });
    // redirect to thank you
    // window.location.href = '/thanks';
}
$(document).ready(function(){
    document.getElementById("predict").onclick = function(){
        getPrediction()
    };

    document.getElementById("add").onclick = function(){
        addDates()
    };

    document.getElementById("find").onclick = function(){
        findGames()
    };
});