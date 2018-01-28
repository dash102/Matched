
// Query weather api--must be done on frontend


function getHeatIndex(T,R){
    R = R/100;
    c1 = -42.379;
    c2 = 2.049;
    c3 = 10.143;
    c4 = -0.224775;
    c5 = -0.00683783;
    c6 = -0.05481;
    c7 = 0.0012287;
    c8 = 0.0008528;
    c9 = -0.00000199;

    return (c1 + c2 * T + c3 * R + c4 * T * R + 
        c5 * T * T 
            + c6 * R * R + c7 * T * T * R + c8 * T * R * R 
            + c9 * T * T * R * R );
}

function getWeather(){
    // Get weather data
    zipcode = '33101';
    key = "f123ec11eb36daac9c3f5ef9a26c5ab6";
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + "&APPID=" + key ,function(json){
        var output = JSON.stringify(json, null, 2);
        var jsonParsed = JSON.parse(output);
        //console.log(typeof(jsonParsed.list[34].rain["3h"]));
        console.log(jsonParsed);
        var inputs = new Array();
        var outputs = new Array();
        for (var i = 0; i<40; i++){
            inputs.push(0);
            // outputs.push(0);
        };

        for (var i = 0; i < 40; i++) {
            var temperature = ((jsonParsed.list[i].main.temp) * (9.0/5.0)) - 459.67;
            var humidity = jsonParsed.list[i].main.humidity;
            var rain = typeof(jsonParsed.list[i].rain) === "undefined" || typeof(jsonParsed.list[i].rain["3h"]) === "undefined" ? 0 : parseFloat(jsonParsed.list[i].rain["3h"]);
            var snow = typeof(jsonParsed.list[i].snow) === "undefined" || typeof(jsonParsed.list[i].snow["3h"]) === "undefined" ? 0 : parseFloat(jsonParsed.list[i].snow["3h"]);
            var precipitation = rain + snow;
            heatIndex = getHeatIndex(temperature, humidity);

            inputs[i] = {
                Var2: String(precipitation), 
                Var1: String(heatIndex) // Humidity actually means heat index
            };
            setTimeout(getPrediction(inputs[i], function(d){
                outputs.push(d);
            }) ,100);
        }
        console.log('about to print final')
        var thing = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 
               0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
               0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 
               1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
        setTimeout(function(){
            console.log(outputs);
            getBestAvailable(outputs, thing);
        }, 5000)

    });
}

dataManual = {
    0: 'Jan 28, 2018 at 6pm',
    1: 'Jan 28, 2018 at 9pm',
    2: 'Jan 29, 2018 at 12am',
    3: 'Jan 29, 2018 at 3am',
    4: 'Jan 29, 2018 at 6am',
    5: 'Jan 29, 2018 at 9am',
    6: 'Jan 29, 2018 at 12pm',
    7: 'Jan 29, 2018 at 3pm',
    8: 'Jan 29, 2018 at 6pm',
    9: 'Jan 29, 2018 at 9pm',
    10: 'Jan 30, 2018 at 12am',
    11: 'Jan 30, 2018 at 3am',
    12: 'Jan 30, 2018 at 6am',
    13: 'Jan 30, 2018 at 9am',
    14: 'Jan 30, 2018 at 12pm',
    15: 'Jan 30, 2018 at 3pm',
    16: 'Jan 30, 2018 at 6pm',
    17: 'Jan 30, 2018 at 9pm',
    18: 'Jan 31, 2018 at 12am',
    19: 'Jan 31, 2018 at 3am',
    20: 'Jan 31, 2018 at 6am',
    21: 'Jan 31, 2018 at 9am',
    22: 'Jan 31, 2018 at 12pm',
    23: 'Jan 31, 2018 at 3pm',
    24: 'Jan 31, 2018 at 6pm',
    25: 'Jan 31, 2018 at 9pm',
    26: 'Feb 1, 2018 at 12am',
    27: 'Feb 1, 2018 at 3am',
    28: 'Feb 1, 2018 at 6am',
    29: 'Feb 1, 2018 at 9am',
    30: 'Feb 1, 2018 at 12pm',
    31: 'Feb 1, 2018 at 3pm',
    32: 'Feb 1, 2018 at 6pm',
    33: 'Feb 1, 2018 at 9pm',
    34: 'Feb 2, 2018 at 12am',
    35: 'Feb 2, 2018 at 3am',
    36: 'Feb 2, 2018 at 6am',
    37: 'Feb 2, 2018 at 9am',
    38: 'Feb 2, 2018 at 12pm',
    39: 'Feb 2, 2018 at 3pm',
}

