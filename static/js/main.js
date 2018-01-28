


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
})