gapList = [ {day: 0, hour: 0}, {day: 0, hour: 1}, {day: 0, hour: 2}, {day: 0, hour: 3}, {day: 0, hour: 4}, {day: 0, hour: 5}, {day: 0, hour: 6}, {day: 0, hour: 7},
            {day: 1, hour: 0}, {day: 1, hour: 1}, {day: 1, hour: 2}, {day: 1, hour: 3}, {day: 1, hour: 4}, {day: 1, hour: 5}, {day: 1, hour: 6}, {day: 1, hour: 7},
            {day: 2, hour: 0}, {day: 2, hour: 1}, {day: 2, hour: 2}, {day: 2, hour: 3}, {day: 2, hour: 4}, {day: 2, hour: 5}, {day: 2, hour: 6}, {day: 2, hour: 7},
            {day: 3, hour: 0}, {day: 3, hour: 1}, {day: 3, hour: 2}, {day: 3, hour: 3}, {day: 3, hour: 4}, {day: 3, hour: 5}, {day: 3, hour: 6}, {day: 3, hour: 7},
            {day: 4, hour: 0}, {day: 4, hour: 1}, {day: 4, hour: 2}, {day: 4, hour: 3}, {day: 4, hour: 4}, {day: 4, hour: 5}, {day: 4, hour: 6}, {day: 4, hour: 7}]


console.log(gapList[1].hour);
console.log(gapList.length);
// Converts visualization to same format as d3 requires
function convertVisualization(pairs){
    var final = [];
    console.log('converting viz');
    console.log(gapList);

    pairs.forEach(function(d){
        console.log(d.index);
        if(d.index >= 2){
        var newThing = gapList[d.index - 2];
            final.push({
                day: newThing.day, 
                hour: newThing.hour,
                count: d.danger
            })
        }
    });
    return final;
}

function getBestAvailable(forty_outputs, available_times){
    console.log('running get best available');
    paired = new Array();
    all_paired = new Array();
    forty_outputs.forEach(function(d, i){
        paired.push({
            danger: forty_outputs[i],
            index: i,
            available: available_times[i]
        });
        all_paired.push({
            danger: forty_outputs[i],
            index: i,
            available: available_times[i]
        })
    })
    paired = paired.filter(function(d){ return d.available === 1; });
    paired.sort(function(a, b){ 
        if (a.danger < b.danger){
            return -1;
        }
        else {
            return 1;
        }
    });
    function genListTxt(i){
        var total = ''
        for(k = 0 ; k< i; k++){
            total += '<li>' + dataManual[paired[k]['index']] + '</li>';
        };
        return total;
    }
    console.log(all_paired);
    console.log('just printed paired');

    // Updates the d3 visualization

    converted = convertVisualization(all_paired);
    console.log(converted);
    updateVisualization(converted);

    var num_teams = $('#num_teams').val();
    console.log(num_teams);
    var txt = ('The safest time to play soccer are: <ul>' + genListTxt(num_teams) + '</ul>');
    

    $('#list-div').html(txt);
}

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

// function getPredictions(in_list){
//     var arr = new Array(40);
//     console.log('get predictions');
    
//     for(var i=0; i++; i<40){
//         console.log('here');
//         console.log(i);
//         // arr[i] = getPrediction(in_list[i]);
//     }
// }

function getPrediction(params, callback){
    console.log(params);
    console.log('Get prediction called with params');
    console.log(params);
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(params),
        url: '/injuries/',
        success: function(data){
            // console.log('success function running in frontend');
            // console.log(data);
            return callback(data.Prediction.predictedValue);
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
    // document.getElementById("predict").onclick = function(){
    //     getPrediction()
    // };

    // document.getElementById("add").onclick = function(){
    //     addDates()
    // };

    // document.getElementById("find").onclick = function(){
    //     findGames()
    // };

    document.getElementById("weather").onclick = function(){
        getWeather();
    };
});